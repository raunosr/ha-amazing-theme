# Yhteensopivuus

## Toteutuksen periaate

`Amazing` ilmoittaa vain `modes.dark`-tilan. Home Assistant käyttää profiiliin valittaessa tummaa pohjaa. Värit ovat teeman ylätasolla, jotta ne ovat käytettävissä myös näkymään rajattaessa, vaikka ympäröivä profiili olisi vaalea. Teema ei muuta dashboardin asettelua tai käyttöliittymän kokoa.

Värikerrokset:

| Kerros | Esimerkkejä | Tarkoitus |
| --- | --- | --- |
| Perusvärit | `primary-color`, `accent-color` | Minttu ja sateensininen |
| Pinnat ja teksti | `card-background-color`, `primary-text-color` | Alkuperäisen sääkortin tumma paletti |
| Natiivikortit | `ha-card-*` | 24 px kulmat, 1 px hillitty reuna ja 8 % sininen kulmahehku |
| Kaaviot | `graph-color-1` … `graph-color-8` | Sarjajärjestyksen värit; korttikohtainen väri voi ohittaa ne |
| Vanhemmat säätimet | `input-*`, `mdc-theme-*` | Kentät, valitsimet, dialogit ja luettavat painikkeet |
| Nykyiset komponentit | `ha-color-*`, `ha-switch-*`, `ha-slider-*` | Myös Web Awesomeen perustuvien komponenttien sävyt |

Minttu on vaalea korostus. Sen päällä käytetään tummaa `#111e30`-tekstiä. Tavallinen sisältöteksti on vaaleaa `#eef5fc`-tekstiä tummilla pinnoilla. Varoitus on lämmin keltainen ja virhe vaalea punainen; koko entiteettijärjestelmän tilavärejä ei korvata yhdellä korostusvärillä.

Koristeellinen `#2c4057`-korttireuna on tarkoituksella hienovarainen. Se ei ole ainoa tapa tunnistaa säädintä. Kenttien ja aktiivisten säätimien rajoissa käytetään vahvempaa `#7890a8`-väriä.

## Todennetut asiat

- Alkuperäinen paletti tarkistettiin sääkortin paikallisen `v0.1.0`-tagin lähdekoodista lukemalla.
- HA:n ja HACS:n viralliset ohjeet tarkistettiin 8.9.2026.
- HA frontendin `master`-lähteitä tarkasteltiin samana päivänä. Lähdeviite: `18f79dfc919e2019102c4fde0606fdb449f4cc15`. Tämä on lähdekoodiviite, ei väite testatusta HA-versionumerosta.
- YAML-parseri, manifesti, teemahakemiston rakenne ja asennusesimerkit tarkistettiin paikallisesti.
- Kontrastiparit on laskettu sRGB:n suhteellisella luminanssilla; raportti: [VALIDATION.md](VALIDATION.md).
- Esikatselu testattiin paikallisessa selaimessa; raportti: [PREVIEW-QA.md](PREVIEW-QA.md).
- Käyttäjä vahvisti 8.9.2026 teeman kokeilun aidossa Home Assistantissa ja toimitti dashboard-kuvan; tarkempi rajaus alla.

GitHubin HACS- ja teemavalidoinnin ajantasaiset tulokset: [Validation](https://github.com/raunosr/ha-amazing-theme/actions/workflows/validate.yaml). HACS-validaattori tarkistaa repositorion myös verkosta.

HA:n dokumentaatio takaa ensisijaisesti pää-/korostusvärit ja dokumentoidut tilavärit. Muiden tyylimuuttujien toiminta voi muuttua julkaisujen välillä. Nykyisiä ja vanhempia muuttujia on siksi mukana rinnakkain. Manifestiin ei asetettu todentamatonta HA-vähimmäisversiota. [Virallinen huomautus teemamuuttujista](https://www.home-assistant.io/integrations/frontend/#unsupported-theme-variables).

## Käyttäjän HA-kokeilu 8.9.2026

| Tieto | Kirjattu havainto |
| --- | --- |
| Testauksen vahvistus | Käyttäjä ilmoitti testanneensa teemaa käynnissä olevassa Home Assistantissa. |
| Julkaisutilanne | Raportointihetken julkaistu teema oli Amazing 0.1.0. |
| Näyttö | Käyttäjän toimittama kuva aidosta HA-dashboardista. |
| Ulkoasu | Kuvassa näkyvät tumma navy-tausta, pyöristetyt kortit, vaalea teksti ja mintun sävyjä. Näkymässä on muun muassa sää-, kello- ja kaaviokortteja. |
| Home Assistant / frontend | Versioita ei ilmoitettu. |
| Asennustapa | Ei ilmoitettu; HACS-latausta tai päivitystä ei ole vahvistettu. |
| Selain / käyttöjärjestelmä | Ei ilmoitettu. |

Tämä on käyttäjän raportoima kokeilu ja dashboardin visuaalinen havainto. Se ei vahvista kaikkien korttien toiminnallisuutta, jokaista teemamuuttujaa tai alla olevan tarkistuslistan läpäisyä. Kuvasta ei voi päätellä profiili- ja näkymäteeman keskinäistä toimintaa.

Amazing Weather Cardin oikean yläkulman hehku on kortin oma taustatehoste. Amazing 0.1.0 asettaa yleiseksi korttipinnaksi tasaisen `#111e30`-värin. Korttikohtaiset liukuvärit, kaaviovärit, akselien muotoilu ja dashboardin asettelu voivat vaatia kyseisen kortin tai näkymän asetuksia.

Repositorion mukana olevat kuvakaappaukset ovat edelleen offline-esikatselusta. Käyttäjän HA-kuvaa käytettiin havaintojen kirjaamiseen.

## Suora HA-testi 8.9.2026

Amazing 0.2.0:n julkaisuehdokasta testattiin käyttäjän osoittamassa, erillisessä Sections-näkymässä. Teema ei lisää näitä kortteja automaattisesti.

| Kohde | Tulos / menetelmä |
| --- | --- |
| HA | Core 2026.8.3, HAOS 18.2, HACS 2.0.5. Frontend-paketin erillistä versionumeroa ei tallennettu. |
| Selain | Codexin Chromium-pohjainen selain Windowsissa; mitattu näkymä 1699 × 1272 CSS-pikseliä. |
| Asennus | HACS:n asennusluettelossa Amazing Theme v0.1.0. Julkaisuehdokkaan YAML päivitettiin hallittuun tiedostoon varmuuskopion jälkeen, SHA256 varmistettiin ja teemat ladattiin uudelleen. Tämä vaihe oli tiedostopäivitys, ei HACS-versionpäivitys. |
| Teematiedosto | Testatun YAML:n SHA256: `e9dda07cf87a9fb478ad7ab7a8e82410e6101bd4375f6c9c27e47ecd88d666c0`. |
| Näkymä | Amazing valittuna vain testinäkymään, ympäröivä profiili vaalea. Muut näkymät säilytettiin. |
| Amazing Weather Card | HACS:n asennusluettelossa 0.2.1, `theme: auto`. Nykytila, 24 h / 6 pv ennustejakson vaihto ja käyrät renderöityivät. Kortin ulkopinnalla varmistettiin sama hillitty hehku kuin natiivikorteissa. |
| History Graph | Minttu ja sininen sarja piirtyivät. Legendan valinnalla piilotettiin sininen sarja, nähtiin minttu käyrä ja palautettiin molemmat sarjat. |
| Statistics Graph | Tuntikeskiarvojen pylväät renderöityivät eksplisiittisellä lämpimällä keltaisella `#f4cf81`. |
| Sensor / Tile / Markdown | Sisältö renderöityi; korttien laskettu tausta oli navy + 8 %:n sininen liukuväri. Sensor-kortin oma käyrä käytti sinistä korostusväriä. |
| Button | Mittauspainike avasi more-info-dialogin; Escape sulki sen. Painikkeilla ei ohjattu kodin laitteita. |
| Sovellustason dialogi | Vaalea more-info-dialogi seurasi profiilia. Tämä on näkymäteeman rajaus; yhtenäiseen sivupalkkiin ja dialogeihin valitse Amazing myös profiilissa. |
| CSS-tarkistus | Korttien laskettu tausta ja kaikki kahdeksan graph-color-muuttujaa vastasivat YAML:ia. Otsikkokortin läpinäkyvyys säilyi. |
| Selainkonsoli | Ympäristössä esiintyi erillisiin custom-sidebar-, vertical-stack-in-card- ja lit-virtualizer-latauksiin liittyviä virheitä. Siksi ympäristöä ei raportoida virheettömäksi. Testatut kortit renderöityivät niistä huolimatta. |

Natiivien viiva- ja pylväskaavioiden toiminta tarkistettiin; kaikkia HA:n kaaviotyyppejä tai kolmannen osapuolen kortteja ei testattu. Esimerkiksi omaa taustaa tai väriä käyttävä kortti voi ohittaa teeman. Värit määräytyvät sarjajärjestyksestä, ellei kortissa ole omaa väriasetusta; katso [APPEARANCE.md](APPEARANCE.md).

Julkaisun jälkeinen HACS-päivityksen tulos kirjataan [v0.2.0:n julkaisutietoihin](https://github.com/raunosr/ha-amazing-theme/releases/tag/v0.2.0). Repositorion kuvat käyttävät vain esikatselun demotietoja; yksityistä HA-konfiguraatiota tai sen kuvia ei julkaista.

## Avoimet jatkotarkistukset

Seuraavat asiat eivät sisältyneet suoraan selainkokeeseen:

- Fyysinen puhelin ja Companion-sovellus. Selaimen 390 px:n kokopyyntö ei muuttanut mitattua leveyttä, joten sitä ei lasketa mobiilitestiksi.
- Profiiliin valitun Amazing-teeman kaikkien asetussivujen, dialogieditorien ja kenttätilojen tarkistus.
- Thermostat ja oikeiden laitteiden kytkimet/liukusäätimet sekä niiden kaikki tilat.
- Kaikkien kaaviotyyppien, kahdeksan yhtäaikaisen käyrän ja värinäön poikkeamien kattava arvio.

Paikallisen esikatselun aiempi mobiilitesti on erillinen havainto: [PREVIEW-QA.md](PREVIEW-QA.md). Kontrastilaskenta ei yksin takaa kaikkien HA-komponenttien saavutettavuutta.

## Lähteet

- [HA: frontend ja teemat](https://www.home-assistant.io/integrations/frontend/)
- [HA: näkymän teema](https://www.home-assistant.io/dashboards/views/#theme)
- [HA frontend: värit](https://github.com/home-assistant/frontend/blob/18f79dfc919e2019102c4fde0606fdb449f4cc15/src/resources/theme/color/color.globals.ts)
- [HA frontend: nykyiset semanttiset värit](https://github.com/home-assistant/frontend/blob/18f79dfc919e2019102c4fde0606fdb449f4cc15/src/resources/theme/color/semantic.globals.ts)
- [HA frontend: Web Awesome -värikytkennät](https://github.com/home-assistant/frontend/blob/18f79dfc919e2019102c4fde0606fdb449f4cc15/src/resources/theme/color/wa.globals.ts)
- [HA frontend: ha-card](https://github.com/home-assistant/frontend/blob/18f79dfc919e2019102c4fde0606fdb449f4cc15/src/components/ha-card.ts)
- [HA frontend: ha-dialog](https://github.com/home-assistant/frontend/blob/18f79dfc919e2019102c4fde0606fdb449f4cc15/src/components/ha-dialog.ts)
