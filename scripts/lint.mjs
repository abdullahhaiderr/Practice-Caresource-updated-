import { readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join, relative } from "node:path";
import ts from "typescript/lib/typescript.js";

const root = process.cwd();
const sourceRoots = ["src", "scripts"];
const configFiles = ["tailwind.config.ts", "next.config.ts", "postcss.config.mjs"];
const files = [];

function collect(directory) {
  for (const name of readdirSync(directory)) {
    if (["node_modules", ".next", ".git"].includes(name)) continue;
    const fullPath = join(directory, name);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) collect(fullPath);
    else if ([".ts", ".tsx", ".mts", ".cts"].includes(extname(name))) files.push(fullPath);
  }
}

for (const directory of sourceRoots) collect(join(root, directory));
for (const file of configFiles) files.push(join(root, file));

const failures = [];
for (const file of files) {
  const text = readFileSync(file, "utf8");
  const kind = file.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS;
  const source = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, kind);
  for (const diagnostic of source.parseDiagnostics) {
    const position = diagnostic.start ?? 0;
    const location = source.getLineAndCharacterOfPosition(position);
    const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, " ");
    failures.push(`${relative(root, file)}:${location.line + 1}:${location.character + 1} ${message}`);
  }
  if (text.includes("<<<<<<< HEAD") || text.includes("=======\n") || text.includes(">>>>>>> ")) {
    failures.push(`${relative(root, file)} contains a possible merge conflict marker`);
  }
}
const envExample = readFileSync(join(root, ".env.example"), "utf8");
if (/^(?:RESEND_API_KEY|CONTACT_FROM_EMAIL|TURNSTILE_SECRET_KEY|NEXT_PUBLIC_TURNSTILE_SITE_KEY)=.+$/m.test(envExample)) {
  failures.push(".env.example must contain empty placeholders for secret values");
}
if (failures.length) {
  console.error(`Source lint failed with ${failures.length} issue(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log(`Source lint passed: ${files.length} TypeScript files parsed; environment placeholders checked.`);
}
