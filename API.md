# Film{IN}hos API

Backend REST API for the Film{IN}hos app (a Letterboxd-style movie review site). Built with AdonisJS 6.

- Base URL: `/api/v1`
- All responses are wrapped as `{ "data": ... }`. Paginated list endpoints additionally include a `metadata` object.
- Authentication is via Bearer tokens (`Authorization: Bearer <token>`), obtained from `/auth/signup` or `/auth/login`.
- 🔒 marks routes that require authentication (missing/invalid token → `401`).

## Conventions

**Pagination** — any endpoint marked _paginated_ accepts:

| Query param | Type | Default | Notes |
|---|---|---|---|
| `page` | number | `1` | |
| `perPage` | number | `20` | capped at `50` |

Paginated responses look like:

```json
{
  "data": [ ... ],
  "metadata": {
    "total": 48,
    "perPage": 20,
    "currentPage": 1,
    "lastPage": 3,
    "firstPage": 1,
    "firstPageUrl": "/?page=1",
    "lastPageUrl": "/?page=3",
    "nextPageUrl": "/?page=2",
    "previousPageUrl": null
  }
}
```

**Array query params** (e.g. `genreIds`) must use bracket notation: `?genreIds[]=1&genreIds[]=2`.

**Errors** — validation failures return `422` with a VineJS error list; ownership/auth failures return `401` or `403` with `{ "message": "..." }` or `{ "errors": [...] }`.

---

## Auth

### `POST /auth/signup`
Body: `{ fullName?, email, password, passwordConfirmation }` (password 8-32 chars).
Response: `{ data: { user: {...}, token: "oat_..." } }`.

### `POST /auth/login`
Body: `{ email, password }`.
Response: `{ data: { user: {...}, token: "oat_..." } }`.

### `GET /account/profile` 🔒
Current user's own profile (includes `email`).

### `POST /account/logout` 🔒
Revokes the current access token.

---

## Genres

Genre object: `{ id, name }`.

| Method | Path | Auth | Body | Notes |
|---|---|---|---|---|
| GET | `/genres` | – | – | list all |
| GET | `/genres/:id` | – | – | 404 if missing |
| POST | `/genres` | 🔒 | `{ name }` | |
| PUT | `/genres/:id` | 🔒 | `{ name }` | |
| DELETE | `/genres/:id` | 🔒 | – | `204` |

---

## Movies

Movie object (list variant): `{ id, title, posterImageUrl, releaseYear, genres: Genre[] }`.

Movie object (detail variant, `GET /movies/:id`): adds `synopsis, bannerImageUrl, durationMinutes, ageRating, contentWarning, cast, createdAt, updatedAt, avgRating, reviewCount, isFavorite, isWatched`.

`isFavorite`/`isWatched` reflect the **authenticated** user's state when a valid token is sent (public routes still honor an optional token); they default to `false` when unauthenticated.

| Method | Path | Auth | Notes |
|---|---|---|---|
| GET | `/movies` | – | paginated. Query: `q` (title search), `genreIds[]` (one or more, OR semantics) |
| GET | `/movies/featured` | – | random selection, query `count` (default 10, max 30) |
| GET | `/movies/:id` | – | detail; 404 if missing |
| POST | `/movies` | 🔒 | `{ title, synopsis, posterImageUrl?, bannerImageUrl?, releaseYear?, durationMinutes?, ageRating?, contentWarning?, cast?, genreIds?: number[] }` |
| PUT | `/movies/:id` | 🔒 | same fields, all optional |
| DELETE | `/movies/:id` | 🔒 | `204` |

---

## Reviews

Review object: `{ id, rating, text, createdAt, updatedAt, user: { id, fullName, avatarUrl, initials }, movie? }`. `movie` is embedded except when the request already scopes to a single movie's own review list.

`rating` must be one of `0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5`.

A user has **at most one review per movie** — posting again for the same movie updates the existing review instead of creating a duplicate.

| Method | Path | Auth | Notes |
|---|---|---|---|
| GET | `/reviews` | – | paginated. Query: `movieId` (filter to one movie's reviews, e.g. for the movie detail page) |
| GET | `/reviews/random` | – | query `count` (default 10, max 30), for the Home page |
| GET | `/reviews/:id` | – | 404 if missing |
| POST | `/reviews` | 🔒 | `{ movieId, rating, text }` — create or update the caller's review for that movie |
| PUT | `/reviews/:id` | 🔒 | `{ rating, text }` — owner only, `403` otherwise |
| DELETE | `/reviews/:id` | 🔒 | owner only, `403` otherwise, `204` on success |

---

## Account (current user)

All routes below are prefixed `/account` and require auth 🔒.

| Method | Path | Notes |
|---|---|---|
| GET | `/account/favorites` | paginated movie list. Query: `search` (title) |
| POST | `/account/favorites` | `{ movieId }` — idempotent (`200` even if already favorited) |
| DELETE | `/account/favorites/:movieId` | idempotent (`204` even if not favorited) |
| GET | `/account/watched` | paginated movie list. Query: `search` (title) |
| POST | `/account/watched` | `{ movieId }` — idempotent |
| DELETE | `/account/watched/:movieId` | idempotent |
| GET | `/account/reviews` | paginated, "My Reviews" — each review embeds its `movie` |

---

## Public user profiles

| Method | Path | Notes |
|---|---|---|
| GET | `/users/:id` | `{ id, fullName, avatarUrl, initials }` — no email. 404 if missing |
| GET | `/users/:id/favorites` | paginated movie list |
| GET | `/users/:id/watched` | paginated movie list |
| GET | `/users/:id/reviews` | paginated, each review embeds its `movie` |

---

## Example flow

```bash
# 1. Sign up and grab the token
curl -X POST /api/v1/auth/signup -H 'Content-Type: application/json' \
  -d '{"fullName":"Ana","email":"ana@example.com","password":"password123","passwordConfirmation":"password123"}'

# 2. Browse movies
curl "/api/v1/movies?q=Fúria&genreIds[]=1"
curl "/api/v1/movies/featured?count=5"

# 3. Favorite, mark watched, and review a movie (needs the token from step 1)
curl -X POST /api/v1/account/favorites -H "Authorization: Bearer <token>" -d '{"movieId":1}'
curl -X POST /api/v1/account/watched  -H "Authorization: Bearer <token>" -d '{"movieId":1}'
curl -X POST /api/v1/reviews -H "Authorization: Bearer <token>" \
  -d '{"movieId":1,"rating":4.5,"text":"Great movie!"}'
```
