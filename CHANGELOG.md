# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.11.0] - 2026-03-09

### Added
- "Historia" narrative sections to PIY project pages (top5, atdpath-blog) explaining the personal story behind each project
- New blog post: "Historie są wszystkim" — on why personal stories matter in PIY project descriptions

### Changed
- PIY project pages restructured with explicit "Opis techniczny" header separating personal story from technical content

## [0.10.1] - 2026-03-09

### Fixed
- Newsletter form inputs no longer overflow their flex container on narrow viewports (`min-w-0` added)
- Prose images now render with a thicker border (`border-2`) for improved definition

## [0.10.0] - 2026-03-08

### Added
- Newsletter subscription form on blog post detail pages and PIY project detail pages
- Share buttons on PIY project detail pages with correct URL generation
- Tags displayed at the bottom of PIY project detail pages

### Changed
- `ShareButtons` component accepts a configurable `prefix` prop instead of hardcoding "posts", enabling reuse across content types
- `NewsletterForm` wrapper changed from `<section>` to `<div>` for flexible semantic nesting
- About page newsletter wrapper changed from `<div>` to `<section>` for correct document outline
- Blog post detail page horizontal padding increased from `px-4` to `px-6`

## [0.9.2] - 2026-03-08

### Added
- Prose images now render with a visible border for better definition against the page background

### Fixed
- Build script: CDN Edge Rule failures now report to stderr, preventing silent failure masking
- Build script: Pull Zone default browser cache explicitly disabled so Edge Rules have full cache control

### Changed
- PIY project detail header: difficulty and repo link use plain text/link style instead of pill badges
- PIY project detail header: tags section separated into its own centered row with dividers for cleaner layout

## [0.9.1] - 2026-03-08

### Added
- `ProjectCard` component extracted from duplicated markup in `projekty.astro` and `tags/[tag].astro`
- `pluralize` utility with correct Polish grammatical pluralization (handles 22, 23, 24 etc.)

### Fixed
- Polish tag count labels now use correct plural forms for all numbers via the new `pluralize` utility

### Changed
- `Tag` component: non-linked (display-only) variant no longer shows hover effects, clarifying interactive vs. passive state
- `tags/[tag].astro` passes collection data via props from `getStaticPaths`, eliminating redundant `getCollection` calls

## [0.9.0] - 2026-03-08

### Added
- Tag system: clickable tag pills on posts and PIY projects linking to `/tags/[tag]` filtered pages
- `/tags` index page listing all unique tags across blog posts and PIY projects with post counts
- `/tags/[tag]` detail pages showing matching blog posts and PIY projects under a single tag
- `Tag` component with hover effects and optional non-linked (display-only) variant
- `getUniqueTags` utility aggregating and deduplicating tags across blog and PIY content collections
- Global copy-to-clipboard button for all code blocks, now available on every page via `Layout.astro`

### Fixed
- Dark mode code blocks now render with the correct Shiki dark theme background and token colors using CSS variable overrides

### Changed
- Copy-to-clipboard script moved from inline post-only script to global `Layout.astro`, eliminating duplication
- Bunny CDN edge rules in `build.sh` extended with a charset=utf-8 rule for `.txt` files (llms.txt, llms-full.txt)

## [0.8.0] - 2026-03-08

### Added
- PIY cover page (`piy-cover.html`) for social/marketing use
- PIY skill now enforces deploy-time checks on source repos: license (Commons Clause + MIT), blog link in GitHub repo metadata, and PIY quote at the top of README

### Changed
- PIY skill (`skills/piy/SKILL.md`) fully translated to English and expanded with Phase 3 workflow covering automated repo validation and remediation steps
- PIY markdown template updated with `Licencja` section using Commons Clause + MIT boilerplate

## [0.7.0] - 2026-03-08

### Added
- Automated browser cache control via Bunny CDN Edge Rules applied as a post-deploy step in `build.sh`: immutable long-cache for hashed `_astro/*` assets, and `no-cache, must-revalidate` for all other files (HTML, sitemap, etc.)
- Reference documentation for Bunny CDN Edge Rules API in `static-hosting.md`

## [0.6.0] - 2026-03-08

### Added
- New PIY project entry: atdpath-blog, documenting this blog itself as a project
- Hero image for the atdpath-blog PIY entry
- `getSortedProjects` shared utility for consistent project sorting across pages

### Changed
- PIY landing page, projekty listing, post detail, and search pages simplified and streamlined
- ShareButtons component refactored for cleaner markup
- LLM feeds (llms.txt, llms-full.txt) updated to reflect new project content
- README updated with current project overview

## [0.5.0] - 2026-03-08

### Added
- Newsletter subscription form component integrated into the About page
- Share buttons on blog post pages (copy link, share to social platforms)
- Dynamic Open Graph image generation per blog post (`/posts/[slug].png`)
- YouTube added to social links (channel: FromZeroToJunior)
- Newsletter icon link in site footer pointing to the About page newsletter section
- `build.sh` script for streamlined production builds

### Changed
- About page fully rewritten with real author bio, avatar, newsletter section, and social links
- ATD page content updated with program description and enrollment status notice
- Post detail page layout updated: tags and share buttons displayed in a flex row
- `.gitignore` extended to exclude `.dev/` local development directory
- PIY top5 section heading renamed from "Rozbudowa na własną rękę" to "Pomysły na rozbudowę"

## [0.4.0] - 2026-03-08

### Added
- `PageHero` component for consistent page headers with kicker, headline, and optional subtitle
- Dedicated `/piy/projekty` page listing all PIY projects with a project counter, dates, difficulty badges, and tags
- PIY content collection supports an optional `modDatetime` field to track last-modified date per project
- PIY projects included in both `llms.txt` and `llms-full.txt` LLM-friendly feeds

### Changed
- PIY landing page redesigned: hero section, two-path cards (build from scratch vs. clone and adapt), highlight strip, and structured prose sections
- Navigation labels localized to Polish: "Posts" -> "Posty", "About" -> "O mnie"
- Social links updated to real GitHub (`emssik`) and X (`ZeroToJunior`) profiles
- All page headers (About, ATD, Posts index, blog post detail, PIY project detail) now use the shared `PageHero` component
- Text rendering switched from `antialiased` to `subpixel-antialiased` for improved legibility

### Removed
- Demo placeholder PIY entries (`demo-todo-app`, `demo-weather-dashboard`)
- Sidebar project list from the PIY landing page (replaced by dedicated `/piy/projekty` route)

## [0.3.0] - 2026-03-07

### Added
- Lightbox for prose images: click any image to zoom in with an overlay, close by clicking or pressing ESC
- First PIY project entry: Top 5 task tracker, with screenshots
- About page and Posts index now display a "last updated" date

### Changed
- Extracted `difficultyLabel` into a shared utility module
- Scroll offset adjusted so anchor links clear the fixed header

## [0.2.0] - 2026-03-07

### Added
- Fixed (sticky) header that remains visible while scrolling
- "Skocz do listy projektow PIY" jump link on PIY page, visible on small screens only, linking to the projects list sidebar

### Changed
- Body top padding adjusted to accommodate fixed header height
