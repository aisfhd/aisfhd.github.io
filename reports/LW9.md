# Laboratory Work 9 Report

**Course:** Script Programming  
**Institution:** VILNIUS TECH  
**Year:** 2026  
**Student:** Dmytro Polishchuk  
**Repository:** https://aisfhd.github.io/  
**Branch:** LW9

---

## Mandatory Task (6 points)

---

### 1. Create a new CSS stylesheet and link it in all HTML files

**File:** `assets/css/custom.css` (new file)  
**Linked in:** `index.html`, `about.html`, `resume.html`, `portfolio.html`, `services.html`, `contact.html`, `starter-page.html`

The `custom.css` link is placed immediately after `main.css` in every HTML file so custom styles override the template:

```html
<link href="assets/css/main.css" rel="stylesheet">
<link href="assets/css/custom.css" rel="stylesheet">
```

---

### 2. Typography styles in `custom.css`

**Font family:** Merriweather (imported via `@import` from Google Fonts), applied to `body` and all headings:

```css
@import url('https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700&display=swap');

body {
  font-family: "Merriweather", system-ui, -apple-system, sans-serif;
  color: var(--seafoam-lavender);
  background-color: var(--wet-sand);
}

h1, h2, h3, h4, h5, h6 {
  font-family: "Merriweather", serif;
  font-weight: 700;
  line-height: 1.25;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.45);
}

h1 { font-size: 2.75rem; color: var(--sun-yellow); }
h2 { font-size: 2.25rem; color: var(--sunset-pink); }
h3 { font-size: 1.75rem; color: var(--sky-purple); }
h4 { font-size: 1.375rem; color: var(--sunset-magenta); }
h5 { font-size: 1.125rem; color: var(--seafoam-lavender); }
h6 { font-size: 1rem; font-weight: 500; font-style: italic; color: #b269a1; }

p {
  font-family: "Merriweather", serif;
  font-size: 1.125rem;
  font-weight: 400;
  color: var(--sun-glow);
  line-height: 1.8;
  margin-bottom: 1.6rem;
}
```

All heading and paragraph styles are visually different from the original template (which used Roboto/Raleway with white headings).

---

### 3. Buttons and links styles in `custom.css`

**Buttons** (including `input[type="submit"]` for the contact form) with `:hover` and `:active` pseudo-classes:

```css
button, input[type="submit"] {
  background-color: var(--sunset-pink);
  color: var(--wet-sand-deep);
  font-family: "Merriweather", system-ui, sans-serif;
  font-weight: 700;
  padding: 0.85rem 1.75rem;
  border-radius: 10px;
  border: 2px solid var(--sunset-magenta);
  box-shadow: 0 4px 0 rgba(0, 0, 0, 0.35);
  transition: background-color 0.25s ease, color 0.25s ease,
    transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
}

button:hover, input[type="submit"]:hover {
  background-color: var(--sunset-magenta);
  color: var(--sun-glow);
  transform: scale(1.05);
}

button:active, input[type="submit"]:active {
  background-color: var(--sky-purple);
  color: var(--sun-yellow);
  transform: scale(0.96);
}
```

**Links** with `:hover` and `:visited`:

```css
a {
  color: var(--sun-yellow);
  text-decoration: none;
  transition: color 0.25s ease, text-decoration 0.25s ease;
}

a:hover {
  color: var(--seafoam-lavender);
  text-decoration: underline;
}

a:visited {
  color: #b269a1;
}
```

Both buttons and links are visually different from the original template (which used accent green `#18d26e`).

---

### 4. Spacing, layout, and content blocks — About, Resume, Portfolio

**About section** (`#about`):

```css
#about.section { padding: 90px 0; }
#about .content {
  margin-top: 2rem;
  padding: 2rem;
  border: 1px solid rgba(194, 88, 132, 0.45);
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(12, 8, 20, 0.55);
}
```

**Resume section** (`.resume`):

```css
#resume.section { padding: 100px 0; }
.resume .resume-item {
  padding: 1.5rem 0 1.5rem 2.5rem;
  margin-top: 0;
  border-left: 4px solid var(--sunset-magenta);
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(12, 8, 20, 0.45);
}
```

**Portfolio section** (`.portfolio`):

```css
#portfolio.section { padding: 110px 0 0 0; }
.portfolio-item { margin-bottom: 2rem; border-radius: 14px; box-shadow: 0 8px 24px rgba(12, 8, 20, 0.5); }
.portfolio .portfolio-content {
  padding: 1rem;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(12, 8, 20, 0.35);
}
```

Spacing (margin/padding) changed in all three sections; borders, border-radius, and box-shadows added to content blocks. Layout remains consistent.

---

### 5. Two selected components — Footer and Scroll-top button

**Footer** (`.footer`) — 4+ CSS properties changed:

```css
.footer {
  color: var(--seafoam-lavender);
  background: linear-gradient(180deg, var(--wet-sand-deep) 0%, var(--wet-sand) 55%, var(--sky-purple) 100%);
  font-size: 16px;
  padding: 56px 0 34px;
  border-top: 4px solid var(--sunset-pink);
  box-shadow: 0 -6px 24px rgba(12, 8, 20, 0.7);
}
.footer .social-links a {
  background: var(--sunset-magenta);
  color: var(--sun-glow);
  border-radius: 14px;
  border: 2px solid var(--seafoam-lavender);
}
```

**Scroll-top button** (`#scroll-top`) — 4+ CSS properties changed:

```css
#scroll-top, .scroll-top {
  background: linear-gradient(135deg, var(--sunset-pink), var(--sunset-magenta));
  width: 52px;
  height: 52px;
  border-radius: 16px;
  border: 2px solid var(--seafoam-lavender);
  box-shadow: 0 6px 18px rgba(194, 88, 132, 0.55);
  color: var(--sun-glow);
  right: 24px;
  bottom: 24px;
}
```

Neither duplicates Tasks 2–4 styling; both are component-specific.

---

### 6. Contrast and readability

All text-to-background combinations verified:

| Element | Text Colour | Background | Contrast |
|---------|-------------|------------|----------|
| Body / paragraphs | `#e5adf8` / `#ffe5b6` | `#1a132a` | ~7:1+ |
| Headings (all sizes) | pink/magenta/purple/yellow/lavender | `#1a132a` | ≥3:1 (large text) |
| Buttons | `#0c0814` on `#c25884` | — | ~4.6:1 |
| Links | `#ffeda3` / `#e5adf8` / `#b269a1` | `#1a132a` | ≥4.5:1 |

Content remains clearly readable and neatly arranged.

---

### 7. Save the changes to the GitHub repository

All changes committed and pushed to the `LW9` branch:

- `c411250` — LW9: Add custom.css with seaside sunset typography, component styles, and Lab 8 list/table styles (8 files, 478 insertions)
- `11e99b8` — LW9: Replace all green accent colours with seaside sunset palette (override `--accent-color`, `--nav-hover-color`, `--nav-dropdown-hover-color`)

**Branch:** `LW9`  
**Remote:** https://github.com/aisfhd/aisfhd.github.io.git  
**Pull request:** https://github.com/aisfhd/aisfhd.github.io/pull/new/LW9

---

## Complementary Task (4 points)

---

### 1. Update the styles of the two lists (Lab 8 elements in `services.html`)

**Unordered list** (`.services-list`) — custom bullet markers via `::before` pseudo-element:

```css
.services-list {
  list-style: none;
  padding-left: 0;
}
.services-list li {
  position: relative;
  padding-left: 1.6rem;
  color: var(--seafoam-lavender);
}
.services-list li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.55rem;
  width: 10px;
  height: 10px;
  background-color: var(--sunset-pink);
  border-radius: 50%;
}
```

**Ordered list** (`.services-stages`) — numbered stages via CSS counter:

```css
.services-stages {
  list-style: none;
  counter-reset: stages;
  padding-left: 0;
}
.services-stages li {
  counter-increment: stages;
  position: relative;
  padding-left: 3rem;
  color: var(--seafoam-lavender);
}
.services-stages li::before {
  content: counter(stages);
  position: absolute;
  left: 0;
  width: 2.4rem;
  height: 2.4rem;
  background: var(--sky-purple);
  color: var(--wet-sand-deep);
  font-weight: 700;
  border-radius: 50%;
  text-align: center;
  line-height: 2.4rem;
}
```

**Nested list** (`.services-list li > ul`) — visually distinct from main list:

```css
.services-list li > ul {
  list-style: none;
  padding-left: 1.6rem;
  border-left: 3px solid var(--seafoam-lavender);
}
.services-list li > ul li {
  padding-left: 1.4rem;
  font-size: 0.95rem;
  color: var(--sun-glow);
}
.services-list li > ul li::before {
  content: "";
  position: absolute;
  left: -0.25rem;
  width: 8px;
  height: 8px;
  background-color: var(--sun-yellow);
  border-radius: 25%;
}
```

---

### 2. Update the table style (Lab 8 element in `services.html`)

**Consistent cell padding and centre-aligned content:**

```css
.services-table th, .services-table td {
  padding: 1rem 1.25rem;
  text-align: center;
  border: 1px solid rgba(229, 173, 248, 0.45);
  color: var(--seafoam-lavender);
}
```

**Header row visually distinct:**

```css
.services-table thead th {
  background-color: var(--sunset-pink);
  color: var(--wet-sand-deep);
  border: 1px solid var(--sunset-magenta);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: 700;
  font-size: 0.95rem;
}
```

**Zebra striping + hover effect:**

```css
.services-table tbody tr:nth-child(even) {
  background-color: rgba(229, 173, 248, 0.18);
}
.services-table tbody tr:nth-child(odd) {
  background-color: rgba(255, 229, 182, 0.1);
}
.services-table tbody tr:hover {
  background-color: rgba(255, 237, 163, 0.35);
  transition: background-color 0.25s ease;
}
```

---

### 3. Save the changes to the GitHub repository

All complementary task styles were appended to `assets/css/custom.css` and included in the same commits as the mandatory task (see section 7 above). No HTML files were modified for the complementary task.

---

## Palette Reference

All colours sampled from `assets/img/custom-img.png` (seaside sunset):

| Variable | Value | Source |
|----------|-------|--------|
| `--sunset-pink` | `#c25884` | pink sky |
| `--sunset-magenta` | `#b9447a` | magenta sky |
| `--sky-purple` | `#5a58a9` | lavender-purple sky |
| `--seafoam-lavender` | `#e5adf8` | seafoam |
| `--sun-yellow` | `#ffeda3` | sun |
| `--sun-glow` | `#ffe5b6` | sun glow |
| `--wet-sand` | `#1a132a` | wet sand |
| `--wet-sand-deep` | `#0c0814` | deep wet sand |
