// Verkleint ruwe foto's voor in src/assets/photos/.
// Gebruik: npm run photos -- <map-met-originelen> [--out <map>] [--quality 82]
import { readdir, mkdir, stat } from 'node:fs/promises';
import { extname, basename, join, resolve } from 'node:path';
import { homedir } from 'node:os';
import sharp from 'sharp';

const MAX_SIDE = 2560;
const MIN_SIDE = 1440;
const WARN_KB = 500;
const EXTS = new Set(['.jpg', '.jpeg', '.png', '.heic', '.heif', '.webp', '.tif', '.tiff']);

const args = process.argv.slice(2);
const opt = (name, fallback) => {
  const i = args.indexOf(name);
  if (i === -1) return fallback;
  return args.splice(i, 2)[1];
};
const outDir = resolve(opt('--out', 'src/assets/photos'));
const quality = Number(opt('--quality', 82));
const inArg = args[0];

if (!inArg) {
  console.error('Gebruik: npm run photos -- <map-met-originelen> [--out <map>] [--quality 82]');
  process.exit(1);
}
const inDir = resolve(inArg.replace(/^~(?=\/|$)/, homedir()));

const slug = (name) =>
  name
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const kb = (n) => Math.round(n / 1024);

await mkdir(outDir, { recursive: true });
const files = (await readdir(inDir)).filter((f) => EXTS.has(extname(f).toLowerCase())).sort();
if (!files.length) {
  console.error(`Geen foto's gevonden in ${inDir}`);
  process.exit(1);
}

let totalBefore = 0;
let totalAfter = 0;
for (const file of files) {
  const src = join(inDir, file);
  const target = join(outDir, `${slug(basename(file, extname(file)))}.jpg`);
  const before = (await stat(src)).size;

  const info = await sharp(src)
    .rotate()
    .resize({ width: MAX_SIDE, height: MAX_SIDE, fit: 'inside', withoutEnlargement: true })
    .toColorspace('srgb')
    .jpeg({ quality, mozjpeg: true, progressive: true })
    .toFile(target);

  totalBefore += before;
  totalAfter += info.size;
  const long = Math.max(info.width, info.height);
  const notes = [];
  if (long < MIN_SIDE) notes.push(`let op: lange zijde onder ${MIN_SIDE}px`);
  if (info.size / 1024 > WARN_KB) notes.push(`let op: boven ${WARN_KB} KB`);
  if (info.width / info.height >= 1.5 && long >= MAX_SIDE) notes.push('geschikt als hero');
  console.log(
    `${basename(target)}  ${info.width}x${info.height}  ${kb(before)} KB -> ${kb(info.size)} KB` +
      (notes.length ? `  [${notes.join(', ')}]` : ''),
  );
}
console.log(`\n${files.length} foto's, ${kb(totalBefore)} KB -> ${kb(totalAfter)} KB, uitvoer in ${outDir}`);
