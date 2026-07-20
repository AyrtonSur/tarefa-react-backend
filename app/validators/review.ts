import vine from '@vinejs/vine'

/**
 * Half-star increments only, 0.5 to 5.0 (VineJS has no step/multipleOf rule for numbers).
 */
const rating = () => vine.number().in([0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5])

export const createReviewValidator = vine.create({
  movieId: vine.number().positive().exists({ table: 'movies', column: 'id' }),
  rating: rating(),
  text: vine.string().trim().minLength(1).maxLength(2000),
})

export const updateReviewValidator = vine.create({
  rating: rating(),
  text: vine.string().trim().minLength(1).maxLength(2000),
})

export const reviewListValidator = vine.create({
  movieId: vine.number().positive().optional(),
  page: vine.number().min(1).optional(),
  perPage: vine.number().min(1).max(50).optional(),
})

export const randomReviewsValidator = vine.create({
  count: vine.number().min(1).max(30).optional(),
})
