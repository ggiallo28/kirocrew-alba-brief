#!/usr/bin/env python3
"""Store an Alba credential in the operating system's secret store, with a hidden prompt.

Usage:  python3 alba_secret.py <gmail|calendar|youtrack> <accountId>

The value is typed at a hidden prompt, never passed as an argument and never written to a file
of Alba. Alba's backend reads it from the same store; the agent never sees it.
"""
import getpass
import os
import re
import sys

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "backend"))
import server  # noqa: E402

HINT = {
    "gmail": "Password per le app di Google (16 caratteri)",
    "calendar": "Indirizzo segreto in formato iCal (https://calendar.google.com/calendar/ical/…/basic.ics)",
    "youtrack": "Token permanente di YouTrack",
}


def main() -> int:
    if len(sys.argv) != 3 or sys.argv[1] not in HINT or not re.fullmatch(r"[A-Za-z0-9_-]{1,40}", sys.argv[2]):
        print(__doc__)
        return 2
    app, acc = sys.argv[1], sys.argv[2]
    val = getpass.getpass(f"{HINT[app]}: ").strip()
    if not val:
        print("Nessun valore inserito.")
        return 1
    if app == "calendar" and not val.startswith("https://"):
        print("L'indirizzo deve iniziare con https://")
        return 1
    server.secret_put(app, acc, val)
    print(f"Salvato nel deposito segreti ({server.store_kind()}). Torna in Alba e premi Verifica.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
