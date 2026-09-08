# Julkaiseminen

Repositorio: [raunosr/ha-amazing-theme](https://github.com/raunosr/ha-amazing-theme).

HACS löytää yhden teema-YAML:n `themes/`-hakemistosta. `hacs.json` osoittaa tiedostoon `amazing.yaml`; `zip_release` ei kuulu tämän teeman jakeluun. GitHub Release määrittää HACS:ssa näkyvän version. HACS lukee teeman release-tagin lähdepuusta; ZIP on käsin asennettava lähdepaketti. [HACS:n teemarepositorion rakenne](https://www.hacs.xyz/docs/publish/theme/).

## Uusi versio

1. Tee muutokset työhaarassa ja päivitä versio tiedostoissa `package.json`, `package-lock.json`, `README.md` ja `CHANGELOG.md`.
2. Suorita Node.js 24:llä `npm ci --ignore-scripts`, `npm run preview:build` ja `npm run validate`. Päivitä kuvat, jos ulkoasu muuttuu.
3. Kirjaa mahdollinen aito HA-testi ja testiversiot tiedostoon [COMPATIBILITY.md](COMPATIBILITY.md). Säilytä tieto vielä testaamattomista asioista.
4. Avaa pull request. `main` vaatii ajantasaisen haaran, molemmat validointitarkistukset ja ratkaistut keskustelut. Yhden ylläpitäjän projekti ei vaadi toisen henkilön hyväksyntää. Yhdistä squash-toiminnolla.
5. Luo uusi `vX.Y.Z`-tagi tarkistetusta `main`-commitista ja julkaise GitHub Release. Liitä halutessasi lähdepaketti, `amazing.yaml` ja `SHA256SUMS.txt`. Älä käytä vanhaa ZIP-pakettia muuttuneen lähdepuun julkaisuun.
6. Varmista tagin ja julkaisun Validation-ajot. Kokeile lataus HACS:n mukautettuna repositoriona, kun testiympäristö on käytettävissä.

Julkaisutagit `v*` on suojattu muutoksilta ja poistamiselta. Korjaukset julkaistaan uudella versionumerolla. Repositorion suojausten muuttaminen kuuluu ylläpitäjälle.

## Automaattiset tarkistukset

- `Theme validation`: YAML, esimerkit, manifesti, esikatselun vastaavuus ja 103 kontrastiparia (mukaan lukien hehkun vaalein kohta ja kahdeksan kaaviosarjaa).
- `HACS validation`: virallinen HACS-validaattori kategoriassa `theme`, mukaan lukien GitHub-metatiedot.
- Dependabot seuraa npm-kehitysriippuvuutta ja GitHub Actions -viitteitä viikoittain.

Työnkulku ajetaan push-, pull request- ja release-tapahtumissa sekä pyydettäessä. [HACS:n validaattori](https://www.hacs.xyz/docs/publish/action/).

Älä sisällytä `node_modules/`, paikallisia työpaketteja, henkilökohtaisia HA-asetuksia tai tunnuksia julkaisuun. Teeman asennus ei tarvitse Node.js-työkaluja eikä preview-hakemistoa. HACS:n oletusluetteloon pääsy on erillinen prosessi; mukautettu repositorio toimii ilman sitä.
