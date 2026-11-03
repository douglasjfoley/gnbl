// Lists every shot ID the site references, where its file should go, and whether it was found.
// Usage: npm run shots
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const ID = /\b(?:HOME|PATH|PROG|FAC|CHAMP|TRI|BOTB|INV|ABOUT)-(?:V)?\d{2}\b/g;
const FOLDER = { HOME: "home", PATH: "home", PROG: "programs", FAC: "facilities", CHAMP: "champions", TRI: "tridents", BOTB: "botb", INV: "home", ABOUT: "home" };

const walk = (d) => (fs.existsSync(d) ? fs.readdirSync(d, { recursive: true }).map(String) : []);
const ids = new Set();
const fallbacks = {};
for (const dir of ["app", "components", "content/data"]) {
  for (const f of walk(path.join(root, dir))) {
    if (!/\.(tsx?|json)$/.test(f)) continue;
    const src = fs.readFileSync(path.join(root, dir, f), "utf8");
    for (const m of src.matchAll(ID)) ids.add(m[0]);
    for (const m of src.matchAll(/id="([A-Z]+-\d+)"\s+fallback="([^"]+)"/g)) fallbacks[m[1]] = m[2];
  }
}
const images = walk(path.join(root, "public/images")).map((f) => path.basename(f));
const videos = walk(path.join(root, "public/video")).map((f) => path.basename(f));

const rows = [...ids].sort().map((id) => {
  const prefix = id.split("-")[0];
  if (id.includes("-V")) {
    const dir = `public/video/${prefix === "TRI" ? "tridents" : "home"}/`;
    const want = [`${id}.mp4`, `${id}.webm`, `${id}-mobile.mp4`, `${id}-poster.jpg`];
    const have = want.filter((w) => videos.includes(w));
    return [id, dir + `${id}{.mp4,.webm,-mobile.mp4,-poster.jpg}`, have.length ? `${have.length}/4 (${have.join(", ")})` : "no"];
  }
  const find = (want) =>
    images.find((b) => /\.(jpe?g|png|webp|avif)$/i.test(b) && b.startsWith(`${want}-`) && (want.endsWith("-alt") || !b.startsWith(`${want}-alt-`)));
  const hit = find(id);
  const backup = !hit && fallbacks[id] && find(fallbacks[id]);
  const found = hit ? `yes (${hit})` : backup ? `no, using fallback (${backup})` : "no";
  return [id, `public/images/${FOLDER[prefix]}/${id}-<description>.jpg`, found];
});

const w = [8, 64, 6];
const line = (r) => `| ${r.map((c, i) => String(c).padEnd(w[i])).join(" | ")} |`;
console.log(line(["Shot ID", "Expected file", "Found"]));
console.log(`|${w.map((n) => "-".repeat(n + 2)).join("|")}|`);
rows.forEach((r) => console.log(line(r)));
console.log(`\n${rows.length} shot IDs referenced, ${rows.filter((r) => !String(r[2]).startsWith("no")).length} with files.`);
console.log(`Spares on disk: ${images.filter((b) => /-alt-/.test(b)).join(", ") || "none"}`);
