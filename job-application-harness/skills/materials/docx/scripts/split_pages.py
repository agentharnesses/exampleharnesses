"""
Split a multi-page combined docx (e.g. cover letter + resume) into separate
single-page docx files by finding explicit page breaks in the document body.

Usage:
    python scripts/split_pages.py <input.docx> <output_dir>/
        [--names page1 page2 ...]   # stem names for each output file

Example:
    python scripts/split_pages.py combined.docx /tmp/split/ --names cover resume

Output files are named <name>.docx (or page1.docx, page2.docx, ... if --names
is omitted) inside <output_dir>.
"""
import argparse
import copy
import os
import shutil
import sys
import tempfile
import xml.etree.ElementTree as ET

W = "http://schemas.openxmlformats.org/wordprocessingml/2006/main"

NAMESPACES = {
    "wpc": "http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas",
    "cx": "http://schemas.microsoft.com/office/drawing/2014/chartex",
    "cx1": "http://schemas.microsoft.com/office/drawing/2015/9/8/chartex",
    "cx2": "http://schemas.microsoft.com/office/drawing/2015/10/21/chartex",
    "cx3": "http://schemas.microsoft.com/office/drawing/2016/5/9/chartex",
    "cx4": "http://schemas.microsoft.com/office/drawing/2016/5/10/chartex",
    "cx5": "http://schemas.microsoft.com/office/drawing/2016/5/11/chartex",
    "cx6": "http://schemas.microsoft.com/office/drawing/2016/5/12/chartex",
    "cx7": "http://schemas.microsoft.com/office/drawing/2016/5/13/chartex",
    "cx8": "http://schemas.microsoft.com/office/drawing/2016/5/14/chartex",
    "mc": "http://schemas.openxmlformats.org/markup-compatibility/2006",
    "aink": "http://schemas.microsoft.com/office/drawing/2016/ink",
    "am3d": "http://schemas.microsoft.com/office/drawing/2017/model3d",
    "o": "urn:schemas-microsoft-com:office:office",
    "oel": "http://schemas.microsoft.com/office/2019/extlst",
    "r": "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
    "m": "http://schemas.openxmlformats.org/officeDocument/2006/math",
    "v": "urn:schemas-microsoft-com:vml",
    "wp14": "http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing",
    "wp": "http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing",
    "w10": "urn:schemas-microsoft-com:office:word",
    "w": "http://schemas.openxmlformats.org/wordprocessingml/2006/main",
    "w14": "http://schemas.microsoft.com/office/word/2010/wordml",
    "w15": "http://schemas.microsoft.com/office/word/2012/wordml",
    "w16cex": "http://schemas.microsoft.com/office/word/2018/wordml/cex",
    "w16cid": "http://schemas.microsoft.com/office/word/2016/wordml/cid",
    "w16": "http://schemas.microsoft.com/office/word/2018/wordml",
    "w16sdtdh": "http://schemas.microsoft.com/office/word/2020/wordml/sdtdatahash",
    "w16se": "http://schemas.microsoft.com/office/word/2015/wordml/symex",
    "wpg": "http://schemas.microsoft.com/office/word/2010/wordprocessingGroup",
    "wpi": "http://schemas.microsoft.com/office/word/2010/wordprocessingInk",
    "wne": "http://schemas.microsoft.com/office/word/2006/wordml",
    "wps": "http://schemas.microsoft.com/office/word/2010/wordprocessingShape",
}


def t(name):
    return f"{{{W}}}{name}"


def has_page_break(paragraph):
    for br in paragraph.iter(t("br")):
        if br.get(t("type")) == "page":
            return True
    return False


def remove_page_break_runs(paragraph):
    """Return a deep copy of the paragraph with page-break-only runs removed."""
    para = copy.deepcopy(paragraph)
    for r in list(para.findall(t("r"))):
        brs = r.findall(t("br"))
        texts = r.findall(t("t"))
        if brs and not texts and all(b.get(t("type")) == "page" for b in brs):
            para.remove(r)
    return para


def split_body_children(children):
    """
    Partition body children (paragraphs, tables, etc.) on explicit page breaks.
    Returns a list of lists — one per page.
    Page-break paragraphs are kept in the *preceding* page with the break run removed.
    """
    pages = []
    current = []
    for child in children:
        if child.tag == t("sectPr"):
            # Body-level sectPr: attach to last page at the end
            continue
        if child.tag == t("p") and has_page_break(child):
            current.append(remove_page_break_runs(child))
            pages.append(current)
            current = []
        else:
            current.append(child)
    if current:
        pages.append(current)
    return pages


def build_document_xml(template_tree, page_children, body_sectPr):
    """Clone the template document tree, replace body children with page_children."""
    new_tree = copy.deepcopy(template_tree)
    root = new_tree.getroot()
    body = root.find(t("body"))
    for child in list(body):
        body.remove(child)
    for child in page_children:
        body.append(copy.deepcopy(child))
    if body_sectPr is not None:
        body.append(copy.deepcopy(body_sectPr))
    return new_tree


def fixup_namespace_declarations(xml_path, reference_xml_path):
    """Add any xmlns: declarations present in reference root but missing in target."""
    import re
    with open(reference_xml_path, encoding="utf-8") as f:
        ref = f.read()
    with open(xml_path, encoding="utf-8") as f:
        content = f.read()

    ref_decls = {p: u for p, u in re.findall(r'xmlns:(\w+)="([^"]+)"', ref[:4000])}
    existing = set(re.findall(r'xmlns:(\w+)="[^"]+"', content[:4000]))
    missing = {p: u for p, u in ref_decls.items() if p not in existing}
    if not missing:
        return

    additions = " ".join(f'xmlns:{p}="{u}"' for p, u in missing.items())
    # Insert before closing '>' of the root element opening tag
    root_start = content.find("<w:document")
    if root_start == -1:
        return
    insert_at = content.find(">", root_start)
    # If self-closing, back up before '/>'
    if content[insert_at - 1] == "/":
        insert_at -= 1
    content = content[:insert_at] + " " + additions + content[insert_at:]
    with open(xml_path, "w", encoding="utf-8") as f:
        f.write(content)


def register_all_namespaces(xml_path):
    """Pre-register all namespaces found in the file so ET preserves prefixes."""
    events = ET.iterparse(xml_path, events=["start-ns"])
    for _, (prefix, uri) in events:
        try:
            ET.register_namespace(prefix, uri)
        except ValueError:
            pass
    for prefix, uri in NAMESPACES.items():
        try:
            ET.register_namespace(prefix, uri)
        except ValueError:
            pass


def main():
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("input", help="Combined .docx file")
    parser.add_argument("output_dir", help="Directory to write split files into")
    parser.add_argument("--names", nargs="*", help="Output file stem names (one per page)")
    args = parser.parse_args()

    import subprocess

    script_dir = os.path.dirname(os.path.abspath(__file__))
    office_dir = os.path.join(script_dir, "office")

    def run_office(script, *script_args):
        result = subprocess.run(
            [sys.executable, os.path.join(office_dir, f"{script}.py")] + list(script_args),
            cwd=office_dir,
            capture_output=True,
            text=True,
        )
        if result.stdout:
            print(result.stdout, end="")
        if result.returncode != 0:
            print(result.stderr, file=sys.stderr)
            sys.exit(result.returncode)

    os.makedirs(args.output_dir, exist_ok=True)

    with tempfile.TemporaryDirectory() as tmp:
        unpacked = os.path.join(tmp, "unpacked")
        run_office("unpack", args.input, unpacked)

        doc_xml = os.path.join(unpacked, "word", "document.xml")
        register_all_namespaces(doc_xml)

        tree = ET.parse(doc_xml)
        root = tree.getroot()
        body = root.find(t("body"))
        children = list(body)

        body_sectPr = body.find(t("sectPr"))

        pages = split_body_children(children)
        n = len(pages)
        print(f"Found {n} page(s) in {args.input}")

        names = args.names or [f"page{i+1}" for i in range(n)]
        if len(names) < n:
            names += [f"page{i+1}" for i in range(len(names), n)]

        for i, (page_children, name) in enumerate(zip(pages, names)):
            page_unpacked = os.path.join(tmp, f"page_{i}")
            shutil.copytree(unpacked, page_unpacked)

            new_tree = build_document_xml(tree, page_children, body_sectPr)
            out_xml = os.path.join(page_unpacked, "word", "document.xml")
            new_tree.write(out_xml, xml_declaration=True, encoding="UTF-8")
            fixup_namespace_declarations(out_xml, doc_xml)

            out_docx = os.path.join(args.output_dir, f"{name}.docx")
            run_office("pack", page_unpacked, out_docx, "--original", args.input)
            print(f"  → {out_docx}")


if __name__ == "__main__":
    main()
