import type { HttpContext } from '@adonisjs/core/http'
import { paginationValidator } from '#validators/pagination'
import { attachMovieValidator } from '#validators/movie'
import MovieTransformer from '#transformers/movie_transformer'

export default class AccountFavoritesController {
  async index({ auth, request, serialize }: HttpContext) {
    const user = auth.getUserOrFail()
    const { page = 1, perPage = 20, search } = await request.validateUsing(paginationValidator)

    const query = user
      .related('favoriteMovies')
      .query()
      .preload('genres')
      .orderBy('favorites.created_at', 'desc')

    if (search) {
      query.whereILike('title', `%${search}%`)
    }

    const movies = await query.paginate(page, perPage)
    return serialize(MovieTransformer.paginate(movies.all(), movies.getMeta()))
  }

  async store({ auth, request, serialize }: HttpContext) {
    const user = auth.getUserOrFail()
    const { movieId } = await request.validateUsing(attachMovieValidator)

    const existing = await user
      .related('favoriteMovies')
      .query()
      .where('movies.id', movieId)
      .first()

    if (!existing) {
      await user.related('favoriteMovies').attach([movieId])
    }

    return serialize({ message: 'Movie added to favorites' })
  }

  async destroy({ auth, params, response }: HttpContext) {
    const user = auth.getUserOrFail()
    await user.related('favoriteMovies').detach([Number(params.movieId)])
    return response.noContent()
  }
}
