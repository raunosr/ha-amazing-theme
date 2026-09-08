// Parse the actual YAML; check HACS layout and practical contrast pairs.
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const YAML = require('yaml');
const root = path.resolve(__dirname, '..');
const themeFiles = fs.readdirSync(path.join(root, 'themes'));
assert.deepEqual(themeFiles, ['amazing.yaml'], 'HACS must find exactly one theme YAML');
const document = YAML.parseDocument(fs.readFileSync(path.join(root, 'themes/amazing.yaml'), 'utf8'), { uniqueKeys: true });
assert.equal(document.errors.length, 0, document.errors.map(e=>e.message).join('\n'));
const data = document.toJS();
assert.deepEqual(Object.keys(data), ['Amazing']);
assert.deepEqual(Object.keys(data.Amazing.modes), ['dark']);
const { modes, ...base } = data.Amazing;
const tokens = { ...base, ...modes.dark };
for (const [key,value] of Object.entries(tokens)) {
  assert.match(key,/^[a-z][a-z0-9_-]*$/);
  assert.equal(typeof value, 'string', `${key}: must be a CSS string`);
  assert(value.length > 0 && !/url\(|https?:|javascript:|card-mod/i.test(value), `${key}: unexpected asset or script`);
}
const hacs = JSON.parse(fs.readFileSync(path.join(root, 'hacs.json')));
assert.equal(hacs.filename, themeFiles[0]);
assert.equal(hacs.name, 'Amazing Theme');
assert(!hacs.zip_release && !hacs.content_in_root);
for (const name of ['dashboard.yaml', 'native-cards.yaml', 'charts.yaml']) {
  const doc = YAML.parseDocument(fs.readFileSync(path.join(root, 'examples', name), 'utf8'), { uniqueKeys: true });
  assert.equal(doc.errors.length, 0, name);
}
const config = YAML.parseDocument(fs.readFileSync(path.join(root,'examples/configuration.yaml'),'utf8'), {
  customTags: [{ tag: '!include_dir_merge_named', resolve: str => str }]
});
assert.equal(config.errors.length,0);
assert.equal(config.toJS().frontend.themes,'themes');
const preview = fs.readFileSync(path.join(root,'preview/index.html'),'utf8');
for(const [k,v] of Object.entries(tokens)) assert(preview.includes(`--${k}: ${v};`), `Stale preview token ${k}`);
function luminance(hex) {
  assert.match(hex,/^#[0-9a-f]{6}$/i);
  const c = [1,3,5].map(i=>parseInt(hex.slice(i,i+2),16)/255).map(n=>n<=0.04045?n/12.92:((n+0.055)/1.055)**2.4);
  return c[0]*0.2126+c[1]*0.7152+c[2]*0.0722;
}
function contrast(a,b) { const x=luminance(a), y=luminance(b); return (Math.max(x,y)+0.05)/(Math.min(x,y)+0.05); }
const rows=[];
// Validate the actual gradient's brightest point as well as the solid surface.
// Every other point blends less of this light tint into the same dark base.
const glow = tokens['ha-card-background'].match(/^radial-gradient\(ellipse 280px 210px at 100% 0%, rgba\((\d+), (\d+), (\d+), (0\.\d+)\), transparent 72%\), (#[0-9a-f]{6})$/i);
assert(glow, 'Card glow must be a bounded radial gradient over an opaque base');
assert.equal(glow[5], tokens['card-background-color'], 'Glow base must match the solid card surface');
const alpha = Number(glow[4]);
assert(alpha <= 0.12, 'Keep the default glow subtle');
const glowPeak = '#' + [1, 2, 3].map((index) => {
  const background = parseInt(glow[5].slice(index * 2 - 1, index * 2 + 1), 16);
  return Math.round(Number(glow[index]) * alpha + background * (1 - alpha)).toString(16).padStart(2, '0');
}).join('');
function checkColors(label, foreground, background, min=4.5) {
  const ratio=contrast(foreground,background);
  rows.push({label,fg:foreground,bg:background,ratio,min});
  assert(ratio>=min,`${label}: ${ratio.toFixed(2)} < ${min}`);
}
function check(label,fg,bg,min=4.5) {
  checkColors(label,tokens[fg],tokens[bg],min);
}
for (const foreground of ['primary-text-color', 'secondary-text-color', 'primary-color', 'error-color', 'warning-color', 'info-color']) {
  checkColors(`${foreground} / card glow peak`, tokens[foreground], glowPeak);
}
const graphColors = Array.from({length: 8}, (_, index) => tokens[`graph-color-${index + 1}`]);
assert.equal(new Set(graphColors).size, graphColors.length, 'Chart series need distinct colors');
for (const [index, color] of graphColors.entries()) {
  checkColors(`graph-color-${index + 1} / card`, color, tokens['card-background-color'], 3);
  checkColors(`graph-color-${index + 1} / card glow peak`, color, glowPeak, 3);
}
for(const bg of ['primary-background-color','card-background-color','secondary-background-color','ha-color-form-background-hover','ha-dialog-surface-background']) {
  for(const fg of ['primary-text-color','secondary-text-color','primary-color','error-color','warning-color','info-color']) check(`${fg} / ${bg}`,fg,bg);
}
check('MDC primary button','text-primary-color','primary-color');
check('MDC accent button','text-accent-color','accent-color');
check('Input outline','input-outlined-idle-border-color','input-fill-color',3);
check('Input outline / hover surface','input-outlined-idle-border-color','ha-color-form-background-hover',3);
check('Unchecked switch border','ha-switch-border-color','ha-switch-background-color',3);
check('Checked switch thumb','ha-switch-checked-thumb-background-color','ha-switch-checked-background-color',3);
for(const kind of ['primary','neutral','danger','warning','success']) {
  for(const strength of ['quiet','normal','loud']) {
    for(const state of ['resting','hover','active']) check(`${kind} / ${strength} / ${state}`,`ha-color-on-${kind}-${strength}`,`ha-color-fill-${kind}-${strength}-${state}`);
  }
}
const report = '# Paikallinen validointi\n\n' +
  'YAML jäsennetty oikealla YAML-parserilla; kaksoisavaimet tarkistettu. HACS-tiedostorakenne, manifestin tiedostonimi, esimerkit ja esikatselun vastaavuus teeman väreihin tarkistettu.\n\n' +
  `${Object.keys(tokens).length} teemamuuttujaa. ${rows.length} kontrastiparia hyväksytty. Tekstiparien tavoite ≥ 4,5:1, säätimien reunat, osoittimet ja kaaviosarjat ≥ 3:1. Hehkun vaalein kohta (${glowPeak}) on tarkistettu erikseen.\n\n` +
  'Tämä ei ole koko Home Assistantin WCAG-arvio eikä testi käynnissä olevassa HA:ssa. Koristeellista korttireunaa ja käytöstä poistettuja säätimiä ei lasketa tekstin tai aktiivisen säätimen kontrastilupaukseen.\n\n' +
  '| Pari | Teksti / osoitin | Tausta | Suhde | Raja |\n| --- | --- | --- | ---: | ---: |\n' + rows.map(r=>`| ${r.label} | ${r.fg} | ${r.bg} | ${r.ratio.toFixed(2)}:1 | ${r.min}:1 |`).join('\n') + '\n';
fs.writeFileSync(path.join(root,'docs/VALIDATION.md'),report);
console.log(`OK: YAML + HACS layout + examples + preview sync; ${rows.length} contrast checks.`);
