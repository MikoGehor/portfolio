# 🎯 Miko Gehör - Portfolio Sivusto

Moderni, tyylikkäs ja responsiivinen portfolio-sivusto, joka esittelee ohjelmistokehittäjä Miko Gehörin osaamisen, projektit ja kokemuksen.

## ✨ Ominaisuudet

- **Modernit animaatiot** - Fade-in ja smooth scroll -tehoisteet
- **Responsiivinen design** - Toimii täydellisesti kaikilla näytöillä (pöytä, tabletti, puhelin)
- **Hero-osio** - Houkutteleva johdanto-osio
- **About-osio** - Koulutus, työkokemus, osaaminen ja mielenkiinnot
- **Projektigalleria** - Esittelee projekteja kuvilla ja kuvauksilla
- **Yhteydenotto-lomake** - Vieraajat voivat lähettää viestejä
- **Moderni typografia** - Minimalistinen ja puhdas design
- **Paikallinen tallentaminen** - Lomakkeiden vastaukset tallennetaan selaimeen
- **Optimoitu suorituskyvy** - Nopea latausaika ja sujuva käyttökokemus

## 📁 Projektirakenne

```
portfolio/
├── index.html              # Pääsivun HTML
├── css/
│   └── styles.css          # Kaikki tyylit
├── js/
│   └── script.js           # Kaikki JavaScript-funktiot
├── img/                    # Kuvatiedostot
│   ├── hero-placeholder.jpg
│   ├── verdant-robot.jpg
│   ├── project-placeholder-1.jpg
│   └── project-placeholder-2.jpg
├── assets/                 # Muut resurssit
└── README.md               # Tämä tiedosto
```

## 🚀 Asennus & Käyttöönotto

### Vaatimukset
- Nykyaikainen web-selain (Chrome, Firefox, Safari, Edge)
- Tekstieditori (VS Code, Sublime, jne.)
- Git (vaihtoehtoisesti)

### Paikallinen asennus

1. **Kloonaa repositorio**
   ```bash
   git clone https://github.com/mikogehor/portfolio.git
   cd portfolio
   ```

   tai lataa ZIP-tiedosto ja pura se

2. **Avaa tiedostot**
   - Avaa `index.html` suoraan selaimessasi kaksoisklikkaamalla
   - TAI käytä live server -laajennusta VS Codessa:
     - Asenna VS Code -laajennus "Live Server"
     - Klikkaa hiiren oikealla painikkeella `index.html` → "Open with Live Server"

3. **Selaimessa näkyminen**
   - Sivusto avautuu osoitteessa `http://localhost:5500` (Live Server)
   - tai suoraan `file://` -protokollalla

## 📝 Käyttöohjeet

### Kuvatiedostojen lisääminen

1. Kopioi kuvat `img/` -kansioon
2. Päivitä kuvapolut `index.html` -tiedostossa:
   ```html
   <img src="img/sinun-kuva.jpg" alt="Kuvausteksti">
   ```

### Sisällön muokkaaminen

- **Henkilötiedot**: Muokkaa `index.html` -tiedostoä
- **Värit & tyylit**: Muokkaa `css/styles.css` -tiedostoa
- **Interaktiivisuus**: Muokkaa `js/script.js` -tiedostoa

### Lomakkeiden vastaukset

Lomakkeen vastaukset tallennetaan selainesi paikalliseen tallennukseen (localStorage). Voit tarkistaa ne seuraavasti:

1. Avaa selaimen kehitystyökalut (F12)
2. Mene Console-välilehdelle
3. Kirjoita: `logSubmissions()`
4. Tai hae tiedot: `getFormSubmissions()`

Vastausten poistaminen:
```javascript
clearFormSubmissions()
```

## 🌐 GitHubiin lisääminen

### Ensimmäinen kerta:

```bash
git init
git add .
git commit -m "Initial portfolio commit"
git branch -M main
git remote add origin https://github.com/SINUN_NIMI/portfolio.git
git push -u origin main
```

### Päivitykset:

```bash
git add .
git commit -m "Päivitysten kuvaus"
git push
```

## 🛠️ Tekniset tiedot

### Käytetyt teknologiat
- **HTML5** - Semanttinen merkintä
- **CSS3** - Modernityylit, Flexbox, Grid, animaatiot
- **JavaScript (Vanilla)** - Ei ulkoisia kirjastoja
- **LocalStorage API** - Datan paikallinen tallentaminen

### Selaimen yhteensopivuus
- ✅ Chrome/Chromium (v90+)
- ✅ Firefox (v88+)
- ✅ Safari (v14+)
- ✅ Edge (v90+)
- ⚠️ IE11 (ei täysin tuettu)

## 📊 Optimointi

### Suorituskyky
- Ei ulkoisia riippuvuuksia
- Minimaalinen JavaScript
- CSS-optimointi
- Kuvien optimointiehdotus: Käytä WEBP-muotoa

### SEO
- Semanttinen HTML
- Meta-tunnisteet
- Accessible-rakenne
- Responsiivinen design

## 🎨 Värin mukauttaminen

Muokkaa `css/styles.css` -tiedoston `:root` -osiota:

```css
:root {
    --primary-color: #2563eb;      /* Sininen */
    --secondary-color: #1e40af;    /* Tumma sininen */
    --accent-color: #ec4899;       /* Pinkki */
    --dark-bg: #0f172a;            /* Tumma tausta */
    --light-bg: #f8fafc;           /* Kevyt tausta */
}
```

## 📱 Responsiivisuus

Sivusto on optimoitu seuraaville näyttökoille:
- 📱 Puhelin: 320px - 640px
- 📱 Pienempi tabletti: 641px - 1024px
- 💻 Suurempi tabletti: 1025px - 1440px
- 🖥️ Pöytä: 1441px+

## 🐛 Vianetsintä

### Sivusto ei lataa
- Tarkista, että kaikki tiedostot ovat oikeissa kansioissa
- Tarkista selaimen konsoli (F12) virheiden varalta

### Kuvat eivät näy
- Tarkista kuvatiedostojen polut `index.html` -tiedostossa
- Varmista, että kuvatiedostot ovat `img/` -kansiossa
- Kokeile .jpg tai .png muotoja

### Lomake ei toimi
- Tarkista selaimen konsoli (F12)
- Varmista, että JavaScript on käytössä
- Tarkista, että muut skriptit eivät ole poistaneet lomakeelementtejä

## 📞 Yhteystiedot

- 📧 **Sähköposti**: miko.gehor@gmail.com
- 🔗 **GitHub**: [github.com/mikogehor](https://github.com/mikogehor)

## 📄 Lisenssi

MIT License - Vapaa käyttö ja muokkaus henkilökohtaiseen ja kaupalliseen käyttöön.

## 🙏 Kiitokset

Kiitos sinulle, että käytät tätä portfolio-sivustoa!

---

**Luotu** 2026 | **Päivitetty** Tammikuu 23, 2026
