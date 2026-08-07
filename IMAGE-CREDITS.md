# Image provenance

Every image this site loads is either **generated for this project** or **owned by
Md Kausar Hamid Miji**. No image is sourced from the internet, no stock photography, and
no third-party artwork is used.

Verified by audit of all `<img>`, `<link rel="icon">`, `og:image`, CSS `url()` and
web-manifest references across every page.

---

## Generated for this site

Hand-written SVG paths and Matplotlib renders of synthetic data. No external source material.

| File | What it is | How it was made |
|------|-----------|-----------------|
| `assets/img/favicon.svg` | Site mark — nanoparticle core with orthogonal field lobes | Hand-written SVG |
| `assets/img/favicon-180.png` | Apple touch icon | Rasterised from `favicon.svg` |
| `assets/img/favicon-512.png` | PWA icon | Rasterised from `favicon.svg` |
| `assets/img/og-card.svg` / `.png` | Social sharing card | Hand-written SVG |
| `assets/figures/fig-nearfield-dimer.png` | Near-field map, plasmonic dimer | Matplotlib, synthetic dipole field |
| `assets/figures/fig-lspr-spectra.png` | LSPR extinction/scattering/absorption | Matplotlib, synthetic Lorentzians |
| `assets/figures/fig-metasurface-spectra.png` | Metasurface transmission/reflection | Matplotlib, synthetic Fano lineshapes |
| `assets/figures/fig-waveguide-mode.png` | Guided mode profile | Matplotlib, synthetic mode function |
| `assets/figures/fig-convergence.png` | FDTD convergence curve | Matplotlib, synthetic error decay |
| `assets/figures/fig-parameter-sweep.png` | Field-enhancement design sweep | Matplotlib, synthetic parameter grid |

All diagrams inside `math/index.html` (clocks, shapes, grids, fraction bars, graphs, solids,
magic squares, rulers) are **drawn as inline SVG by the app itself** at runtime — no image
files are involved.

> ### ⚠️ The six `assets/figures/` plots are placeholders
> They are **illustrative only** and contain **no real simulation data**. Each carries a
> visible `PLACEHOLDER — replace with your figure` watermark. Replace them with genuine
> Meep/Tidy3D output before presenting the site as a record of research results.

---

## Owned by the site author

| File(s) | What it is |
|---------|-----------|
| `assets/img/portrait.jpg` | Personal photograph — cropped and compressed from `profile_pic.jpg` |
| `assets/img/portrait-about.jpg` | Personal photograph — cropped and compressed from `miji.jpeg` |
| `sdsmt.png`, `BTCL.svg`, `ssd_tech.png`, `Digicon.jpeg` | Logos of organisations the author studied or worked at |
| `GHCNd/*.png` | Figures from the author's own GHCNd analysis |
| `SysID/*.png` | Figures from the author's own system-identification work |
| `PLA/*`, `BSA/*` | The author's own event photographs (not currently used on any page) |

Organisation logos remain the trademarks of their owners and are used solely to identify
genuine affiliations.

---

## Removed

| File | Reason |
|------|--------|
| `ocean-banner.jpg` | Internet-sourced (the previous site credited it as *"Banner Image Source: Internet"*). Unused by the rebuilt site and deleted to keep image provenance clean. Recover with `git checkout ocean-banner.jpg` if ever needed. |

---

## One item to be aware of

The **GitHub logo** in the footer is an inline SVG path drawn by hand, but the mark itself is
GitHub's trademark. It is used purely as a recognisable link to the author's GitHub profile,
which GitHub's brand guidelines permit. If you would rather carry no third-party mark at all,
it can be swapped for a generic code/repository glyph.

All other inline SVG icons (sun, moon, menu, arrows, envelope) are generic glyphs written for
this site.

---

## Non-image third-party resources

| Resource | Licence |
|----------|---------|
| Inter, Newsreader, JetBrains Mono (Google Fonts) | SIL Open Font License 1.1 |

Fonts load from Google's CDN; they can be self-hosted if you prefer no third-party requests.
No CSS frameworks, JavaScript libraries or icon packs are used.
