const fs = require('fs');
const path = require('path');

const buildDir = path.resolve(process.cwd(), 'web-build');

function getHtmlFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      return getHtmlFiles(fullPath);
    }
    if (entry.isFile() && entry.name.endsWith('.html')) {
      return [fullPath];
    }
    return [];
  });
}

function fixPathsInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const fixed = content
    .replace(/href="\//g, 'href="./')
    .replace(/src="\//g, 'src="./')
    .replace(/srcset="\//g, 'srcset="./')
    .replace(/content="\//g, 'content="./')
    .replace(/url\("\//g, 'url("./')
    .replace(/url\('\//g, "url('./");

  if (fixed !== content) {
    fs.writeFileSync(filePath, fixed, 'utf8');
  }
}

const files = getHtmlFiles(buildDir);
for (const file of files) {
  fixPathsInFile(file);
}

console.log(`Fixed ${files.length} HTML file(s) for relative GitHub Pages paths.`);
