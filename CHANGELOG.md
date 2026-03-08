# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
