# Yhteensopivuus

## Toteutuksen periaate

`Amazing` ilmoittaa vain `modes.dark`-tilan. Home Assistant käyttää profiiliin valittaessa tummaa pohjaa. Värit ovat teeman ylätasolla, jotta ne ovat käytettävissä myös näkymään rajattaessa, vaikka ympäröivä profiili olisi vaalea. Teema ei muuta dashboardin asettelua tai käyttöliittymän kokoa.

Värikerrokset:

| Kerros | Esimerkkejä | Tarkoitus |
| --- | --- | --- |
| Perusvärit | `primary-color`, `accent-color` | Minttu ja sateensininen |
| Pinnat ja teksti | `card-background-color`, `primary-text-color` | Alkuperäisen sääkortin tumma paletti |
| Natiivikortit | `ha-card-*` | 24 px kulmat, 1 px hillitty reuna |
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

GitHubin HACS- ja teemavalidoinnin ajantasaiset tulokset: [Validation](https://github.com/raunosr/ha-amazing-theme/actions/workflows/validate.yaml). HACS-validaattori tarkistaa repositorion myös verkosta.

Ei suoritettu: asennus käyttäjän HA:han, aidot HA-komponentit selaimessa, HACS-lataus tai mobiilin Companion-sovellus. Näiden tuloksia ei voi päätellä HTML-esikatselusta tai repositoriovalidoinnista.

HA:n dokumentaatio takaa ensisijaisesti pää-/korostusvärit ja dokumentoidut tilavärit. Muiden tyylimuuttujien toiminta voi muuttua julkaisujen välillä. Nykyisiä ja vanhempia muuttujia on siksi mukana rinnakkain. Manifestiin ei asetettu todentamatonta HA-vähimmäisversiota. [Virallinen huomautus teemamuuttujista](https://www.home-assistant.io/integrations/frontend/#unsupported-theme-variables).

## Kokeilu aidossa HA:ssa

Suorita itse tai erikseen valtuutetussa testiympäristössä:

1. Asenna tiedosto ja varmista, että valikossa näkyy yksi `Amazing`-teema.
2. Valitse teema testiprofiilissa. Tarkista sidebar, asetussivu ja linkit.
3. Tarkista natiivit Tile-, Entities-, Thermostat-, Markdown- ja Weather Forecast -kortit sekä yksi historianäkymä.
4. Avaa more-info-dialogi ja korttieditori. Tarkista kentän teksti, vihjeteksti, valikko, virheilmoitus, valittu vaihtoehto ja tallennuspainikkeen kontrasti.
5. Tarkista kytkimen molemmat tilat, liukusäädin ja näppäimistökohdistus. Tarkista käytöstä poistettu säädin erillisenä tilana.
6. Vaihda profiili takaisin entiseen teemaan ja valitse `Amazing` vain demodashboardin näkymälle. Tarkista myös siirtyminen toiseen näkymään ja takaisin. Sovellustason dialogin profiiliväritys on eri asia kuin näkymän korttiväritys.
7. Tarkista tumma ja vaalea ympäröivä profiili, puhelin ja Companion-sovellus. Palauta testin jälkeen aiemmat valinnat.

Tallenna testattu HA- ja frontend-versio tähän tiedostoon. Julkaisukuvat saa korvata aidon HA:n kuvilla vain, jos kuvissa käytetään demotietoja.

## Lähteet

- [HA: frontend ja teemat](https://www.home-assistant.io/integrations/frontend/)
- [HA: näkymän teema](https://www.home-assistant.io/dashboards/views/#theme)
- [HA frontend: värit](https://github.com/home-assistant/frontend/blob/18f79dfc919e2019102c4fde0606fdb449f4cc15/src/resources/theme/color/color.globals.ts)
- [HA frontend: nykyiset semanttiset värit](https://github.com/home-assistant/frontend/blob/18f79dfc919e2019102c4fde0606fdb449f4cc15/src/resources/theme/color/semantic.globals.ts)
- [HA frontend: Web Awesome -värikytkennät](https://github.com/home-assistant/frontend/blob/18f79dfc919e2019102c4fde0606fdb449f4cc15/src/resources/theme/color/wa.globals.ts)
- [HA frontend: ha-card](https://github.com/home-assistant/frontend/blob/18f79dfc919e2019102c4fde0606fdb449f4cc15/src/components/ha-card.ts)
- [HA frontend: ha-dialog](https://github.com/home-assistant/frontend/blob/18f79dfc919e2019102c4fde0606fdb449f4cc15/src/components/ha-dialog.ts)
