# Transport Logistic

![HTML5](https://img.shields.io/badge/HTML-5-E34F26)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-CDN-06B6D4)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-F7DF1E)
![GSAP](https://img.shields.io/badge/GSAP-3.12.5-88CE02)
![License](https://img.shields.io/badge/license-MIT-green)

A multi-page marketing website for a fictional freight and logistics company, built with HTML5, the Tailwind CSS CDN, a custom stylesheet, and vanilla JavaScript. The site covers road, ocean, and air freight and warehousing across eight pages, with scroll-triggered animations powered by GSAP, a project filter, a pricing toggle, an FAQ accordion, a testimonial carousel, and client-side form validation.

## Live Demo

[https://stackiid.github.io/transport-logistic/](https://stackiid.github.io/transport-logistic/)

## Table of Contents

- [Features](#features)
- [Pages](#pages)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [How the JavaScript Works](#how-the-javascript-works)
- [Design System](#design-system)
- [Accessibility](#accessibility)
- [SEO](#seo)
- [Performance Considerations](#performance-considerations)
- [Known Limitations](#known-limitations)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Features

- Eight linked pages sharing one stylesheet and one script file
- Announcement bar with phone, email, and address, and a scrolling message on small screens
- Sticky navigation that changes style after scrolling, with a scroll progress bar and a back-to-top button
- Mobile menu toggled with JavaScript, with `aria-expanded` kept in sync
- Highlighting of the current page's link in the navigation
- Animated page loader with a moving truck icon
- Hero section sized to fit the viewport below the header, with a live-tracking style card
- Scroll-triggered reveal animations (up, fade, scale, left, right, blur) with optional staggering, driven by `data-reveal` attributes
- Parallax hero background and SVG route lines that draw as the user scrolls, with an icon that travels along the path
- Animated counters and progress bars that start when they scroll into view
- FAQ accordion where only one answer is open at a time
- Testimonial carousel with previous and next buttons, dots, and automatic advance every six seconds
- Project filter for All, Road Freight, Ocean Freight, Air Freight, and Warehousing
- Pricing page with a monthly and yearly toggle that updates prices and the billing period
- Newsletter and contact forms with required-field and email validation and a success message
- Button ripple effect
- Footer year filled in automatically
- Reduced-motion support in both the stylesheet and the script

## Pages

| Page | File | Content |
| --- | --- | --- |
| Home | `index.html` | Hero, about, reasons to choose the company, four services, statistics, case studies, four-step working process, testimonials, newsletter signup |
| About | `pages/about.html` | Company story, skill bars, statistics, team of four |
| Services | `pages/services.html` | Road, Ocean, Air, and Warehousing details, plus six served industries |
| Projects | `pages/projects.html` | Nine case studies with category filter buttons |
| Pricing | `pages/pricing.html` | Starter, Growth, and Enterprise plans with a billing toggle |
| FAQ | `pages/faq.html` | Six questions in an accordion |
| Blog | `pages/blog.html` | Six article cards and a newsletter form |
| Contact | `pages/contact.html` | Contact details and a quote request form |

The company details, prices, statistics, testimonials, team names, and articles are sample content written to demonstrate the layout.

## Tech Stack

| Category | Technology |
| --- | --- |
| Markup | HTML5 |
| Styling | Tailwind CSS via the Play CDN script, plus a custom stylesheet using custom properties, `clamp()`, and `backdrop-filter` |
| Scripting | Vanilla JavaScript (ES6) in `scripts/app.js` |
| Animation | GSAP 3.12.5 with the ScrollTrigger and MotionPathPlugin plugins, loaded from cdnjs |
| Fonts | Google Fonts: Plus Jakarta Sans (headings) and Inter (body) |
| Icons | Font Awesome 6.5.1, loaded from cdnjs |
| Images | Photographs loaded from Unsplash URLs, plus a local favicon |
| Build tooling | None |

## Project Structure

```text
transport-logistic/
|-- assets/
|   `-- favicon.png        # Browser tab icon
|-- pages/
|   |-- about.html
|   |-- blog.html
|   |-- contact.html
|   |-- faq.html
|   |-- pricing.html
|   |-- projects.html
|   `-- services.html
|-- scripts/
|   `-- app.js             # All interactive behavior
|-- styles/
|   `-- style.css          # Custom components, animations, and design tokens
|-- index.html             # Home page
|-- LICENSE                # MIT License
`-- README.md
```

## Prerequisites

- A modern web browser
- An internet connection, because Tailwind, GSAP, fonts, icons, and photographs are loaded from external hosts
- Optional: Python 3, if you want to serve the site through a local web server

## Getting Started

Clone the repository and move into it:

```bash
git clone https://github.com/stackiid/transport-logistic.git
cd transport-logistic
```

Open `index.html` directly in a browser, or serve the folder locally:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

There are no dependencies to install and no build step.

## How the JavaScript Works

All behavior lives in `scripts/app.js`, which runs after `DOMContentLoaded` and is included on every page. Features are enabled by the presence of specific elements or data attributes, so the same file works across all eight pages.

| Feature | Trigger in the markup |
| --- | --- |
| Header height variable | `#announce-bar` and `#site-nav`; sets `--header-h` so the hero fits the viewport |
| Page loader | `#page-loader`; hidden after about 1.1 seconds (0.15 seconds with reduced motion) |
| Scroll state | `#site-nav`, `#scroll-progress`, `#back-to-top` |
| Mobile menu | `#menu-toggle` and `#mobile-menu` |
| Reveal animations | `data-reveal="up/fade/scale/left/right/blur"`, optional `data-stagger` |
| Hero load-in | `data-hero-item` |
| Parallax | `data-parallax` |
| Route animation | `.route-line-path` and `data-route-node` inside an SVG |
| Counters | `data-counter`, with optional `data-decimals` and `data-suffix` |
| Skill bars | `data-skill` with a percentage and a `.skill-fill` child |
| Accordion | `.accordion-item`, `.accordion-trigger`, and a `data-accordion-group` container |
| Testimonial carousel | `.testi-track`, `.testi-slide`, `data-testi-next`, `data-testi-prev`, `data-testi-dot` |
| Project filter | `data-filter` on buttons and `data-category` on cards |
| Pricing toggle | `#pricing-toggle`, `data-price-monthly`, `data-price-yearly`, `data-price-period` |
| Form validation | `data-validate-form` on forms and `data-required` on fields |
| Footer year | `data-year` |

If GSAP fails to load, reveal elements are made visible instead of staying hidden.

## Design System

Design tokens are declared in two places that mirror each other: the inline `tailwind.config` object in each page, and CSS custom properties on `:root` in `styles/style.css`.

| Group | Values |
| --- | --- |
| Navy palette | `navy-950` `#081a33`, `navy-900`, `navy-800`, `navy-700` |
| Orange palette | `orange-600`, `orange-500` `#f2660f`, `orange-400`, `orange-100` |
| Neutrals | `inkgray` and `gray` scales from 50 to 900 |
| Fonts | `display` (Plus Jakarta Sans), `body` (Inter) |
| Radii | `--r-sm` to `--r-xl` |
| Shadows | `--shadow-soft`, `--shadow-lift`, `--shadow-orange` |
| Fluid type | `.text-fluid-hero`, `.text-fluid-h1`, `.text-fluid-h2`, `.text-fluid-h3`, `.text-fluid-body`, `.text-fluid-lg`, `.text-fluid-eyebrow` |

Responsive layout is handled mainly through Tailwind's responsive utility classes in the markup. The custom stylesheet adds fluid sizing with `clamp()` and a viewport-fitted hero using `100dvh`.

## Accessibility

Implemented practices visible in the code:

- `lang="en"` on the root element
- A "Skip to content" link that becomes visible on focus
- `aria-label` on icon-only controls, and `aria-hidden` on decorative icons
- `aria-expanded` on the mobile menu button and FAQ triggers, updated by the script
- `role="status"` with `aria-live="polite"` on the page loader
- Visible `:focus-visible` styles for links, buttons, and form fields
- A `prefers-reduced-motion` rule in the stylesheet, and a matching check in the script that skips GSAP animations and shortens the loader
- Inline error messages and a success message for the forms

No accessibility audit or WCAG conformance level is claimed.

## SEO

The home page includes a title, meta description, and Open Graph tags (`og:title`, `og:type`, and `og:description`). The other pages each have their own title. The site does not include an `og:image`, canonical URLs, a sitemap, or `robots.txt`.

## Performance Considerations

- The Tailwind Play CDN compiles styles in the browser at load time. It is intended for prototyping, and a compiled Tailwind build would be the usual choice for production
- Google Fonts are requested with `preconnect` hints and `display=swap`
- The scroll handler is registered as a passive listener, and counters and skill bars use `IntersectionObserver`
- The page loader keeps content hidden for about a second on every page load
- The site loads three GSAP files on every page, even on pages that use only some of the animations

## Known Limitations

- The contact form and the newsletter forms are client-side only: valid submissions reset the form and show a success message, but no data is sent anywhere
- The testimonial carousel stops advancing automatically after the pointer first enters it and does not restart
- Sample contact details are not consistent: the announcement bar shows "6391 Elgin St, Celina, Delaware" while the footer and contact page show "4517 Washington Ave, Manchester, KY", and the displayed phone number (`+1 (234) 567 890`) is shorter than the number in its `tel:` link
- Footer links to Terms & Conditions, Privacy Policy, and similar pages are placeholders
- The header comment in `scripts/app.js` refers to the file as `main.js`, although it is named `app.js`
- Photographs depend on Unsplash URLs and will not load without an internet connection

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

Copyright (c) 2026 Ubaid Ahmad

## Acknowledgements

- Photographs from [Unsplash](https://unsplash.com)
- Animation library: [GSAP](https://gsap.com)
- Typefaces from [Google Fonts](https://fonts.google.com): Plus Jakarta Sans and Inter
- Icons from [Font Awesome](https://fontawesome.com)
- Styling utilities from [Tailwind CSS](https://tailwindcss.com)
