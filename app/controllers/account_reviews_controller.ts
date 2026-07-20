import type { HttpContext } from '@adonisjs/core/http'
import { paginationValidator } from '#validators/pagination'
import ReviewTransformer from '#transformers/review_transformer'

export default class AccountReviewsController {
  async index({ auth, request, serialize }: HttpContext) {
    const user = auth.getUserOrFail()
    const { page = 1, perPage = 20 } = await request.validateUsing(paginationValidator)

    const reviews = await user
      .related('reviews')
      .query()
      .preload('user')
      .preload('movie', (movieQuery) => movieQuery.preload('genres'))
      .orderBy('created_at', 'desc')
      .paginate(page, perPage)

    return serialize(ReviewTransformer.paginate(reviews.all(), reviews.getMeta()))
  }
}
