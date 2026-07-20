import Review from '#models/review'
import {
  createReviewValidator,
  updateReviewValidator,
  reviewListValidator,
  randomReviewsValidator,
} from '#validators/review'
import type { HttpContext } from '@adonisjs/core/http'
import ReviewTransformer from '#transformers/review_transformer'

export default class ReviewsController {
  async index({ request, serialize }: HttpContext) {
    const { movieId, page = 1, perPage = 20 } = await request.validateUsing(reviewListValidator)

    const query = Review.query()
      .preload('user')
      .preload('movie', (movieQuery) => movieQuery.preload('genres'))
      .orderBy('created_at', 'desc')

    if (movieId) {
      query.where('movieId', movieId)
    }

    const reviews = await query.paginate(page, perPage)
    return serialize(ReviewTransformer.paginate(reviews.all(), reviews.getMeta()))
  }

  async random({ request, serialize }: HttpContext) {
    const { count = 10 } = await request.validateUsing(randomReviewsValidator)
    const reviews = await Review.query()
      .preload('user')
      .preload('movie', (movieQuery) => movieQuery.preload('genres'))
      .orderByRaw('RANDOM()')
      .limit(count)

    return serialize(ReviewTransformer.transform(reviews))
  }

  async show({ params, response, serialize }: HttpContext) {
    const review = await Review.query()
      .where('id', params.id)
      .preload('user')
      .preload('movie', (movieQuery) => movieQuery.preload('genres'))
      .first()

    if (!review) {
      return response.notFound({ message: 'Review not found' })
    }

    return serialize(ReviewTransformer.transform(review))
  }

  async store({ auth, request, serialize }: HttpContext) {
    const user = auth.getUserOrFail()
    const { movieId, rating, text } = await request.validateUsing(createReviewValidator)

    const review = await Review.updateOrCreate({ userId: user.id, movieId }, { rating, text })
    await review.load('user')
    await review.load('movie', (movieQuery) => movieQuery.preload('genres'))

    return serialize(ReviewTransformer.transform(review))
  }

  async update({ params, auth, request, response, serialize }: HttpContext) {
    const user = auth.getUserOrFail()
    const review = await Review.findOrFail(params.id)

    if (review.userId !== user.id) {
      return response.forbidden({ message: 'You can only edit your own reviews' })
    }

    const { rating, text } = await request.validateUsing(updateReviewValidator)
    review.merge({ rating, text })
    await review.save()
    await review.load('user')
    await review.load('movie', (movieQuery) => movieQuery.preload('genres'))

    return serialize(ReviewTransformer.transform(review))
  }

  async destroy({ params, auth, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const review = await Review.findOrFail(params.id)

    if (review.userId !== user.id) {
      return response.forbidden({ message: 'You can only delete your own reviews' })
    }

    await review.delete()
    return response.noContent()
  }
}
