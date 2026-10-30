const fs = require("fs");
const path = require("path");
const c = new Map();

function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) {
      if (e.name !== "node_modules") walk(p);
    } else if (/\.(html|js|json|css|md)$/.test(e.name)) {
      let t;
      try {
        t = fs.readFileSync(p, "utf8");
      } catch {
        continue;
      }
      for (const m of t.matchAll(/https?:\/\/[^\s"'<>)]+/g)) {
        if (/kinetiq/i.test(m[0])) c.set(m[0], (c.get(m[0]) || 0) + 1);
      }
    }
  }
}

walk(".");
[...c.entries()]
  .sort((a, b) => b[1] - a[1])
  .slice(0, 150)
  .forEach(([u, n]) => console.log(n, u));
