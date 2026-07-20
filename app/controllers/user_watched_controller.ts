import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import { paginationValidator } from '#validators/pagination'
import MovieTransformer from '#transformers/movie_transformer'

export default class UserWatchedController {
  async index({ params, request, response, serialize }: HttpContext) {
    const user = await User.find(params.id)
    if (!user) {
      return response.notFound({ message: 'User not found' })
    }

    const { page = 1, perPage = 20 } = await request.validateUsing(paginationValidator)
    const movies = await user
      .related('watchedMovies')
      .query()
      .preload('genres')
      .orderBy('watched_movies.created_at', 'desc')
      .paginate(page, perPage)

    return serialize(MovieTransformer.paginate(movies.all(), movies.getMeta()))
  }
}
