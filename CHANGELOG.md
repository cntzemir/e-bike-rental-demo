# Changelog
All notable changes to this project will be documented in this file.

Format: Keep a Changelog (simplified)  
Versioning: SemVer (v0.x because this is a student/demo project)

---

## [Unreleased]
- (Optional) Small copy tweaks and minor UI polish.

---

## [v0.3.0] - 2026-02-18
### Added
- Expanded About section into a structured layout:
  - Feature cards (Goal / What’s inside / Demo auth)
  - “What you can do” steps
  - Tech stack pills + notes + CTA buttons
- Scroll-reveal animation system using IntersectionObserver (`assets/js/reveal.js`).
- `prefers-reduced-motion` support for accessibility.

### Changed
- Improved About section visuals (card hover, soft background decoration, spacing).

### Reason
- About was too short and not informative enough.
- Small animations make the landing page feel more professional without adding complex features.

---

## [v0.2.0] - 2026-02-18
### Added
- In-memory “database” state object:
  - `state.accounts` for demo users
  - `state.rentalRequests` for demo rental submissions
- Basic Sign up + Login flow (front-end only):
  - Email validation
  - Password minimum length
  - Confirm password match
- Rent modal flow:
  - Modal open/close + overlay click + Escape close
  - Minimal validation on submit
  - Request stored in memory and logged
- Clean confirmation page: `request-submitted.html`

### Changed
- Rebuilt `user_page.html` into clear sections:
  - Auth (login/signup)
  - Dashboard
- Standardized card / button / grid UI patterns for consistency.
- Improved responsive layout (removed fixed margin hacks, used flex/grid/container logic).
- Aligned model images using fixed height + `object-fit`.

### Removed
- Broken / unused dependencies:
  - Duplicate Font Awesome includes
  - Missing jQuery reference
  - Unused lightbox attributes/features

### Fixed
- Broken redirect / 404 caused by encoded filename (replaced with ASCII-safe `request-submitted.html`).
- Invalid HTML structure that caused unstable JS selectors/events.
- Console errors from missing resources.
- Text typos and small accessibility issues (aria labels, clearer navigation).

### Reason
- Goal was to make the project “GitHub-presentable”:
  - Clean repo structure
  - No broken links
  - A complete demo flow (auth → dashboard → rent → confirmation)
  - Still simple enough for a 2nd semester CS student project

---

## [v0.1.0] - 2026-02-17
### Added
- Initial import of the static website files.

### Notes
- This version reflects the original baseline before cleanup and improvements.
