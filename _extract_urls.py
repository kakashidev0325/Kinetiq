import re, os, collections

c = collections.Counter()
for root, _, files in os.walk("."):
    if "_extract_urls.py" in files:
        pass
    for f in files:
        if f.endswith((".html", ".js", ".json", ".css", ".md")):
            p = os.path.join(root, f)
            try:
                t = open(p, encoding="utf-8", errors="ignore").read()
            except Exception:
                continue
            for m in re.findall(r"https?://[^\s\"'<>)]+", t):
                if "kinetiq" in m.lower():
                    c[m] += 1

for u, n in c.most_common(100):
    print(n, u)
