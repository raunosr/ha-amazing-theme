// Rebuild the offline preview directly from the installable theme.
const fs = require('node:fs');
const path = require('node:path');
const YAML = require('yaml');
const root = path.resolve(__dirname, '..');
const data = YAML.parse(fs.readFileSync(path.join(root, 'themes/amazing.yaml'), 'utf8'));
const { modes, ...base } = data.Amazing;
const tokens = { ...base, ...modes.dark };
const css = ':root {\n' + Object.entries(tokens).map(([k,v]) => `    --${k}: ${v};`).join('\n') + '\n  }';
const file = path.join(root, 'preview/index.html');
const html = fs.readFileSync(file, 'utf8').replace(/(<style id="theme-tokens">)[\s\S]*?(<\/style>)/, `$1\n  /* Generated from themes/amazing.yaml. Do not edit here. */\n  ${css}\n  $2`);
fs.writeFileSync(file, html);
console.log(`Preview updated: ${Object.keys(tokens).length} theme variables.`);
