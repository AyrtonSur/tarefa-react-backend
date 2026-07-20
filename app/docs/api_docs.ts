export type RouteParam = { field: string; type: string; required: boolean; notes?: string }
export type RouteResponse = { status: number; description: string; body?: unknown }
export type RouteDoc = {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  path: string
  tag: string
  summary: string
  auth: boolean
  requestBody?: RouteParam[]
  queryParams?: RouteParam[]
  responses: RouteResponse[]
}

export const apiDocs: RouteDoc[] = [
  // ---------------------------------------------------------------------
  // Auth
  // ---------------------------------------------------------------------
  {
    method: 'POST',
    path: '/api/v1/auth/signup',
    tag: 'Auth',
    summary: 'Create a new account and receive an access token',
    auth: false,
    requestBody: [
      {
        field: 'fullName',
        type: 'string | null',
        required: false,
        notes: 'Nullable; display name',
      },
      {
        field: 'email',
        type: 'string',
        required: true,
        notes: 'Must be a valid, unique email (max 254 chars)',
      },
      { field: 'password', type: 'string', required: true, notes: 'Between 8 and 32 characters' },
      {
        field: 'passwordConfirmation',
        type: 'string',
        required: true,
        notes: 'Must match password',
      },
    ],
    responses: [
      {
        status: 200,
        description: 'Account created successfully',
        body: {
          data: {
            token: 'oat_MQ.VGJJbk1kT2RwcEpNUmx5dl93UzVVMUJJTFBkQmlZaHI2MHJTUHFtaTMxNDQzMTkxMTY',
            user: {
              id: 1,
              fullName: 'Test User',
              email: 'test@example.com',
              createdAt: '2026-07-20T16:41:43.695+00:00',
              updatedAt: '2026-07-20T16:41:43.695+00:00',
              initials: 'TU',
            },
          },
        },
      },
      {
        status: 422,
        description: 'Validation failure — duplicate email and/or mismatched password confirmation',
        body: {
          errors: [
            {
              message: 'The email has already been taken',
              rule: 'database.unique',
              field: 'email',
            },
            {
              message: 'The passwordConfirmation field and password field must be the same',
              rule: 'sameAs',
              field: 'passwordConfirmation',
              meta: { otherField: 'password' },
            },
          ],
        },
      },
    ],
  },
  {
    method: 'POST',
    path: '/api/v1/auth/login',
    tag: 'Auth',
    summary: 'Authenticate with email and password and receive an access token',
    auth: false,
    requestBody: [
      { field: 'email', type: 'string', required: true, notes: 'Valid email address' },
      { field: 'password', type: 'string', required: true },
    ],
    responses: [
      {
        status: 200,
        description: 'Login successful',
        body: {
          data: {
            token: 'oat_MQ.VGJJbk1kT2RwcEpNUmx5dl93UzVVMUJJTFBkQmlZaHI2MHJTUHFtaTMxNDQzMTkxMTY',
            user: {
              id: 1,
              fullName: 'Test User',
              email: 'test@example.com',
              createdAt: '2026-07-20T16:41:43.695+00:00',
              updatedAt: '2026-07-20T16:41:43.695+00:00',
              initials: 'TU',
            },
          },
        },
      },
      {
        status: 422,
        description: 'Validation failure — missing/malformed email or password',
        body: {
          errors: [
            {
              message: 'The email field must be a valid email address',
              rule: 'email',
              field: 'email',
            },
          ],
        },
      },
      {
        status: 400,
        description: 'Invalid credentials (email not found, or password mismatch)',
        body: { errors: [{ message: 'Invalid user credentials' }] },
      },
    ],
  },
  {
    method: 'GET',
    path: '/api/v1/account/profile',
    tag: 'Auth',
    summary: "Get the authenticated user's own profile (includes email)",
    auth: true,
    responses: [
      {
        status: 200,
        description: 'Current user profile',
        body: {
          data: {
            id: 1,
            fullName: 'Test User',
            email: 'test@example.com',
            avatarUrl: null,
            createdAt: '2026-07-20T16:41:43.695+00:00',
            updatedAt: '2026-07-20T16:41:43.695+00:00',
            initials: 'TU',
          },
        },
      },
      {
        status: 401,
        description: 'Missing or invalid Bearer token',
        body: { errors: [{ message: 'Unauthorized access' }] },
      },
    ],
  },
  {
    method: 'POST',
    path: '/api/v1/account/logout',
    tag: 'Auth',
    summary: 'Revoke the current access token, logging the user out',
    auth: true,
    responses: [
      {
        status: 200,
        description: 'Logged out successfully (this particular response is NOT wrapped in "data")',
        body: { message: 'Logged out successfully' },
      },
      {
        status: 401,
        description: 'Missing or invalid Bearer token',
        body: { errors: [{ message: 'Unauthorized access' }] },
      },
    ],
  },

  // ---------------------------------------------------------------------
  // Genres
  // ---------------------------------------------------------------------
  {
    method: 'GET',
    path: '/api/v1/genres',
    tag: 'Genres',
    summary: 'List all genres',
    auth: false,
    responses: [
      {
        status: 200,
        description: 'All genres, ordered by name (not paginated)',
        body: {
          data: [
            { id: 1, name: 'Ação' },
            { id: 2, name: 'Aventura' },
            { id: 3, name: 'Comédia' },
          ],
        },
      },
    ],
  },
  {
    method: 'GET',
    path: '/api/v1/genres/:id',
    tag: 'Genres',
    summary: 'Get a single genre by id',
    auth: false,
    responses: [
      { status: 200, description: 'Genre found', body: { data: { id: 1, name: 'Ação' } } },
      {
        status: 404,
        description: 'No genre exists with the given id',
        body: { message: 'Resource not found' },
      },
    ],
  },
  {
    method: 'POST',
    path: '/api/v1/genres',
    tag: 'Genres',
    summary: 'Create a new genre',
    auth: true,
    requestBody: [
      { field: 'name', type: 'string', required: true, notes: 'Trimmed, 1-64 characters' },
    ],
    responses: [
      {
        status: 200,
        description: 'Genre created successfully',
        body: { data: { id: 1, name: 'Ação' } },
      },
      {
        status: 401,
        description: 'Missing or invalid Bearer token',
        body: { errors: [{ message: 'Unauthorized access' }] },
      },
      {
        status: 422,
        description: 'Validation failure — name missing/empty',
        body: {
          errors: [{ message: 'The name field must be defined', rule: 'required', field: 'name' }],
        },
      },
    ],
  },
  {
    method: 'PUT',
    path: '/api/v1/genres/:id',
    tag: 'Genres',
    summary: 'Update an existing genre',
    auth: true,
    requestBody: [
      { field: 'name', type: 'string', required: true, notes: 'Trimmed, 1-64 characters' },
    ],
    responses: [
      {
        status: 200,
        description: 'Genre updated successfully',
        body: { data: { id: 1, name: 'Updated Name' } },
      },
      {
        status: 401,
        description: 'Missing or invalid Bearer token',
        body: { errors: [{ message: 'Unauthorized access' }] },
      },
      {
        status: 404,
        description: 'No genre exists with the given id',
        body: { message: 'Resource not found' },
      },
      {
        status: 422,
        description: 'Validation failure — name missing/empty',
        body: {
          errors: [{ message: 'The name field must be defined', rule: 'required', field: 'name' }],
        },
      },
    ],
  },
  {
    method: 'DELETE',
    path: '/api/v1/genres/:id',
    tag: 'Genres',
    summary: 'Delete a genre',
    auth: true,
    responses: [
      { status: 204, description: 'Genre deleted successfully, no content returned' },
      {
        status: 401,
        description: 'Missing or invalid Bearer token',
        body: { errors: [{ message: 'Unauthorized access' }] },
      },
      {
        status: 404,
        description: 'No genre exists with the given id',
        body: { message: 'Resource not found' },
      },
    ],
  },

  // ---------------------------------------------------------------------
  // Movies
  // ---------------------------------------------------------------------
  {
    method: 'GET',
    path: '/api/v1/movies',
    tag: 'Movies',
    summary:
      'List movies with optional title search and genre filtering (OR semantics across genreIds), paginated',
    auth: false,
    queryParams: [
      {
        field: 'q',
        type: 'string',
        required: false,
        notes: 'Case-insensitive substring match against movie title',
      },
      {
        field: 'genreIds[]',
        type: 'number[]',
        required: false,
        notes:
          'Repeat the param to pass multiple values, e.g. genreIds[]=1&genreIds[]=2. Matches ANY of the listed genres (OR). Not checked against the genres table (unlike create/update).',
      },
      { field: 'page', type: 'number', required: false, notes: 'Defaults to 1' },
      { field: 'perPage', type: 'number', required: false, notes: 'Defaults to 20, max 50' },
    ],
    responses: [
      {
        status: 200,
        description: 'Paginated list of movies (lightweight shape)',
        body: {
          data: [
            {
              id: 1,
              title: 'Fúria de Aço',
              posterImageUrl: null,
              releaseYear: 1990,
              genres: [{ id: 1, name: 'Ação' }],
            },
          ],
          metadata: {
            total: 1,
            perPage: 20,
            currentPage: 1,
            lastPage: 1,
            firstPage: 1,
            firstPageUrl: '/?page=1',
            lastPageUrl: '/?page=1',
            nextPageUrl: null,
            previousPageUrl: null,
          },
        },
      },
      {
        status: 422,
        description: 'Validation error — perPage exceeds the maximum allowed value of 50',
        body: {
          errors: [
            {
              message: 'The perPage field must not be greater than 50',
              rule: 'max',
              field: 'perPage',
              meta: { max: 50 },
            },
          ],
        },
      },
    ],
  },
  {
    method: 'GET',
    path: '/api/v1/movies/featured',
    tag: 'Movies',
    summary: 'Return a random selection of movies (lightweight shape), not paginated',
    auth: false,
    queryParams: [
      { field: 'count', type: 'number', required: false, notes: 'Defaults to 10, max 30' },
    ],
    responses: [
      {
        status: 200,
        description: 'Plain array of randomly selected movies under data (no metadata)',
        body: {
          data: [
            {
              id: 3,
              title: 'Confusão em Família',
              posterImageUrl: null,
              releaseYear: 2010,
              genres: [{ id: 3, name: 'Comédia' }],
            },
          ],
        },
      },
      {
        status: 422,
        description: 'Validation error — count exceeds the maximum allowed value of 30',
        body: {
          errors: [
            {
              message: 'The count field must not be greater than 30',
              rule: 'max',
              field: 'count',
              meta: { max: 30 },
            },
          ],
        },
      },
    ],
  },
  {
    method: 'GET',
    path: '/api/v1/movies/:id',
    tag: 'Movies',
    summary:
      "Get full movie details, including average rating, review count, and favorite/watched flags. Auth is optional: a valid Bearer token yields the requester's real isFavorite/isWatched; without one both default to false",
    auth: false,
    responses: [
      {
        status: 200,
        description: 'Movie found (unauthenticated, or never favorited/watched by the requester)',
        body: {
          data: {
            id: 1,
            title: 'Test Movie',
            synopsis: 'A test synopsis',
            posterImageUrl: null,
            bannerImageUrl: null,
            releaseYear: 2023,
            durationMinutes: 102,
            ageRating: '12',
            contentWarning: 'Violência',
            cast: 'Actor One, Actor Two',
            createdAt: '2026-07-20T16:42:05.000+00:00',
            updatedAt: '2026-07-20T16:42:05.000+00:00',
            avgRating: null,
            reviewCount: 0,
            isFavorite: false,
            isWatched: false,
            genres: [{ id: 1, name: 'Ação' }],
          },
        },
      },
      {
        status: 200,
        description:
          'Movie found (authenticated requester has favorited it, watched it, and left a review)',
        body: {
          data: {
            id: 1,
            title: 'Test Movie',
            synopsis: 'A test synopsis',
            posterImageUrl: null,
            bannerImageUrl: null,
            releaseYear: 2023,
            durationMinutes: 102,
            ageRating: '12',
            contentWarning: 'Violência',
            cast: 'Actor One, Actor Two',
            createdAt: '2026-07-20T16:42:05.000+00:00',
            updatedAt: '2026-07-20T16:42:05.000+00:00',
            avgRating: 4.5,
            reviewCount: 1,
            isFavorite: true,
            isWatched: true,
            genres: [{ id: 1, name: 'Ação' }],
          },
        },
      },
      {
        status: 404,
        description: 'No movie exists with the given id',
        body: { message: 'Movie not found' },
      },
    ],
  },
  {
    method: 'POST',
    path: '/api/v1/movies',
    tag: 'Movies',
    summary:
      'Create a new movie. genreIds is fully optional; if provided, each id must reference an existing genre',
    auth: true,
    requestBody: [
      { field: 'title', type: 'string', required: true, notes: '1-255 characters (trimmed)' },
      { field: 'synopsis', type: 'string', required: true, notes: 'Minimum 1 character (trimmed)' },
      { field: 'posterImageUrl', type: 'string', required: false, notes: 'Must be a valid URL' },
      { field: 'bannerImageUrl', type: 'string', required: false, notes: 'Must be a valid URL' },
      { field: 'releaseYear', type: 'number', required: false, notes: 'Between 1888 and 2100' },
      { field: 'durationMinutes', type: 'number', required: false, notes: 'Must be positive' },
      { field: 'ageRating', type: 'string', required: false, notes: 'Max 16 characters' },
      { field: 'contentWarning', type: 'string', required: false, notes: 'Max 255 characters' },
      { field: 'cast', type: 'string', required: false, notes: 'Free-text, trimmed' },
      {
        field: 'genreIds',
        type: 'number[]',
        required: false,
        notes: 'Each value must reference an existing genre id',
      },
    ],
    responses: [
      {
        status: 200,
        description:
          'Movie created successfully, returned in full detail shape (no reviews/favorites yet)',
        body: {
          data: {
            id: 49,
            title: 'Test Movie',
            synopsis: 'A test synopsis',
            posterImageUrl: null,
            bannerImageUrl: null,
            releaseYear: 2023,
            durationMinutes: 102,
            ageRating: '12',
            contentWarning: 'Violência',
            cast: 'Actor One, Actor Two',
            createdAt: '2026-07-20T16:42:05.292+00:00',
            updatedAt: '2026-07-20T16:42:05.292+00:00',
            avgRating: null,
            reviewCount: 0,
            isFavorite: false,
            isWatched: false,
            genres: [{ id: 1, name: 'Ação' }],
          },
        },
      },
      {
        status: 401,
        description: 'No valid access token supplied',
        body: { errors: [{ message: 'Unauthorized access' }] },
      },
      {
        status: 422,
        description: 'Validation error — required field(s) missing',
        body: {
          errors: [
            { message: 'The title field must be defined', rule: 'required', field: 'title' },
          ],
        },
      },
      {
        status: 422,
        description:
          'Validation error — a genreIds entry does not reference an existing genre (verified real shape, note the unusual message wording)',
        body: {
          errors: [
            {
              message: 'The selected 0 is invalid',
              rule: 'database.exists',
              field: 'genreIds.0',
              index: 0,
            },
          ],
        },
      },
    ],
  },
  {
    method: 'PUT',
    path: '/api/v1/movies/:id',
    tag: 'Movies',
    summary:
      "Partially update a movie. All fields optional. If genreIds is provided, the movie's genres are fully re-synced to that list; if omitted, existing genres are left untouched",
    auth: true,
    requestBody: [
      { field: 'title', type: 'string', required: false },
      { field: 'synopsis', type: 'string', required: false },
      { field: 'posterImageUrl', type: 'string', required: false, notes: 'Must be a valid URL' },
      { field: 'bannerImageUrl', type: 'string', required: false, notes: 'Must be a valid URL' },
      { field: 'releaseYear', type: 'number', required: false },
      { field: 'durationMinutes', type: 'number', required: false },
      { field: 'ageRating', type: 'string', required: false },
      { field: 'contentWarning', type: 'string', required: false },
      { field: 'cast', type: 'string', required: false },
      {
        field: 'genreIds',
        type: 'number[]',
        required: false,
        notes: "Replaces (syncs) the movie's current genres entirely",
      },
    ],
    responses: [
      {
        status: 200,
        description: 'Movie updated successfully, returned in full detail shape',
        body: {
          data: {
            id: 1,
            title: 'Updated Movie Title',
            synopsis: 'A test synopsis',
            posterImageUrl: null,
            bannerImageUrl: null,
            releaseYear: 2023,
            durationMinutes: 110,
            ageRating: '12',
            contentWarning: 'Violência',
            cast: 'Actor One, Actor Two',
            createdAt: '2026-07-20T16:42:05.292+00:00',
            updatedAt: '2026-07-20T17:10:00.000+00:00',
            avgRating: null,
            reviewCount: 0,
            isFavorite: false,
            isWatched: false,
            genres: [{ id: 2, name: 'Drama' }],
          },
        },
      },
      {
        status: 401,
        description: 'No valid access token supplied',
        body: { errors: [{ message: 'Unauthorized access' }] },
      },
      {
        status: 404,
        description: 'No movie exists with the given id',
        body: { message: 'Resource not found' },
      },
      {
        status: 422,
        description: 'Validation error — a genreIds entry does not reference an existing genre',
        body: {
          errors: [
            {
              message: 'The selected 0 is invalid',
              rule: 'database.exists',
              field: 'genreIds.0',
              index: 0,
            },
          ],
        },
      },
    ],
  },
  {
    method: 'DELETE',
    path: '/api/v1/movies/:id',
    tag: 'Movies',
    summary: 'Delete a movie by id',
    auth: true,
    responses: [
      { status: 204, description: 'Movie deleted successfully, no content returned' },
      {
        status: 401,
        description: 'No valid access token supplied',
        body: { errors: [{ message: 'Unauthorized access' }] },
      },
      {
        status: 404,
        description: 'No movie exists with the given id',
        body: { message: 'Resource not found' },
      },
    ],
  },

  // ---------------------------------------------------------------------
  // Reviews
  // ---------------------------------------------------------------------
  {
    method: 'GET',
    path: '/api/v1/reviews',
    tag: 'Reviews',
    summary:
      "List reviews, paginated, optionally filtered by movie (this is how the movie detail page loads a movie's review list)",
    auth: false,
    queryParams: [
      {
        field: 'movieId',
        type: 'number',
        required: false,
        notes: 'Filters reviews to a single movie',
      },
      { field: 'page', type: 'number', required: false, notes: 'Defaults to 1' },
      { field: 'perPage', type: 'number', required: false, notes: 'Defaults to 20, max 50' },
    ],
    responses: [
      {
        status: 200,
        description:
          'Paginated list of reviews, most recent first, embedding the public user and the movie',
        body: {
          data: [
            {
              id: 1,
              rating: 4.5,
              text: 'Great movie!',
              createdAt: '2026-07-20T16:42:18.000+00:00',
              updatedAt: '2026-07-20T16:42:18.000+00:00',
              user: { id: 1, fullName: 'Test User', avatarUrl: null, initials: 'TU' },
              movie: {
                id: 1,
                title: 'Test Movie',
                posterImageUrl: null,
                releaseYear: 2023,
                genres: [{ id: 1, name: 'Ação' }],
              },
            },
          ],
          metadata: {
            total: 1,
            perPage: 20,
            currentPage: 1,
            lastPage: 1,
            firstPage: 1,
            firstPageUrl: '/?page=1',
            lastPageUrl: '/?page=1',
            nextPageUrl: null,
            previousPageUrl: null,
          },
        },
      },
      {
        status: 422,
        description: 'Validation error — perPage above 50',
        body: {
          errors: [
            {
              message: 'The perPage field must not be greater than 50',
              rule: 'max',
              field: 'perPage',
              meta: { max: 50 },
            },
          ],
        },
      },
    ],
  },
  {
    method: 'GET',
    path: '/api/v1/reviews/random',
    tag: 'Reviews',
    summary: 'Return a random sample of reviews (not paginated), for the Home page',
    auth: false,
    queryParams: [
      { field: 'count', type: 'number', required: false, notes: 'Defaults to 10, max 30' },
    ],
    responses: [
      {
        status: 200,
        description: 'Plain array of random reviews under data, no metadata',
        body: {
          data: [
            {
              id: 1,
              rating: 4.5,
              text: 'Great movie!',
              createdAt: '2026-07-20T16:42:18.000+00:00',
              updatedAt: '2026-07-20T16:42:18.000+00:00',
              user: { id: 1, fullName: 'Test User', avatarUrl: null, initials: 'TU' },
              movie: {
                id: 1,
                title: 'Test Movie',
                posterImageUrl: null,
                releaseYear: 2023,
                genres: [{ id: 1, name: 'Ação' }],
              },
            },
          ],
        },
      },
      {
        status: 422,
        description: 'Validation error — count above 30',
        body: {
          errors: [
            {
              message: 'The count field must not be greater than 30',
              rule: 'max',
              field: 'count',
              meta: { max: 30 },
            },
          ],
        },
      },
    ],
  },
  {
    method: 'GET',
    path: '/api/v1/reviews/:id',
    tag: 'Reviews',
    summary: 'Get a single review by id',
    auth: false,
    responses: [
      {
        status: 200,
        description: 'Review found, embedding the public user and the movie',
        body: {
          data: {
            id: 1,
            rating: 4.5,
            text: 'Great movie!',
            createdAt: '2026-07-20T16:42:18.000+00:00',
            updatedAt: '2026-07-20T16:42:18.000+00:00',
            user: { id: 1, fullName: 'Test User', avatarUrl: null, initials: 'TU' },
            movie: {
              id: 1,
              title: 'Test Movie',
              posterImageUrl: null,
              releaseYear: 2023,
              genres: [{ id: 1, name: 'Ação' }],
            },
          },
        },
      },
      {
        status: 404,
        description: 'No review exists with the given id',
        body: { message: 'Review not found' },
      },
    ],
  },
  {
    method: 'POST',
    path: '/api/v1/reviews',
    tag: 'Reviews',
    summary:
      "Create or update the authenticated user's review for a movie. This is an upsert on (userId, movieId): posting again for the same movie updates the existing review instead of creating a duplicate",
    auth: true,
    requestBody: [
      {
        field: 'movieId',
        type: 'number',
        required: true,
        notes: 'Must reference an existing movie',
      },
      {
        field: 'rating',
        type: 'number',
        required: true,
        notes: 'Must be one of 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5',
      },
      { field: 'text', type: 'string', required: true, notes: '1 to 2000 characters, trimmed' },
    ],
    responses: [
      {
        status: 200,
        description: 'Review created or updated, embedding the public user and the movie',
        body: {
          data: {
            id: 1,
            rating: 4.5,
            text: 'Great movie!',
            createdAt: '2026-07-20T16:42:18.709+00:00',
            updatedAt: '2026-07-20T16:42:18.709+00:00',
            user: { id: 1, fullName: 'Test User', avatarUrl: null, initials: 'TU' },
            movie: {
              id: 1,
              title: 'Test Movie',
              posterImageUrl: null,
              releaseYear: 2023,
              genres: [{ id: 1, name: 'Ação' }],
            },
          },
        },
      },
      {
        status: 401,
        description: 'No authenticated user',
        body: { errors: [{ message: 'Unauthorized access' }] },
      },
      {
        status: 422,
        description: 'rating is not one of the allowed half-star values',
        body: {
          errors: [
            {
              message: 'The selected rating is invalid',
              rule: 'in',
              field: 'rating',
              meta: { values: [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5] },
            },
          ],
        },
      },
      {
        status: 422,
        description: 'movieId does not reference an existing movie',
        body: {
          errors: [
            {
              message: 'The selected movieId is invalid',
              rule: 'database.exists',
              field: 'movieId',
            },
          ],
        },
      },
    ],
  },
  {
    method: 'PUT',
    path: '/api/v1/reviews/:id',
    tag: 'Reviews',
    summary: 'Update a review (owner only)',
    auth: true,
    requestBody: [
      {
        field: 'rating',
        type: 'number',
        required: true,
        notes: 'Must be one of 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5',
      },
      { field: 'text', type: 'string', required: true, notes: '1 to 2000 characters, trimmed' },
    ],
    responses: [
      {
        status: 200,
        description: 'Review updated, embedding the public user and the movie',
        body: {
          data: {
            id: 1,
            rating: 3,
            text: 'Updated text',
            createdAt: '2026-07-20T16:42:18.709+00:00',
            updatedAt: '2026-07-20T17:12:00.000+00:00',
            user: { id: 1, fullName: 'Test User', avatarUrl: null, initials: 'TU' },
            movie: {
              id: 1,
              title: 'Test Movie',
              posterImageUrl: null,
              releaseYear: 2023,
              genres: [{ id: 1, name: 'Ação' }],
            },
          },
        },
      },
      {
        status: 401,
        description: 'No authenticated user',
        body: { errors: [{ message: 'Unauthorized access' }] },
      },
      {
        status: 403,
        description: 'Review exists but belongs to a different user',
        body: { message: 'You can only edit your own reviews' },
      },
      {
        status: 404,
        description: 'No review exists with the given id',
        body: { message: 'Resource not found' },
      },
      {
        status: 422,
        description: 'rating is not one of the allowed half-star values',
        body: {
          errors: [
            {
              message: 'The selected rating is invalid',
              rule: 'in',
              field: 'rating',
              meta: { values: [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5] },
            },
          ],
        },
      },
    ],
  },
  {
    method: 'DELETE',
    path: '/api/v1/reviews/:id',
    tag: 'Reviews',
    summary: 'Delete a review (owner only)',
    auth: true,
    responses: [
      { status: 204, description: 'Review deleted, no content returned' },
      {
        status: 401,
        description: 'No authenticated user',
        body: { errors: [{ message: 'Unauthorized access' }] },
      },
      {
        status: 403,
        description: 'Review exists but belongs to a different user',
        body: { message: 'You can only delete your own reviews' },
      },
      {
        status: 404,
        description: 'No review exists with the given id',
        body: { message: 'Resource not found' },
      },
    ],
  },

  // ---------------------------------------------------------------------
  // Account (current authenticated user)
  // ---------------------------------------------------------------------
  {
    method: 'GET',
    path: '/api/v1/account/favorites',
    tag: 'Account',
    summary: "List the authenticated user's favorite movies (paginated, searchable by title)",
    auth: true,
    queryParams: [
      { field: 'page', type: 'number', required: false, notes: 'Defaults to 1' },
      { field: 'perPage', type: 'number', required: false, notes: 'Defaults to 20, max 50' },
      {
        field: 'search',
        type: 'string',
        required: false,
        notes: 'Filters by movie title (case-insensitive)',
      },
    ],
    responses: [
      {
        status: 200,
        description: 'Paginated list of favorite movies',
        body: {
          data: [
            {
              id: 1,
              title: 'Test Movie',
              posterImageUrl: null,
              releaseYear: 2023,
              genres: [{ id: 1, name: 'Ação' }],
            },
          ],
          metadata: {
            total: 1,
            perPage: 20,
            currentPage: 1,
            lastPage: 1,
            firstPage: 1,
            firstPageUrl: '/?page=1',
            lastPageUrl: '/?page=1',
            nextPageUrl: null,
            previousPageUrl: null,
          },
        },
      },
      {
        status: 401,
        description: 'Missing or invalid Bearer token',
        body: { errors: [{ message: 'Unauthorized access' }] },
      },
      {
        status: 422,
        description: 'Validation error — perPage above 50',
        body: {
          errors: [
            {
              message: 'The perPage field must not be greater than 50',
              rule: 'max',
              field: 'perPage',
              meta: { max: 50 },
            },
          ],
        },
      },
    ],
  },
  {
    method: 'POST',
    path: '/api/v1/account/favorites',
    tag: 'Account',
    summary: "Add a movie to the authenticated user's favorites (idempotent)",
    auth: true,
    requestBody: [
      {
        field: 'movieId',
        type: 'number',
        required: true,
        notes: 'Must reference an existing movie',
      },
    ],
    responses: [
      {
        status: 200,
        description: 'Movie added to favorites (same response even if already favorited)',
        body: { data: { message: 'Movie added to favorites' } },
      },
      {
        status: 401,
        description: 'Missing or invalid Bearer token',
        body: { errors: [{ message: 'Unauthorized access' }] },
      },
      {
        status: 422,
        description: 'movieId missing or does not reference an existing movie',
        body: {
          errors: [
            {
              message: 'The selected movieId is invalid',
              rule: 'database.exists',
              field: 'movieId',
            },
          ],
        },
      },
    ],
  },
  {
    method: 'DELETE',
    path: '/api/v1/account/favorites/:movieId',
    tag: 'Account',
    summary: "Remove a movie from the authenticated user's favorites (idempotent)",
    auth: true,
    responses: [
      {
        status: 204,
        description: 'Movie removed from favorites (or was never favorited); no body',
      },
      {
        status: 401,
        description: 'Missing or invalid Bearer token',
        body: { errors: [{ message: 'Unauthorized access' }] },
      },
    ],
  },
  {
    method: 'GET',
    path: '/api/v1/account/watched',
    tag: 'Account',
    summary:
      'List movies the authenticated user has marked as watched (paginated, searchable by title)',
    auth: true,
    queryParams: [
      { field: 'page', type: 'number', required: false, notes: 'Defaults to 1' },
      { field: 'perPage', type: 'number', required: false, notes: 'Defaults to 20, max 50' },
      {
        field: 'search',
        type: 'string',
        required: false,
        notes: 'Filters by movie title (case-insensitive)',
      },
    ],
    responses: [
      {
        status: 200,
        description: 'Paginated list of watched movies',
        body: {
          data: [
            {
              id: 1,
              title: 'Test Movie',
              posterImageUrl: null,
              releaseYear: 2023,
              genres: [{ id: 1, name: 'Ação' }],
            },
          ],
          metadata: {
            total: 1,
            perPage: 20,
            currentPage: 1,
            lastPage: 1,
            firstPage: 1,
            firstPageUrl: '/?page=1',
            lastPageUrl: '/?page=1',
            nextPageUrl: null,
            previousPageUrl: null,
          },
        },
      },
      {
        status: 401,
        description: 'Missing or invalid Bearer token',
        body: { errors: [{ message: 'Unauthorized access' }] },
      },
      {
        status: 422,
        description: 'Validation error — perPage above 50',
        body: {
          errors: [
            {
              message: 'The perPage field must not be greater than 50',
              rule: 'max',
              field: 'perPage',
              meta: { max: 50 },
            },
          ],
        },
      },
    ],
  },
  {
    method: 'POST',
    path: '/api/v1/account/watched',
    tag: 'Account',
    summary: 'Mark a movie as watched for the authenticated user (idempotent)',
    auth: true,
    requestBody: [
      {
        field: 'movieId',
        type: 'number',
        required: true,
        notes: 'Must reference an existing movie',
      },
    ],
    responses: [
      {
        status: 200,
        description: 'Movie marked as watched (same response even if already watched)',
        body: { data: { message: 'Movie marked as watched' } },
      },
      {
        status: 401,
        description: 'Missing or invalid Bearer token',
        body: { errors: [{ message: 'Unauthorized access' }] },
      },
      {
        status: 422,
        description: 'movieId missing or does not reference an existing movie',
        body: {
          errors: [
            {
              message: 'The selected movieId is invalid',
              rule: 'database.exists',
              field: 'movieId',
            },
          ],
        },
      },
    ],
  },
  {
    method: 'DELETE',
    path: '/api/v1/account/watched/:movieId',
    tag: 'Account',
    summary: 'Unmark a movie as watched for the authenticated user (idempotent)',
    auth: true,
    responses: [
      {
        status: 204,
        description: 'Movie removed from watched list (or was never watched); no body',
      },
      {
        status: 401,
        description: 'Missing or invalid Bearer token',
        body: { errors: [{ message: 'Unauthorized access' }] },
      },
    ],
  },
  {
    method: 'GET',
    path: '/api/v1/account/reviews',
    tag: 'Account',
    summary:
      'List reviews written by the authenticated user (paginated), each including the reviewed movie',
    auth: true,
    queryParams: [
      { field: 'page', type: 'number', required: false, notes: 'Defaults to 1' },
      { field: 'perPage', type: 'number', required: false, notes: 'Defaults to 20, max 50' },
    ],
    responses: [
      {
        status: 200,
        description: "Paginated list of the user's reviews",
        body: {
          data: [
            {
              id: 1,
              rating: 4.5,
              text: 'Great movie!',
              createdAt: '2026-07-20T16:42:18.000+00:00',
              updatedAt: '2026-07-20T16:42:18.000+00:00',
              user: { id: 1, fullName: 'Test User', avatarUrl: null, initials: 'TU' },
              movie: {
                id: 1,
                title: 'Test Movie',
                posterImageUrl: null,
                releaseYear: 2023,
                genres: [{ id: 1, name: 'Ação' }],
              },
            },
          ],
          metadata: {
            total: 1,
            perPage: 20,
            currentPage: 1,
            lastPage: 1,
            firstPage: 1,
            firstPageUrl: '/?page=1',
            lastPageUrl: '/?page=1',
            nextPageUrl: null,
            previousPageUrl: null,
          },
        },
      },
      {
        status: 401,
        description: 'Missing or invalid Bearer token',
        body: { errors: [{ message: 'Unauthorized access' }] },
      },
      {
        status: 422,
        description: 'Validation error — perPage above 50',
        body: {
          errors: [
            {
              message: 'The perPage field must not be greater than 50',
              rule: 'max',
              field: 'perPage',
              meta: { max: 50 },
            },
          ],
        },
      },
    ],
  },

  // ---------------------------------------------------------------------
  // Public user profiles
  // ---------------------------------------------------------------------
  {
    method: 'GET',
    path: '/api/v1/users/:id',
    tag: 'Users',
    summary: "Get a user's public profile (no email)",
    auth: false,
    responses: [
      {
        status: 200,
        description: 'Public profile found',
        body: { data: { id: 1, fullName: 'Test User', avatarUrl: null, initials: 'TU' } },
      },
      {
        status: 404,
        description: 'No user exists with the given id',
        body: { message: 'User not found' },
      },
    ],
  },
  {
    method: 'GET',
    path: '/api/v1/users/:id/favorites',
    tag: 'Users',
    summary:
      "List a user's favorite movies (paginated). The `search` param is accepted but not applied by this endpoint",
    auth: false,
    queryParams: [
      { field: 'page', type: 'number', required: false, notes: 'Defaults to 1' },
      { field: 'perPage', type: 'number', required: false, notes: 'Defaults to 20, max 50' },
    ],
    responses: [
      {
        status: 200,
        description: 'Paginated list of favorite movies, most recently favorited first',
        body: {
          data: [
            {
              id: 1,
              title: 'Test Movie',
              posterImageUrl: null,
              releaseYear: 2023,
              genres: [{ id: 1, name: 'Ação' }],
            },
          ],
          metadata: {
            total: 1,
            perPage: 20,
            currentPage: 1,
            lastPage: 1,
            firstPage: 1,
            firstPageUrl: '/?page=1',
            lastPageUrl: '/?page=1',
            nextPageUrl: null,
            previousPageUrl: null,
          },
        },
      },
      {
        status: 404,
        description: 'No user exists with the given id',
        body: { message: 'User not found' },
      },
    ],
  },
  {
    method: 'GET',
    path: '/api/v1/users/:id/watched',
    tag: 'Users',
    summary: 'List movies a user has marked as watched (paginated)',
    auth: false,
    queryParams: [
      { field: 'page', type: 'number', required: false, notes: 'Defaults to 1' },
      { field: 'perPage', type: 'number', required: false, notes: 'Defaults to 20, max 50' },
    ],
    responses: [
      {
        status: 200,
        description: 'Paginated list of watched movies, most recently watched first',
        body: {
          data: [
            {
              id: 1,
              title: 'Test Movie',
              posterImageUrl: null,
              releaseYear: 2023,
              genres: [{ id: 1, name: 'Ação' }],
            },
          ],
          metadata: {
            total: 1,
            perPage: 20,
            currentPage: 1,
            lastPage: 1,
            firstPage: 1,
            firstPageUrl: '/?page=1',
            lastPageUrl: '/?page=1',
            nextPageUrl: null,
            previousPageUrl: null,
          },
        },
      },
      {
        status: 404,
        description: 'No user exists with the given id',
        body: { message: 'User not found' },
      },
    ],
  },
  {
    method: 'GET',
    path: '/api/v1/users/:id/reviews',
    tag: 'Users',
    summary: "List a user's reviews, each with the embedded movie (paginated)",
    auth: false,
    queryParams: [
      { field: 'page', type: 'number', required: false, notes: 'Defaults to 1' },
      { field: 'perPage', type: 'number', required: false, notes: 'Defaults to 20, max 50' },
    ],
    responses: [
      {
        status: 200,
        description: 'Paginated list of reviews written by the user, most recent first',
        body: {
          data: [
            {
              id: 1,
              rating: 4.5,
              text: 'Great movie!',
              createdAt: '2026-07-20T16:42:18.000+00:00',
              updatedAt: '2026-07-20T16:42:18.000+00:00',
              user: { id: 1, fullName: 'Test User', avatarUrl: null, initials: 'TU' },
              movie: {
                id: 1,
                title: 'Test Movie',
                posterImageUrl: null,
                releaseYear: 2023,
                genres: [{ id: 1, name: 'Ação' }],
              },
            },
          ],
          metadata: {
            total: 1,
            perPage: 20,
            currentPage: 1,
            lastPage: 1,
            firstPage: 1,
            firstPageUrl: '/?page=1',
            lastPageUrl: '/?page=1',
            nextPageUrl: null,
            previousPageUrl: null,
          },
        },
      },
      {
        status: 404,
        description: 'No user exists with the given id',
        body: { message: 'User not found' },
      },
    ],
  },
]
