# Portfolio Website Developer Style Guide

> This document is the central reference for maintaining, customizing, and extending the portfolio website.
>
> Before modifying any UI component, consult this guide to locate the correct HTML, CSS, and JavaScript instead of making unnecessary changes.

---

# Project Structure

```
/
│
├── index.html                # Main website
│
├── assets/
│   ├── css/
│   │   ├── bootstrap.min.css
│   │   ├── main.css          # Primary stylesheet
│   │   └── ...
│   │
│   ├── js/
│   │   ├── main.js           # Main JavaScript
│   │   └── ...
│   │
│   ├── images/
│   │
│   └── fonts/
│
├── images/
│
├── robots.txt
├── sitemap.xml
└── manifest.json
```

---

# Global CSS Variables

Located inside

```
:root
```

Controls

- Colors
- Typography
- Font sizes
- Global spacing
- Theme variables

Examples

```
--main
--main-two
--white
--black

--heading-one
--heading-two
--heading-three

--body-font
--heading-font
```

Never hardcode colors if a CSS variable already exists.

---

# Typography

## Main Heading Sizes

Controlled by

```
--heading-one
--heading-two
--heading-three
--heading-four
--heading-five
--heading-six
```

Used automatically by

```
h1
h2
h3
h4
h5
h6
```

Prefer modifying the variables instead of individual headings.

---

## Paragraphs

Search

```
p
```

Controls

- paragraph size
- line-height
- readability

---

## Font Family

```
--heading-font

--body-font
```

---

# Containers

Search

```
.container

.container-fluid

.tw-container-1800-px
```

Controls page width.

---

# Width

Search

```
width

max-width

min-width
```

Utility classes

```
tw-w-*
```

---

# Height

Search

```
height

max-height

min-height
```

Utility classes

```
tw-h-*
```

---

# Padding

Utility classes

```
tw-p-*

tw-px-*

tw-py-*
```

Examples

```
tw-p-6

tw-px-10

tw-py-4
```

---

# Margin

Utility classes

```
tw-m-*

tw-mt-*

tw-mb-*

tw-ml-*

tw-mr-*
```

---

# Gap

Search

```
gap

tw-gap
```

Used in

- Flex
- Grid
- Navigation
- Cards

---

# Border Radius

Search

```
border-radius

tw-rounded
```

---

# Shadows

Search

```
box-shadow
```

---

# Colors

Global Variables

```
--main

--main-two

--neutral

--white

--black
```

Utility Classes

```
bg-main

text-main

border-main

hover-bg-main

hover-text-main
```

---

# Buttons

Search

```
.tw-primary-btn

.tw-hover-btn

.btn_inner
```

Controls

- Button size
- Hover effect
- Animation
- Padding
- Colors

---

# Hero Section

Search

```
.banner-three-area
```

Contains

- Hero title
- Hero image
- Hero left content
- Hero right stats
- CTA button

---

## Hero Image

Search

```
.banner-three-man
```

Modify here for

- Width
- Height
- Position
- Scaling

---

## Hero Title

Search

```
.banner-three-title
```

---

## Hero Subtitle

Search

```
.banner-three-center-title
```

---

## Hero Left Content

Search

```
.banner-three-left
```

---

## Hero Right Cards

Search

```
.banner-three-counter-item
```

---

# About Section

Search

```
.about-three-area
```

---

# Skills Section

Search

```
skills
```

---

# Services

Search

```
service
```

---

# Portfolio

Search

```
portfolio
```

---

# Timeline

Search

```
timeline
```

---

# Contact

Search

```
contact
```

---

# Footer

Search

```
footer
```

---

# Navbar

Search

```
.header

.header-three

.header-menu
```

---

# Mobile Navigation

Search

```
.tw-offcanvas
```

---

# Cards

Search

```
card

counter-item
```

---

# Images

Search

```
img

object-fit

aspect-ratio
```

Recommended

```
max-width:100%;

height:auto;

object-fit:cover;
```

---

# Animations

Search

```
transition

animation

transform

@keyframes
```

---

# Responsive Design

Always start from

```
320px
```

Then verify

```
360px

375px

390px

412px

430px

480px

768px

1024px

1280px

1440px

1600px

1920px

2560px
```

---

# Media Queries

Search

```
@media
```

or

```
max-width
```

or

```
min-width
```

---

# If Something Is Too Big

Search

```
font-size

width

height

padding

margin

gap
```

---

# If Something Is Too Small

Search

```
padding

margin

font-size
```

---

# If Image Is Too Large

Search

```
.banner-three-man

img

max-width

height

object-fit
```

---

# If Image Is Distorted

Search

```
object-fit

aspect-ratio
```

---

# If Text Overlaps

Search

```
position

absolute

translate

z-index

overflow
```

---

# If Page Scrolls Horizontally

Search

```
overflow-x

100vw

translateX

width

min-width
```

---

# If Mobile Layout Breaks

Check

- Width
- Height
- Padding
- Margin
- Gap
- Grid
- Flexbox
- Images
- Font Size
- Media Queries

---

# Accessibility Checklist

Verify

- Semantic HTML
- Alt text
- Keyboard navigation
- Focus states
- ARIA labels
- Color contrast

---

# SEO Checklist

Verify

- Title
- Meta description
- Canonical
- Open Graph
- Twitter Cards
- JSON-LD
- Sitemap
- Robots.txt

---

# Performance Checklist

Verify

- Lazy loaded images
- Optimized assets
- No render blocking
- No unused CSS
- No unnecessary JavaScript

---

# Before Every Change

Always identify

1. HTML element
2. CSS selector
3. Parent container
4. Related utility classes
5. Responsive breakpoints
6. JavaScript interactions

before editing.

---

# Before Every Commit

- No console errors
- No broken links
- No missing assets
- No horizontal scrolling
- No overlapping elements
- No clipped text
- No layout shifts
- Mobile responsive
- Accessibility preserved
- SEO preserved
- Performance maintained

---

# Copilot Rules

Whenever modifying the website:

1. Find the HTML element first.
2. Locate the CSS selector responsible.
3. Check for related media queries.
4. Check if JavaScript also controls the element.
5. Make the smallest safe change.
6. Preserve the design language.
7. Never introduce regressions.
8. Verify responsiveness before finishing.
9. Explain which files were modified.
10. Never modify unrelated components.