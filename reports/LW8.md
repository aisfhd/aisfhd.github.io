# Laboratory Work 8 Report

**Course:** Script Programming  
**Institution:** VILNIUS TECH  
**Year:** 2026  
**Student:** Dmytro Polishchuk  
**Repository:** https://aisfhd.github.io/  
**Branch:** main

---

## Mandatory Task (6 points)

---

### 1. Update the HTML content of CV website sections

#### 1a. Resume – education and work experience (≥3 entries each)

**File:** `resume.html`

**Education (3 entries):**

| # | Entry | Institution | Location | Period |
|---|-------|-------------|----------|--------|
| 1 | Computer/Software Engineering | Vilnius Tech | Vilnius, Lithuania | 2025 – Present (2 years) |
| 2 | Computer Science Fundamentals | No-Name School | Vinnytsia, Ukraine | 2020 – 2024 |
| 3 | Certified Pizza Tester | Pizza Palace | Vilnius, Lithuania | 2024 |

**Professional Experience (3 entries):**

| # | Entry | Institution | Location | Period |
|---|-------|-------------|----------|--------|
| 1 | Senior Pizza Eater | Pizza Palace | Vilnius, Lithuania | 2011 – Present (15 years) |
| 2 | Junior Lecture Skipper | Vilnius Tech | Vilnius, Lithuania | 2025 – Present |
| 3 | Unpaid Probability and Statistics Course Mentor | College of Trinity | Dublin, Ireland | 2023 |

Each entry includes a heading (`<h4>`), period (`<h5>`), institution (`<p><em>`), and description (`<p>` or `<ul>`).

---

#### 1b. Portfolio – MATLAB laboratory work graphs (LW 3–4) (≥3 graphs)

**File:** `portfolio.html`

All images are saved in `assets/img/portfolio/`.

| # | Image File | Title (`<h4>`) | Description (`<p>`) | LW Reference |
|---|------------|----------------|---------------------|--------------|
| 1 | `lw3-1.png` | Graphs of f(x) = x, x², x³ | Plots of the functions f₁(x) = x, f₂(x) = x², f₃(x) = x³ over the interval x ∈ [0, 4]. | LW 3-1 |
| 2 | `lw3-2.png` | 3D Plot: y(x) = sin(x)cos(x), z(x) = cos(x) | Three-dimensional plot of y(x) = sin(x)cos(x) and z(x) = cos(x) over x ∈ [0, 30]. | LW 3-2 |
| 3 | `lw4-1.png` | Surface Plot: z(x,y) = 1-(x²+y²) — Colormap Jet | Surface plot of z(x,y) = 1-(x²+y²) over x, y ∈ [-5, 5] using the jet colormap. | LW 4-1 |
| 4 | `lw4-4.png` | Surface Plot: z(x,y) = 1-(x²+y²) — Colormap Custom2 | Surface plot of z(x,y) = 1-(x²+y²) over x, y ∈ [-5, 5] using a custom pink-purple colormap. | LW 4-4 |

Each graph image uses `class="img-fluid"` and includes a descriptive `alt` attribute.

---

### 2. Add an HTML table to the Services section

**File:** `services.html`, lines 179–204

**Table dimensions: 4 rows × 3 columns** (1 header row + 3 data rows)

| Service | Description | Price |
|---------|-------------|-------|
| Backend Development & API Design | Robust APIs, databases, and server-side systems with fullstack understanding. | From €50/hour |
| Pizza Quality Evaluation | Certified pizza testing covering crust texture, sauce balance, topping distribution, and overall taste. | €25 per pizza |
| Lecture Skipping Strategies | Master the art of strategic lecture absence with perfect timing and independent catch-up techniques. | €15/session |

**HTML structure:**

```html
<table class="services-table">
  <thead>
    <tr>
      <th scope="col">Service</th>
      <th scope="col">Description</th>
      <th scope="col">Price</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>Backend Development & API Design</td><td>...</td><td>From €50/hour</td></tr>
    <tr><td>Pizza Quality Evaluation</td><td>...</td><td>€25 per pizza</td></tr>
    <tr><td>Lecture Skipping Strategies</td><td>...</td><td>€15/session</td></tr>
  </tbody>
</table>
```

---

### 3. Add two HTML lists to the Services section

**File:** `services.html`

#### 3a. Unordered list – technologies and tools (≥3 items)

**Lines:** 209–219

```html
<ul class="services-list">
  <li><i class="bi bi-chevron-right"></i> <strong>Backend:</strong> <span>Node.js &amp; Express</span></li>
  <li><i class="bi bi-chevron-right"></i> <strong>Database:</strong> <span>PostgreSQL &amp; Redis</span></li>
  <li><i class="bi bi-chevron-right"></i> <strong>DevOps:</strong> <span>Docker &amp; GitHub Actions</span></li>
  <li><i class="bi bi-chevron-right"></i> <strong>Frontend stack:</strong>
    <ul>
      <li><i class="bi bi-chevron-right"></i> React</li>
      <li><i class="bi bi-chevron-right"></i> TypeScript</li>
    </ul>
  </li>
</ul>
```

4 top-level items: Backend, Database, DevOps, Frontend stack.

---

#### 3b. Ordered list – stages to complete the first service (≥3 items)

**Lines:** 224–229

```html
<ol class="services-stages">
  <li>Requirements gathering and API design</li>
  <li>Implementation and database setup</li>
  <li>Testing, deployment, and handover</li>
  <li>Maintenance and support</li>
</ol>
```

4 stages for "Backend Development & API Design" (the first service listed in the table).

---

#### 3c. Nested list – ≥2 items

**Lines:** 213–218

The unordered list contains a nested `<ul>` inside the "Frontend stack" list item:

```html
<li><strong>Frontend stack:</strong>
  <ul>
    <li>React</li>
    <li>TypeScript</li>
  </ul>
</li>
```

The nested list contains 2 items: React and TypeScript.

---

### 4. Update the remaining website images

All images across the project were verified:

| File | Line | src | alt | Aspect Ratio |
|------|------|-----|-----|--------------|
| `index.html` | 71 | `assets/img/custom-img.png` | "Dmytro Polishchuk" | `class="img-fluid"` |
| `about.html` | 95 | `assets/img/profile-img.jpg` | "Profile photo of Dmytro Polishchuk" | `class="img-fluid"` |
| `portfolio.html` | 108 | `assets/img/portfolio/lw3-1.png` | "Graphs of f(x) = x, x², x³" | `class="img-fluid"` |
| `portfolio.html` | 120 | `assets/img/portfolio/lw3-2.png` | "3D plot of y(x) = sin(x)cos(x), z(x) = cos(x)" | `class="img-fluid"` |
| `portfolio.html` | 132 | `assets/img/portfolio/lw4-1.png` | "Surface plot z(x,y) = 1-(x²+y²), colormap jet" | `class="img-fluid"` |
| `portfolio.html` | 144 | `assets/img/portfolio/lw4-4.png` | "Surface plot z(x,y) = 1-(x²+y²), colormap custom2" | `class="img-fluid"` |

- **4a:** All `src` attributes point to `assets/img/`
- **4b:** All images use `class="img-fluid"` (Bootstrap: `max-width: 100%; height: auto;`) which preserves aspect ratio
- **4c:** All images have non-empty `alt` attributes appropriate to their purpose

---

### 5. Save the changes in the GitHub repository

**File:** `.git/` exists in the project root.

**Commit history (8 commits):**
- `008e05f` media added
- `404c753` updated resume,services pages
- `41dd723` the forgotten .gitignore
- `cecc84f` updated favicon
- `0cf67e2` updated about.html
- `e0da1dc` cleared windows junk, changed hero-bg
- `7ef5a5b` template 3 upload
- `d241b32` first commit

All changes were committed to the `main` branch. The CV website is live at https://aisfhd.github.io/

---

## Complementary Task (4 points)

---

### 1. Add media content to the Services section

#### 1a. Save video and audio files in assets/media folder

**Folder:** `assets/media/` — created and populated.

| File | Type | Path |
|------|------|------|
| `typing-video.mp4` | Video | `assets/media/typing-video.mp4` |
| `clock-ticking.mp3` | Audio | `assets/media/clock-ticking.mp3` |

---

#### 1b. Insert a video using `<video>` tag

**File:** `services.html`, lines 239–242

```html
<video controls width="100%" height="auto" poster="">
  <source src="assets/media/typing-video.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
```

- Video source: `assets/media/typing-video.mp4` (video/mp4)
- `controls` attribute included
- `width="100%" height="auto"` preserves aspect ratio

---

#### 1c. Insert a YouTube video using `<iframe>` tag

**File:** `services.html`, lines 250–252

```html
<div class="ratio ratio-16x9">
  <iframe src="https://www.youtube.com/embed/BoUVIhtqjAw" title="YouTube video" allowfullscreen></iframe>
</div>
```

- Embed URL: `https://www.youtube.com/embed/BoUVIhtqjAw`
- `title` attribute: "YouTube video"
- `allowfullscreen` attribute
- Wrapped in Bootstrap `ratio-16x9` container

---

#### 1d. Insert an audio recording using `<audio>` tag

**File:** `services.html`, lines 260–263

```html
<audio controls>
  <source src="assets/media/clock-ticking.mp3" type="audio/mpeg">
  Your browser does not support the audio element.
</audio>
```

- Audio source: `assets/media/clock-ticking.mp3` (audio/mpeg)
- `controls` attribute included

---

### 2. Check the result in a browser

All media elements were structurally verified:

| Element | `controls` | Correct `src` | File Exists | Aspect Ratio |
|---------|-----------|---------------|-------------|--------------|
| `<video>` | yes | `assets/media/typing-video.mp4` | yes | `width="100%" height="auto"` |
| `<iframe>` (YouTube) | N/A | `https://www.youtube.com/embed/BoUVIhtqjAw` | N/A (external) | `ratio-16x9` wrapper |
| `<audio>` | yes | `assets/media/clock-ticking.mp3` | yes | N/A |

All media elements use proper HTML5 semantics, have `controls` for user interaction, reference valid file paths, and preserve aspect ratio where applicable.

---

### 3. Save the changes in the GitHub repository

All changes (media files, Services section updates, image alt attributes, footer text) were committed to the `main` branch of the `aisfhd.github.io` repository.