#!/usr/bin/env python3
"""Parse interview.md into web/data/questions.json"""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MD = ROOT / "interview.md"
OUT = ROOT / "web" / "data" / "questions.json"

SECTION_RE = re.compile(r"^## (\d+)\.\s+(.+)$")
SUBSECTION_RE = re.compile(r"^### (.+)$")
QUESTION_RE = re.compile(r"^\*\*Câu hỏi:\*\*\s*(.*)$")
ANSWER_HDR = re.compile(r"^\*\*Gợi ý trả lời:\*\*\s*$")


def parse() -> dict:
    lines = MD.read_text(encoding="utf-8").splitlines()

    meta_title = "Câu hỏi phỏng vấn"
    meta_desc = ""
    if lines and lines[0].startswith("# "):
        meta_title = lines[0][2:].strip()
    for line in lines[1:20]:
        t = line.strip()
        if t and not t.startswith("#") and not t.startswith("---") and not t.startswith("*"):
            meta_desc = t
            break

    sections: list[dict] = []
    cur: dict | None = None
    group_title: str | None = None
    i = 0

    while i < len(lines):
        line = lines[i]

        m = SECTION_RE.match(line)
        if m:
            cur = {
                "id": m.group(1),
                "title": m.group(2).strip(),
                "flat_items": [],
                "grouped": {},
            }
            sections.append(cur)
            group_title = None
            i += 1
            continue

        if cur is None:
            i += 1
            continue

        sm = SUBSECTION_RE.match(line)
        if sm and not line.startswith("####"):
            gt = sm.group(1).strip()
            if gt == "Mục lục":
                i += 1
                continue
            group_title = gt
            cur["grouped"].setdefault(group_title, [])
            i += 1
            continue

        qm = QUESTION_RE.match(line)
        if qm:
            q_text = qm.group(1).strip()
            i += 1
            while i < len(lines) and not lines[i].strip():
                i += 1
            answer_lines: list[str] = []
            if i < len(lines) and ANSWER_HDR.match(lines[i]):
                i += 1
                while i < len(lines):
                    nxt = lines[i]
                    if nxt.startswith("**Câu hỏi:**"):
                        break
                    if SECTION_RE.match(nxt):
                        break
                    if SUBSECTION_RE.match(nxt) and not nxt.startswith("####"):
                        break
                    if nxt.strip() == "---":
                        i += 1
                        break
                    answer_lines.append(nxt)
                    i += 1
            item = {"question": q_text, "answer": "\n".join(answer_lines).strip()}
            if group_title:
                cur["grouped"][group_title].append(item)
            else:
                cur["flat_items"].append(item)
            continue

        i += 1

    out_sections = []
    for sec in sections:
        groups_out: list[dict] = []
        flat = sec["flat_items"]
        grouped = sec["grouped"]
        if grouped and flat:
            groups_out.append({"title": None, "items": flat})
            for gt, items in grouped.items():
                groups_out.append({"title": gt, "items": items})
        elif grouped:
            for gt, items in grouped.items():
                groups_out.append({"title": gt, "items": items})
        elif flat:
            groups_out.append({"title": None, "items": flat})

        out_sections.append({"id": sec["id"], "title": sec["title"], "groups": groups_out})

    return {
        "meta": {
            "title": meta_title,
            "description": meta_desc,
            "source": "interview.md",
        },
        "sections": out_sections,
    }


def main() -> None:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    data = parse()
    OUT.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    n = sum(len(g["items"]) for s in data["sections"] for g in s["groups"])
    print(f"Wrote {OUT} ({len(data['sections'])} sections, {n} Q&A)")


if __name__ == "__main__":
    main()
