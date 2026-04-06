#!/usr/bin/env python3
import json
import re
from pathlib import Path


SRC = Path("web/data/questions.json")
OUT = Path("web/data/questions-normalized.json")


def normalize_item(item: dict) -> dict:
    question = item.get("question", "")
    suggestion = item.get("suggestion")
    answer = item.get("answer", "")

    if not suggestion:
        match = re.search(
            r"\*\*Tầng 1[^\n]*\*\*([\s\S]*?)\*\*Tầng 2[^\n]*\*\*([\s\S]*)",
            answer,
            flags=re.IGNORECASE,
        )
        if match:
            suggestion = match.group(1).strip()
            answer = match.group(2).strip()

    if not suggestion:
        parts = re.split(r"\n{2,}", answer)
        suggestion = (parts[0] if parts else answer).strip()

    return {
        "question": question,
        "suggestion": suggestion,
        "answer": answer,
    }


def main() -> None:
    data = json.loads(SRC.read_text(encoding="utf-8"))

    for section in data.get("sections", []):
        for group in section.get("groups", []):
            items = group.get("items")
            if isinstance(items, list):
                group["items"] = [normalize_item(item) for item in items]

    meta = data.setdefault("meta", {})
    meta["source"] = "web/data/questions-normalized.json"

    OUT.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Written: {OUT}")


if __name__ == "__main__":
    main()
