# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
