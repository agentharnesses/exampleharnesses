#!/usr/bin/env bash
# Usage: count_pages.sh <file.docx>
# Converts to PDF via LibreOffice and prints the page count.

set -euo pipefail

DOCX="${1:?Usage: count_pages.sh <file.docx>}"

# Locate soffice — try PATH first, then common Mac install location
if command -v soffice &>/dev/null; then
    SOFFICE=soffice
elif [ -x "/Applications/LibreOffice.app/Contents/MacOS/soffice" ]; then
    SOFFICE="/Applications/LibreOffice.app/Contents/MacOS/soffice"
else
    echo "ERROR: LibreOffice not found. Install it or add soffice to PATH." >&2
    exit 1
fi

OUTDIR="$(mktemp -d)"
"$SOFFICE" --headless --convert-to pdf "$DOCX" --outdir "$OUTDIR" >/dev/null 2>&1

PDF="$OUTDIR/$(basename "${DOCX%.docx}").pdf"

if command -v pdfinfo &>/dev/null; then
    pdfinfo "$PDF" | grep "^Pages:" | awk '{print $2}'
else
    pdftoppm -jpeg -r 36 "$PDF" "$OUTDIR/page" >/dev/null 2>&1
    ls "$OUTDIR"/page*.jpg | wc -l | tr -d ' '
fi

rm -rf "$OUTDIR"
