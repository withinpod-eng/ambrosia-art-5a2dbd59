import { Miniflare } from "miniflare";
import { readFileSync, writeFileSync, mkdirSync, cpSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distRoot = join(__dirname, "..", "dist");
const serverDir = join(distRoot, "server");
const clientDir = join(distRoot, "client");
const outDir = join(distRoot, "static");

const ROUTES = ["/", "/menu", "/about", "/cart", "/contact"];

const script = readFileSync(join(serverDir, "index.js"), "utf8");

const mf = new Miniflare({
  modules: true,
  scriptPath: join(serverDir, "index.js"),
  modulesRoot: serverDir,
  modulesRules: [
    { type: "ESModule", include: ["**/*.js", "**/*.mjs"] },
  ],
  compatibilityDate: "2025-09-24",
  compatibilityFlags: ["nodejs_compat"],
  assets: { directory: clientDir },
});

console.log("Booting miniflare…");
await mf.ready;

mkdirSync(outDir, { recursive: true });
console.log("Copying client assets →", outDir);
cpSync(clientDir, outDir, { recursive: true });

for (const route of ROUTES) {
  const url = `http://localhost${route}`;
  console.log("Rendering", route);
  const res = await mf.dispatchFetch(url);
  if (!res.ok) {
    console.error(`✗ ${route} → ${res.status}`);
    continue;
  }
  const html = await res.text();
  const outPath = route === "/"
    ? join(outDir, "index.html")
    : join(outDir, route.slice(1), "index.html");
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, html);
  console.log(`✓ ${route} → ${outPath} (${html.length} bytes)`);
}

// SPA fallback: copy / index.html as 404 so Netlify shows app-rendered routes
const homeHtml = readFileSync(join(outDir, "index.html"), "utf8");
writeFileSync(join(outDir, "404.html"), homeHtml);

// Netlify SPA redirect (handles client-side navigation to unknown URLs)
writeFileSync(join(outDir, "_redirects"), "/* /index.html 200\n");

console.log("\n✅ Static site generated at:", outDir);
await mf.dispose();
