# PostKit

A lightweight post management app built with React, where you can create, edit, search, and organize written posts — built as a learning project exploring component design, state management, and third-party library integration.

---

## Tech Stack

| Layer | Tool |
|---|---|
| UI | React 19 + TypeScript |
| Routing | React Router v7 |
| State | Zustand with persist middleware |
| Styling | Tailwind CSS v4 |
| Testing | Vitest + React Testing Library |
| Post utilities | `postkit-slug`, `postkit-excerpt`, `postkit-reading-time`, `postkit-date-status-display`, `postkit-filter-sort`, `postkit-search-library`, `postkit-tag`, `postkit-validation-library`, `postkit-storage-lib` |

---

## Requirements

| Requirement | Status |
|---|---|
| Browse, filter, sort, search posts | ✓ |
| Create, edit, delete with validation | ✓ |
| Slug-based URLs and routing | ✓ |
| Post metadata (excerpt, reading time, date) | ✓ |
| Save to localStorage, export/import JSON | ✓ |

---

## Acceptance Criteria

PostKit covers all core requirements: browsing, filtering, sorting, searching, full CRUD with validation, slug-based routing, and localStorage persistence with JSON export and import. All 12 original acceptance criteria are met.

---

## Features

- **Post list** — browse all posts with title, status badge, excerpt, reading time, tags, and date
- **Filter & sort** — filter by status (draft / review / published) or tag; sort by date or title in either direction
- **Search** — live search across post titles and content
- **Create & edit** — full post editor with title, body, author, category, tags, and status
- **Validation** — inline error messages for missing or invalid fields
- **Delete** — delete with a confirmation dialog
- **Routing** — each post has a unique slug-based URL; browser back button works throughout
- **Persistence** — posts survive page refreshes via localStorage
- **Export / Import** — download all posts as a JSON backup; restore from a JSON file

---

## Theme

Styled after the visual palette of the *Project Hail Mary* movie — warm cream background (`#fdf8ec`), Astrophage gold (`#e8971a`) as the primary accent, and aurora green (`#5ab020`) for tags. Typography uses Space Grotesk.

---

## Test Results

13 tests passing across 3 files using Vitest and React Testing Library.

| File | Tests | Coverage |
|---|---|---|
| `PostList.test.tsx` | 7 | Status filter, tag filter, sort by date, search |
| `PostEditor.test.tsx` | 5 | Create, edit, delete, validation |
| `Routing.test.tsx` | 1 | Slug-based routing loads correct post |

Tests are integration-style — they use the real store, real library implementations, and assert on rendered output rather than implementation details.

---

## Future Work

- Empty state UI when no posts match a search or filter
- Slug displayed in the post preview card
- Mobile-responsive layout
- Formally write test specifications (Behavior / Setup / Action / Assert / Failure) and verify each test fails when the behavior is broken
