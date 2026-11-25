// Checks that content/es.json and content/en.json have the same shape:
// the same keys at every level, arrays of the same length, and the same kind
// of value (object / array / text) in the same place.
//   npm run i18n:check   (exit code 1 on any difference)

import { readFileSync } from "node:fs";

const load = (lang) => JSON.parse(readFileSync(new URL(`../content/${lang}.json`, import.meta.url), "utf8"));
const kind = (v) => (Array.isArray(v) ? "array" : v === null ? "null" : typeof v);

const problems = [];

function compare(a, b, path) {
  const ka = kind(a), kb = kind(b);
  if (ka !== kb) {
    problems.push(`${path || "(root)"}: ${ka} in es, ${kb} in en`);
    return;
  }
  if (ka === "array") {
    if (a.length !== b.length) problems.push(`${path}: ${a.length} items in es, ${b.length} in en`);
    for (let i = 0; i < Math.min(a.length, b.length); i++) compare(a[i], b[i], `${path}[${i}]`);
  } else if (ka === "object") {
    for (const k of Object.keys(a)) {
      if (!(k in b)) problems.push(`${path ? path + "." : ""}${k}: missing in en`);
      else compare(a[k], b[k], path ? `${path}.${k}` : k);
    }
    for (const k of Object.keys(b)) if (!(k in a)) problems.push(`${path ? path + "." : ""}${k}: missing in es`);
  }
}

compare(load("es"), load("en"), "");

if (problems.length) {
  console.error(`i18n: ${problems.length} difference(s) between es and en:\n  ` + problems.join("\n  "));
  process.exit(1);
}
console.log("i18n: es and en have the same keys");
