# Requirements & Acceptance Criteria

## R1 — Browse Posts

- [x] Show title, status, tags, reading time, and date on each card (`PostPreview`)
- [ ] List remains useful as posts grow — needs filter/sort controls wired up in `PostList`

## R2 — Filter Posts

- [x] Filter by status
- [x] Filter by tag

## R3 — Sort Posts

- [x] Sort by date (newest/oldest)
- [x] Sort by title (A–Z / Z–A)

## R4 — Search Posts

- [x] Search input updates store (`SearchBar`)
- [x] `PostList` applies `searchPosts` to results

## R5 — Create, Edit, Delete Posts

- [ ] Create a new post
- [ ] Edit title, body, tags, category, status
- [ ] Delete a post with confirmation
- [ ] Validation feedback for missing/invalid fields

## R6 — Post URLs (slug)

- [ ] `postkit-slug` not yet integrated into `posts.ts`
- [ ] `slug` field not yet added to `Post` type
- [ ] Slug not yet displayed in `PostPreview`

## R7 — Preview Post Metadata

- [x] Excerpt (`postkit-excerpt`)
- [x] Reading time (`postkit-reading-time`)
- [x] Formatted date and status (`postkit-date-status-display`)
- [ ] Slug display
- [ ] Status in readable form in a dedicated preview component

## R8 — Save and Restore

- [x] Zustand `persist` middleware saves posts to localStorage

## R9 — Consistent Visual Language

- [ ] See styling progress breakdown below

## R10 — Routing

- [x] Install `react-router-dom`
- [ ] Define routes in `App.tsx`: `/` for post list, `/posts/:id` for post detail, `/posts/new` for new post
- [ ] `PostList` links each post card to `/posts/:id`
- [ ] `PostEditor` reads `:id` from URL params when in edit mode
- [ ] Browser back button works between views
- [ ] URLs are bookmarkable and shareable

---

## Layout Decision — Option A

Search, filter, and sort all live on the Post List View (`/`). Layout from top to bottom:

```
[ Header / App Title ]
[ SearchBar ]
[ Filter controls: status | tag ]
[ Sort controls: date asc/desc | title asc/desc ]
[ Post cards (PostPreview × n) ]
```

- Search bar is always visible at the top of the list view
- Filter and sort controls sit between the search bar and the post cards
- No sidebar, no separate search results page
- Navigating to `/posts/:id` or `/posts/new` leaves the list view entirely

---

## Acceptance Criteria

- [x] See a list of posts with title, status, tags, reading time, and date
- [ ] Filter the list by status or tag
- [ ] Sort the list by date or title
- [x] Search posts and get accurate results
- [ ] Create a new post and see it appear in the list
- [ ] Edit an existing post and see changes saved
- [ ] Delete a post and confirm it is removed
- [ ] See validation feedback when required fields are missing
- [ ] See a slug, excerpt, reading time, and formatted date in post preview
- [x] Close and reopen the browser and find posts still there
- [ ] Navigate between list and editor using the browser back button
- [ ] Link directly to a specific post via its URL

---

## Styling Progress (R9)

### Post List View (`/`) — search + filter + sort + cards all here

- [ ] Page layout and spacing
- [ ] Header / app title styled
- [ ] Search bar styled
- [ ] Filter controls styled — status buttons (draft / review / published / all) and tag selector
- [ ] Sort controls styled — date and title toggles with asc/desc direction
- [ ] Post card (`PostPreview`) styled
- [ ] Status badge colour-coded on each card
- [ ] Tags displayed as styled chips on each card
- [ ] Empty state styled (no posts found / no search results)
- [ ] "New Post" button styled and visible

### Post Editor View (`/posts/new`, `/posts/:id`)

- [ ] Form layout and spacing
- [ ] Input fields styled (title, body, author, category)
- [ ] Tag input styled
- [ ] Status selector styled
- [ ] Validation error messages styled
- [ ] Save and Delete buttons styled
- [ ] Confirmation dialog for delete styled

### Post Detail / Preview View (`/posts/:id`)

- [ ] Page layout and spacing
- [ ] Slug displayed and styled
- [ ] Excerpt styled
- [ ] Reading time styled
- [ ] Formatted date styled
- [ ] Status badge styled
- [ ] Tags styled

### Global / Shared

- [ ] Typography (font, size, line height)
- [ ] Colour palette consistent across views
- [ ] Responsive layout (mobile-friendly)
- [ ] Navigation / header styled

---

## Overall Progress

| Area                  | Done  | Total  | %       |
| --------------------- | ----- | ------ | ------- |
| Requirements (R1–R10) | 5     | 23     | 22%     |
| Acceptance Criteria   | 3     | 12     | 25%     |
| Styling               | 0     | 22     | 0%      |
| **Total**             | **8** | **57** | **14%** |
