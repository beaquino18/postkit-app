# Library Boundaries

### Validation

`getPostValidationErrors`

- called in `PostEditor.tsx`
- input: `currentPost` — a `Post` object built from either `updatePost` or `createPost` depending on whether `existing` is present
- output: `ValidationIssue[]` errors

`isPostValid`

- called in `PostEditor.tsx`, under the function `handleSave()`
- input: same as `currentPost` above
- output: guards the save — returns early without calling `addPost` or `storeUpdatePost` if false

### Tag

`parseTags`

- called in `PostEditor.tsx` under variable `tags`
- input: `tagInput` from the useState
- output: Splits raw input into usable tags

`normalizeTag`

- called in `PostEditor.tsx` under variable `tags`
- input: each individual tag string from the `parseTags` result
- output: maps each tags and return a normalize string tags - no spaec, lowercase, no punctuation

`removeDuplicateTags`

- called in `PostEditor.tsx` under variable `tags`
- input: the result of parseTags
- output: remove duplicate tags that are clean

### Search

`searchPosts`

- called in `PostList.tsx` at the component level under `result` variable
- input: a `post` from the store and `search` string from the store (typed in `SearchBar` component)
- output: filtered `Post[]` — always runs first, then filter/sort is applied on top of the result

### Filter-Sort

`filterByStatus`

- called in `PostList.tsx` at the component level
- input: takes in `result` from the `searchPosts` and `statusFilter` that is either type `PostStatus` or `null from the store
- output: `Post[]` filtered by status — only runs if `statusFilter` is set

`filterByTag`

- called in `PostList.tsx` at the component level
- input: takes in `result` from `filterByStatus` if applied, otherwise from `searchPosts` and `tagFilter` that is either type string or `null from the store
- output: filtered `Post[]` by tag which would only run if `tagFilter` is set (not null)

`sortByDate`

- called in `PostList.tsx` at the component level
- input: takes in `result` from the `searchPosts` and `sortOrder` that is either `asc` or `desc` from the store
- output: sorted `Post[]` by Date which only runs if `sortKey === 'date'`

`sortByTitle`

- called in `PostList.tsx` at the component level
- input: takes in `result` from the `searchPosts` and `sortOrder` that is either `asc` or `desc` from the store
- output: sorted `Post[]` by its title - only runs if `sortkey === 'title'`

### Excerpt

`createExcerpt`

- called in `PostPreview.tsx`
- input: `body` — the post body string; `150` — max character length
- output: the body trimmed to the last complete word within 150 characters, followed by `"…"` if truncated

### Reading Time

`readingTime`

- called in `PostPreview.tsx`
- input: `body` — the post body string
- output: estimated reading time as a number of minutes

`formatTime`

- called in `PostPreview.tsx`, wrapping the result of `readingTime`
- input: number of minutes from `readingTime`
- output: a readable label like `"Less than a minute"`, `"20 minutes"`, or `"2 hours"`

### Date-Status Display

`formatDate`

- called in `PostPreview.tsx`
- input: `createdAt` — an ISO 8601 date string from the post
- output: a human-readable date string like `"April 2, 2026"`, or `null` if the input is invalid

`statusToLabel`

- called in `PostPreview.tsx`
- input: `status` — a `PostStatus` value (`"draft"`, `"review"`, or `"published"`)
- output: a display label like `"Draft"` or `"In Review"`, or `null` if the status is invalid

`statusToColor`

- called in `PostPreview.tsx`
- input: `status` — a `PostStatus` value (`"draft"`, `"review"`, or `"published"`)
- output: a color token (`"gray"`, `"yellow"`, or `"green"`) used for inline styling, or `null` if the status is invalid

### Slug

`createSlugFromTitle`

- called in `lib/posts.ts`
- input: `title` — the post title string
- output: a lowercase, hyphen-separated, URL-safe slug truncated to 80 characters

`makeUniqueSlug`

- called in `lib/posts.ts`, wrapping the result of `createSlugFromTitle`
- input: `slug` — a valid slug from `createSlugFromTitle`; `existingSlugs` — array of slugs already in use
- output: the same slug if unique, otherwise the slug with `-1`, `-2`, etc. appended until unique

### UI Component - missing

### Storage -- missing
