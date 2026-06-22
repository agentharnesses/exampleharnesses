#!/usr/bin/env python3
"""Spawn a command in a PTY and bridge its stdin/stdout to ours.
Resize: write new size to /tmp/claude_pty_size as "cols:rows", then send SIGUSR1."""
import os, sys, select, signal, struct, fcntl, termios

RESIZE_FILE = '/tmp/claude_pty_size'

def main():
    cmd = sys.argv[1:]
    cols = int(os.environ.get('PTY_COLS', '220'))
    rows = int(os.environ.get('PTY_ROWS', '50'))

    master_fd, slave_fd = os.openpty()
    fcntl.ioctl(master_fd, termios.TIOCSWINSZ, struct.pack('HHHH', rows, cols, 0, 0))

    child_pid = os.fork()
    if child_pid == 0:
        os.close(master_fd)
        os.setsid()
        fcntl.ioctl(slave_fd, termios.TIOCSCTTY, 0)
        os.dup2(slave_fd, 0)
        os.dup2(slave_fd, 1)
        os.dup2(slave_fd, 2)
        if slave_fd > 2:
            os.close(slave_fd)
        os.execv(cmd[0], cmd)
        sys.exit(1)

    os.close(slave_fd)

    def handle_resize(signum, frame):
        try:
            c, r = open(RESIZE_FILE).read().strip().split(':')
            fcntl.ioctl(master_fd, termios.TIOCSWINSZ,
                        struct.pack('HHHH', int(r), int(c), 0, 0))
            os.kill(child_pid, signal.SIGWINCH)
        except Exception:
            pass

    signal.signal(signal.SIGUSR1, handle_resize)

    stdin_fd  = sys.stdin.fileno()
    stdout_fd = sys.stdout.fileno()

    while True:
        try:
            r, _, _ = select.select([master_fd, stdin_fd], [], [], 0.1)
        except (OSError, InterruptedError):
            break

        if master_fd in r:
            try:
                data = os.read(master_fd, 4096)
                if not data:
                    break
                os.write(stdout_fd, data)
            except OSError:
                break

        if stdin_fd in r:
            try:
                data = os.read(stdin_fd, 4096)
                if not data:
                    break
                os.write(master_fd, data)
            except OSError:
                break

        ret = os.waitpid(child_pid, os.WNOHANG)
        if ret[0] != 0:
            break

    try:
        os.kill(child_pid, signal.SIGTERM)
        os.waitpid(child_pid, 0)
    except (ProcessLookupError, ChildProcessError):
        pass

main()
