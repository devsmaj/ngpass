const fs = require('fs');
const path = require('path');

const buildDir = path.resolve(process.cwd(), 'web-build');

fs.writeFileSync(path.join(buildDir, '.nojekyll'), '');

console.log('Prepared GitHub Pages build with .nojekyll.');
