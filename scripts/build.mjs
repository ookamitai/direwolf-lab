import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';

const output = new URL('../dist/', import.meta.url);
const source = new URL('../src/', import.meta.url);
const indexSource = new URL('../index.html', import.meta.url);

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(source, new URL('./src/', output), { recursive: true });

const html = await readFile(indexSource, 'utf8');
await writeFile(new URL('./index.html', output), html);

const sizes = await Promise.all([
  readFile(new URL('./index.html', output)),
  readFile(new URL('./src/css/main.css', output)),
  readFile(new URL('./src/js/main.js', output)),
  readFile(new URL('./src/js/animation.js', output)),
]);

const total = sizes.reduce((sum, file) => sum + file.byteLength, 0);
console.log(`Built static site in dist/ (${(total / 1024).toFixed(1)} kB core assets)`);
