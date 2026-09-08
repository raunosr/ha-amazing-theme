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
for (const name of ['dashboard.yaml', 'native-cards.yaml']) {
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
function check(label,fg,bg,min=4.5) {
  const ratio=contrast(tokens[fg],tokens[bg]);
  rows.push({label,fg:tokens[fg],bg:tokens[bg],ratio,min});
  assert(ratio>=min,`${label}: ${ratio.toFixed(2)} < ${min}`);
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
  `${Object.keys(tokens).length} teemamuuttujaa. ${rows.length} kontrastiparia hyväksytty. Tekstiparien tavoite ≥ 4,5:1, säätimien reunat ja osoittimet ≥ 3:1.\n\n` +
  'Tämä ei ole koko Home Assistantin WCAG-arvio eikä testi käynnissä olevassa HA:ssa. Koristeellista korttireunaa ja käytöstä poistettuja säätimiä ei lasketa tekstin tai aktiivisen säätimen kontrastilupaukseen.\n\n' +
  '| Pari | Teksti / osoitin | Tausta | Suhde | Raja |\n| --- | --- | --- | ---: | ---: |\n' + rows.map(r=>`| ${r.label} | ${r.fg} | ${r.bg} | ${r.ratio.toFixed(2)}:1 | ${r.min}:1 |`).join('\n') + '\n';
fs.writeFileSync(path.join(root,'docs/VALIDATION.md'),report);
console.log(`OK: YAML + HACS layout + examples + preview sync; ${rows.length} contrast checks.`);
