# Styling Rules — Resume & Services Pages

Source files:
- `resume.html` — body class `resume-page`
- `services.html` — body class `services-page`
- `assets/css/main.css` — template base
- `assets/css/custom.css` — Laboratory Work overrides (seaside sunset palette)

Skill-progress / kanban content from the about page is excluded from this document.

---

## 1. Color & Typography Variables

### From `main.css`

```css
--default-font: "Roboto", system-ui, -apple-system, "Segoe UI", Roboto,
  "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif,
  "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
  "Noto Color Emoji";
--heading-font: "Raleway", sans-serif;
--nav-font: "Poppins", sans-serif;
--background-color: #000000;
--default-color: #fafafa;
--heading-color: #ffffff;
--accent-color: #18d26e;        /* overridden by custom.css */
--surface-color: #1a1a1a;
--contrast-color: #000000;
```

### From `custom.css` overrides (sunset palette)

```css
@import url('https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700&display=swap');

--sunset-pink: #c25884;
--sunset-magenta: #b9447a;
--sky-purple: #5a58a9;
--seafoam-lavender: #e5adf8;
--sun-yellow: #ffeda3;
--sun-glow: #ffe5b6;
--wet-sand: #1a132a;
--wet-sand-deep: #0c0814;

--accent-color: var(--sunset-pink);              /* was #18d26e */
--nav-hover-color: var(--sunset-magenta);        /* was #18d26e */
--nav-dropdown-hover-color: var(--sunset-pink);  /* was #18d26e */

body {
  font-family: "Merriweather", system-ui, -apple-system, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans",
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
    "Noto Color Emoji", sans-serif;
  color: var(--seafoam-lavender);
  background-color: var(--wet-sand);
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "Merriweather", serif;
  font-weight: 700;
  line-height: 1.25;
  letter-spacing: 0.02em;
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

a { color: var(--sun-yellow); text-decoration: none; transition: color 0.25s ease; }
a:hover { color: var(--seafoam-lavender); text-decoration: underline; }

button,
input[type="submit"] {
  display: inline-block;
  background-color: var(--sunset-pink);
  color: var(--wet-sand-deep);
  font-family: "Merriweather", system-ui, -apple-system, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
  font-size: 1rem;
  font-weight: 700;
  padding: 0.85rem 1.75rem;
  border-radius: 10px;
  border: 2px solid var(--sunset-magenta);
  box-shadow: 0 4px 0 rgba(0, 0, 0, 0.35);
  transition: background-color 0.25s ease, color 0.25s ease,
    transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
  text-decoration: none;
}

button:hover,
input[type="submit"]:hover {
  background-color: var(--sunset-magenta);
  color: var(--sun-glow);
  transform: scale(1.05);
  box-shadow: 0 6px 0 rgba(0, 0, 0, 0.35);
}
```

---

## 2. Shared Page Shell

Applies to both `resume-page` and `services-page`.

### Header & Navigation

```css
.header {
  color: var(--default-color);
  background-color: var(--background-color);
  padding: 15px 0;
  transition: all 0.5s;
  z-index: 997;
}

.header .logo h1 {
  font-size: 30px;
  margin: 0;
  font-weight: 700;
  color: var(--heading-color);
}

.scrolled .header {
  box-shadow: 0 0 18px rgba(0, 0, 0, 0.1);
  --background-color: rgba(0, 0, 0, 0.8);
}

/* Desktop navigation */
.navmenu > ul {
  display: flex;
  list-style: none;
  align-items: center;
}
.navmenu > ul > li {
  white-space: nowrap;
  padding: 15px 14px;
}
.navmenu a {
  color: var(--nav-color);
  font-size: 15px;
  font-family: var(--nav-font);
  font-weight: 400;
  transition: 0.3s;
}
.navmenu .active,
.navmenu li:hover > a {
  color: var(--nav-hover-color);
}
.navmenu > ul > li > a:before {
  content: "";
  position: absolute;
  height: 2px;
  bottom: -6px;
  left: 0;
  background-color: var(--nav-hover-color);
  visibility: hidden;
  width: 0;
  transition: all 0.3s ease-in-out;
}
.navmenu .active:before,
.navmenu a:hover:before {
  visibility: visible;
  width: 25px;
}
```

### Footer

```css
.footer {
  color: var(--default-color);
  background-color: var(--background-color);
  font-size: 14px;
  text-align: center;
  padding: 30px 0;
  position: relative;
}
.footer h3 {
  font-size: 36px;
  font-weight: 700;
  margin: 0 0 15px 0;
}
.footer .social-links a {
  font-size: 16px;
  width: 36px;
  height: 36px;
  background: var(--accent-color);
  color: var(--contrast-color);
  border-radius: 50%;
  margin: 0 4px;
  transition: 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}
.footer .social-links a:hover {
  background: color-mix(in srgb, var(--accent-color), transparent 20%);
}
```

### Page Title & Breadcrumbs

```css
.page-title {
  color: var(--default-color);
  background-color: var(--background-color);
  position: relative;
}
.page-title .heading {
  padding: 160px 0 80px 0;
  border-top: 1px solid color-mix(in srgb, var(--default-color), transparent 90%);
}
.page-title .heading h1 {
  font-size: 38px;
  font-weight: 700;
}
.page-title nav {
  background-color: color-mix(in srgb, var(--default-color), transparent 90%);
  padding: 20px 0;
}
.page-title nav ol {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}
.page-title nav ol li + li {
  padding-left: 10px;
}
.page-title nav ol li + li::before {
  content: "/";
  display: inline-block;
  padding-right: 10px;
  color: color-mix(in srgb, var(--default-color), transparent 70%);
}
```

### Generic Sections & Scroll Top

```css
section,
.section {
  color: var(--default-color);
  background-color: var(--background-color);
  padding: 60px 0;
  scroll-margin-top: 100px;
  overflow: clip;
}

#scroll-top {
  position: fixed;
  visibility: hidden;
  opacity: 0;
  right: 15px;
  bottom: -15px;
  z-index: 99999;
  background-color: var(--accent-color);
  width: 44px;
  height: 44px;
  border-radius: 50px;
  transition: all 0.4s;
}
#scroll-top.active {
  visibility: visible;
  opacity: 1;
  bottom: 15px;
}
#scroll-top i {
  font-size: 24px;
  color: var(--contrast-color);
  line-height: 0;
}
#scroll-top:hover {
  background-color: color-mix(in srgb, var(--accent-color), transparent 20%);
}
```

---

## 3. Resume Page (`body.resume-page`)

### From `main.css`

```css
.resume .resume-title {
  color: var(--heading-color);
  font-size: 26px;
  font-weight: 700;
  margin-top: 20px;
  margin-bottom: 20px;
}

.resume .resume-item {
  padding: 0 0 20px 20px;
  margin-top: -2px;
  border-left: 2px solid var(--accent-color);
  position: relative;
}

.resume .resume-item h4 {
  line-height: 18px;
  font-size: 18px;
  font-weight: 600;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--default-color), transparent 20%);
  margin-bottom: 10px;
}

.resume .resume-item h5 {
  font-size: 16px;
  padding: 5px 15px;
  display: inline-block;
  font-weight: 600;
  margin-bottom: 10px;
}

.resume .resume-item ul {
  padding-left: 20px;
}
.resume .resume-item ul li {
  padding-bottom: 10px;
}
.resume .resume-item:last-child {
  padding-bottom: 0;
}

.resume .resume-item::before {
  content: "";
  position: absolute;
  width: 16px;
  height: 16px;
  border-radius: 50px;
  left: -9px;
  top: 0;
  background: var(--background-color);
  border: 2px solid var(--accent-color);
}
```

### From `custom.css` overrides

```css
#resume.section {
  padding: 100px 0;
}

.resume .resume-title {
  margin-top: 1.5rem;
  margin-bottom: 1.25rem;
}

.resume .resume-item {
  padding: 1.5rem 0 1.5rem 2.5rem;
  margin-top: 0;
  border-left: 4px solid transparent;
  border: 1px solid rgba(185, 68, 122, 0.35);
  border-left: 4px solid var(--sunset-magenta);
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(12, 8, 20, 0.45);
}
```

**Markup structure:** two-column timeline (`col-lg-6`), each `resume-item` contains `h4` (role/degree), `h5` (dates), and either a `p` description or a `ul` bullet list.

---

## 4. Services Page (`body.services-page`)

### From `main.css`

#### Service cards

```css
.services .service-item {
  background-color: var(--surface-color);
  text-align: center;
  padding: 80px 20px;
  transition: all ease-in-out 0.3s;
  height: 100%;
}

.services .service-item .icon {
  margin: 0 auto;
  width: 64px;
  height: 64px;
  background: var(--accent-color);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  transition: 0.3s;
  transform-style: preserve-3d;
}
.services .service-item .icon i {
  color: var(--contrast-color);
  font-size: 28px;
  transition: ease-in-out 0.3s;
}
.services .service-item .icon::before {
  position: absolute;
  content: "";
  left: -8px;
  top: -8px;
  height: 100%;
  width: 100%;
  background: color-mix(in srgb, var(--accent-color), transparent 80%);
  border-radius: 5px;
  transition: all 0.3s ease-out 0s;
  transform: translateZ(-1px);
}

.services .service-item h3 {
  font-weight: 700;
  margin: 10px 0 15px 0;
  font-size: 22px;
}
.services .service-item p {
  line-height: 24px;
  font-size: 14px;
  margin-bottom: 0;
}

.services .service-item .price {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  font-weight: 700;
  color: var(--accent-color);
  font-size: 14px;
}
```

#### Hover state on cards

```css
.services .service-item:hover {
  background: var(--accent-color);
  border-color: var(--accent-color);
}
.services .service-item:hover .icon {
  background: var(--surface-color);
}
.services .service-item:hover .icon i {
  color: var(--accent-color);
}
.services .service-item:hover .icon::before {
  background: color-mix(in srgb, var(--background-color), transparent 70%);
}
.services .service-item:hover h3,
.services .service-item:hover p {
  color: var(--contrast-color);
}
```

#### Section headings

```css
.services .services-title {
  color: var(--heading-color);
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 15px 0;
  font-family: var(--heading-font);
}
```

#### Services table

```css
.services .services-table {
  width: 100%;
  border-collapse: collapse;
  margin: 0 0 30px 0;
  font-size: 14px;
}
.services .services-table thead th {
  color: color-mix(in srgb, var(--default-color), transparent 20%);
  font-weight: 600;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 10px 16px;
  border-bottom: 1px solid color-mix(in srgb, var(--default-color), transparent 70%);
  text-align: left;
  font-family: var(--heading-font);
}
.services .services-table tbody td {
  padding: 12px 16px;
  color: var(--default-color);
  border-bottom: 1px solid color-mix(in srgb, var(--default-color), transparent 90%);
  vertical-align: middle;
}
.services .services-table tbody tr:last-child td {
  border-bottom: none;
}
```

#### Services list (unordered)

```css
.services .services-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.services .services-list li {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}
.services .services-list strong {
  margin-right: 10px;
  color: var(--heading-color);
}
.services .services-list i {
  font-size: 16px;
  margin-right: 8px;
  color: var(--accent-color);
  line-height: 0;
}
.services .services-list li > ul {
  margin-top: 6px;
  margin-left: 24px;
  padding-left: 14px;
  border-left: 2px solid color-mix(in srgb, var(--default-color), transparent 80%);
  list-style: none;
}
.services .services-list li > ul li {
  margin-bottom: 6px;
  font-size: 14px;
}
.services .services-list li > ul li i {
  font-size: 12px;
}
```

#### Services stages (ordered list)

```css
.services .services-stages {
  list-style: decimal;
  padding-left: 20px;
  margin: 0;
}
.services .services-stages li {
  margin-bottom: 15px;
  color: var(--default-color);
  font-size: 14px;
}
```

### From `custom.css` overrides

#### Lists

```css
.services-list {
  list-style: none;
  padding-left: 0;
  margin: 0;
}
.services-list li {
  position: relative;
  padding-left: 1.6rem;
  margin-bottom: 0.85rem;
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

.services-stages {
  list-style: none;
  counter-reset: stages;
  padding-left: 0;
  margin: 0;
}
.services-stages li {
  counter-increment: stages;
  position: relative;
  padding-left: 3rem;
  margin-bottom: 1rem;
  color: var(--seafoam-lavender);
}
.services-stages li::before {
  content: counter(stages);
  position: absolute;
  left: 0;
  top: 0.05rem;
  width: 2.4rem;
  height: 2.4rem;
  background: var(--sky-purple);
  color: var(--wet-sand-deep);
  font-weight: 700;
  font-size: 1.15rem;
  border-radius: 50%;
  text-align: center;
  line-height: 2.4rem;
}

.services-list li > ul {
  list-style: none;
  counter-reset: none;
  margin-top: 0.5rem;
  margin-bottom: 0;
  padding-left: 1.6rem;
  border-left: 3px solid var(--seafoam-lavender);
}
.services-list li > ul li {
  padding-left: 1.4rem;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
  color: var(--sun-glow);
}
.services-list li > ul li::before {
  content: "";
  position: absolute;
  left: -0.25rem;
  top: 0.55rem;
  width: 8px;
  height: 8px;
  background-color: var(--sun-yellow);
  border-radius: 25%;
}
```

#### Table

```css
.services-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}
.services-table th,
.services-table td {
  padding: 1rem 1.25rem;
  text-align: center;
  border: 1px solid rgba(229, 173, 248, 0.45);
  color: var(--seafoam-lavender);
}
.services-table thead th {
  background-color: var(--sunset-pink);
  color: var(--wet-sand-deep);
  border: 1px solid var(--sunset-magenta);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: 700;
  font-size: 0.95rem;
}
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

#### Animated gradient background on services section

```css
#services.services.section {
  position: relative;
  overflow: hidden;
}
#services.services.section::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    45deg,
    var(--sunset-pink),
    var(--sky-purple),
    var(--sunset-magenta),
    var(--wet-sand-deep)
  );
  background-size: 300% 300%;
  animation: gradientMove 8s ease infinite;
  opacity: 0.5;
  z-index: 0;
}
#services.services.section > .container {
  position: relative;
  z-index: 1;
}
@keyframes gradientMove {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
```

**Markup structure:** six `.service-item` cards in a grid (`col-lg-4 col-md-6`), each with `.icon` (Bootstrap icon), `h3`, `p`, `.price`; followed by `.services-table`, `.services-list`, `.services-stages`, and `.media-item` blocks.

---

## 5. Key Differences Between the Two Pages

| Feature | Resume page | Services page |
|---------|-------------|---------------|
| Section padding | `100px 0` (custom) | inherited `60px 0` |
| Item structure | Timeline items with vertical accent line | Centered icon cards with hover fill |
| List styling | Default bullets | Custom circular markers + counters |
| Table styling | N/A | Zebra striping + centered header/footer |
| Special background | None | Animated 4-color gradient behind section |
