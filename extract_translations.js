const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const regex = /data-tr="([^"]+)"\s+data-en="([^"]+)"/g;
let match;
let output = [];
while ((match = regex.exec(html)) !== null) {
  output.push(`TR: ${match[1]}\nEN: ${match[2]}\n`);
}
fs.writeFileSync('translations.txt', output.join('\n'));
console.log('Translations extracted to translations.txt');
