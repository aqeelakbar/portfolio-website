# Aqeel Akbar — portfolio website

The source for [aqeelakbar.me](https://www.aqeelakbar.me), presenting product-design and UX-engineering work across complex workflows, design systems and AI-assisted products.

## Why this is a static site

The portfolio is intentionally built with semantic HTML, CSS and small, focused JavaScript modules. It does not need a client framework: the content is mostly editorial, so keeping the runtime small makes the experience easier to load, inspect and maintain.

The implementation still handles several product-like behaviours:

- a horizontally directed desktop narrative with an equivalent linear mobile reading order
- responsive project imagery whose order changes without duplicating content
- progressive case-study navigation and reading progress
- reusable JSON-driven case-study blocks
- image-dialog interactions with keyboard support
- reduced-motion behaviour for the animated homepage and case-study reveals
- Open Graph and Twitter metadata for shared links

## Structure

```text
index.html                  Homepage narrative
home.js                     Homepage motion and navigation
case.js                     Shared case-study renderer
data/                       Case-study content and structured evidence
work/                       Individual case-study entry points
site.css                    Layout, responsive behaviour and motion
shared-header.js            Shared navigation and footer
```

## Run locally

The site uses absolute paths, so serve it from the repository root rather than opening the HTML files directly.

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Design and engineering notes

The homepage and case studies are designed as one system. Desktop motion establishes pace and orientation; mobile removes the horizontal stage and preserves a conventional document flow. `prefers-reduced-motion` receives the same content without transition-dependent navigation.

Case studies are rendered from structured JSON instead of repeated page markup. This keeps headings, evidence patterns, comparison tables, engineering callouts and media behaviour consistent while allowing each project to retain its own narrative.

## Verification

Before deployment:

1. Serve the repository locally.
2. Check the homepage at desktop and mobile widths.
3. Open every case-study route and its previous/next navigation.
4. Test keyboard focus, image dialogs and reduced-motion behaviour.
5. Confirm canonical and social-image URLs match the production hostname.
