import vine from '@vinejs/vine'

const genreIds = () =>
  vine.array(vine.number().positive().exists({ table: 'genres', column: 'id' })).optional()

export const createMovieValidator = vine.create({
  title: vine.string().trim().minLength(1).maxLength(255),
  synopsis: vine.string().trim().minLength(1),
  posterImageUrl: vine.string().trim().url().optional(),
  bannerImageUrl: vine.string().trim().url().optional(),
  releaseYear: vine.number().min(1888).max(2100).optional(),
  durationMinutes: vine.number().positive().optional(),
  ageRating: vine.string().trim().maxLength(16).optional(),
  contentWarning: vine.string().trim().maxLength(255).optional(),
  cast: vine.string().trim().optional(),
  genreIds: genreIds(),
})

export const updateMovieValidator = vine.create({
  title: vine.string().trim().minLength(1).maxLength(255).optional(),
  synopsis: vine.string().trim().minLength(1).optional(),
  posterImageUrl: vine.string().trim().url().optional(),
  bannerImageUrl: vine.string().trim().url().optional(),
  releaseYear: vine.number().min(1888).max(2100).optional(),
  durationMinutes: vine.number().positive().optional(),
  ageRating: vine.string().trim().maxLength(16).optional(),
  contentWarning: vine.string().trim().maxLength(255).optional(),
  cast: vine.string().trim().optional(),
  genreIds: genreIds(),
})

export const movieSearchValidator = vine.create({
  q: vine.string().trim().optional(),
  genreIds: vine.array(vine.number().positive()).optional(),
  page: vine.number().min(1).optional(),
  perPage: vine.number().min(1).max(50).optional(),
})

export const featuredMoviesValidator = vine.create({
  count: vine.number().min(1).max(30).optional(),
})

export const attachMovieValidator = vine.create({
  movieId: vine.number().positive().exists({ table: 'movies', column: 'id' }),
})
