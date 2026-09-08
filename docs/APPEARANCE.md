# Hehku ja kaaviovärit

Amazing 0.2.0 käyttää tavallisissa teemataustaa noudattavissa korteissa hillittyä sinistä hehkua oikeassa yläkulmassa. Hehku on staattinen eikä vaadi card-modia, animaatiota tai ladattavia resursseja.

## Korttien tausta

`ha-card-background` koostuu 280 × 210 px:n säteisestä liukuväristä ja peittävästä navy-pohjasta. Sinisen `#86c4ff` enimmäispeittävyys on 8 %, ja hehku häviää 72 %:n kohdalla. Kiinteä koko pitää hehkun pienenä myös leveässä kortissa. `card-background-color` säilyy yksivärisenä `#111e30`:na dialogeja, vihjeitä ja tasaväristä pintaa tarvitsevia komponentteja varten.

Omaa taustaansa käyttävä kortti voi ohittaa asetuksen. Amazing Weather Card 0.2.1:n `theme: auto` testattiin teeman kanssa; pakotetun `dark`- tai `light`-tilan omat pinnat ja hehku voivat erota tästä. Teema ei muuta sääkortin ohjelmakoodia tai sen ennustekaavioiden värejä.

Jos haluat tasaisen pinnan omaan teemaversioosi, vaihda sen nimi ja aseta:

```yaml
ha-card-background: "#111e30"
```

Älä tee pysyviä omia muutoksia HACS:n hallitsemaan tiedostoon, koska päivitys korvaa sen.

## Natiivien kaavioiden paletti

| Sarja | Väri | Sävyn nimi |
| --- | --- | --- |
| 1 | `#9fe5cf` | Minttu |
| 2 | `#86c4ff` | Sateensininen |
| 3 | `#f4cf81` | Lämmin keltainen |
| 4 | `#b5a7e8` | Laventeli |
| 5 | `#ff9b9b` | Koralli |
| 6 | `#79d5dc` | Turkoosi |
| 7 | `#e8b895` | Persikka |
| 8 | `#9caef5` | Sinivioletti |

Home Assistantin palettia tukevat kaaviot lukevat `graph-color-1` … `graph-color-8` -muuttujia sarjajärjestyksen perusteella. Teema ei tunnista automaattisesti lämpötilaa, sadetta tai sähkön hintaa. Yli kahdeksan sarjan väreissä käytetään HA:n muita oletuksia. Säilytä legendat ja yksiköt: sävyero yksin ei riitä tunnisteeksi.

Kun tietyn suureen väri halutaan samaksi eri korteissa, aseta kortin tukema sarjaväri erikseen: lämpötila `#9fe5cf`, sade `#86c4ff`, sähkön hinta `#f4cf81`. [examples/charts.yaml](../examples/charts.yaml) sisältää natiivin historian ja keltaisen hintapylvään esimerkit. Korvaa `_replace_me`-entiteetit omillasi. Tilastokaavio vaatii kyseiseltä sensorilta tallennettuja tilastoja.

Kolmannen osapuolen kortit, kuten ApexCharts Card, voivat käyttää omaa väriasetustaan. Myös Sensor-kortin pieni käyrä voi käyttää korostusväriä yleisen sarjapaletin sijaan. Teema ei korjaa kaavion akselien desimaaleja, yksiköitä tai toissijaista asteikkoa; ne määritellään kortissa.

Kaikki kahdeksan sävyä on tarkistettu vähintään 3:1-kontrastilla sekä navy-pohjaa että hehkun vaaleinta kohtaa vasten. Tämä ei takaa vierekkäisten sarjojen keskinäistä kontrastia tai kaikkien värinäön poikkeamien huomioimista. [Kontrastiraportti](VALIDATION.md), [HA-testin tulokset](COMPATIBILITY.md#suora-ha-testi-892026).

Lähteet: [HA frontend: sarjavärin valinta](https://github.com/home-assistant/frontend/blob/18f79dfc919e2019102c4fde0606fdb449f4cc15/src/common/color/colors.ts), [HA: History Graph](https://www.home-assistant.io/dashboards/history-graph/), [HA: Statistics Graph](https://www.home-assistant.io/dashboards/statistics-graph/).
