import Movie from '#models/movie'
import db from '@adonisjs/lucid/services/db'
import {
  createMovieValidator,
  updateMovieValidator,
  movieSearchValidator,
  featuredMoviesValidator,
} from '#validators/movie'
import type { HttpContext } from '@adonisjs/core/http'
import MovieTransformer from '#transformers/movie_transformer'

export default class MoviesController {
  async index({ request, serialize }: HttpContext) {
    const {
      q,
      genreIds,
      page = 1,
      perPage = 20,
    } = await request.validateUsing(movieSearchValidator)

    const query = Movie.query().preload('genres').orderBy('title')

    if (q) {
      query.whereILike('title', `%${q}%`)
    }

    if (genreIds && genreIds.length > 0) {
      query.whereHas('genres', (genreQuery) => genreQuery.whereIn('genres.id', genreIds))
    }

    const movies = await query.paginate(page, perPage)
    return serialize(MovieTransformer.paginate(movies.all(), movies.getMeta()))
  }

  async featured({ request, serialize }: HttpContext) {
    const { count = 10 } = await request.validateUsing(featuredMoviesValidator)
    const movies = await Movie.query().preload('genres').orderByRaw('RANDOM()').limit(count)
    return serialize(MovieTransformer.transform(movies))
  }

  async show({ params, auth, response, serialize }: HttpContext) {
    const movie = await Movie.query().where('id', params.id).preload('genres').first()
    if (!movie) {
      return response.notFound({ message: 'Movie not found' })
    }

    const stats = await db
      .from('reviews')
      .where('movie_id', movie.id)
      .avg('rating as avg')
      .count('* as count')
      .first()

    let isFavorite = false
    let isWatched = false

    const user = auth.user
    if (user) {
      const favorite = await user
        .related('favoriteMovies')
        .query()
        .where('movies.id', movie.id)
        .first()
      const watched = await user
        .related('watchedMovies')
        .query()
        .where('movies.id', movie.id)
        .first()
      isFavorite = Boolean(favorite)
      isWatched = Boolean(watched)
    }

    return serialize(
      MovieTransformer.transform(movie, {
        avgRating: stats?.avg !== null && stats?.avg !== undefined ? Number(stats.avg) : null,
        reviewCount: Number(stats?.count ?? 0),
        isFavorite,
        isWatched,
      }).useVariant('toDetail')
    )
  }

  async store({ request, serialize }: HttpContext) {
    const { genreIds, ...data } = await request.validateUsing(createMovieValidator)
    const movie = await Movie.create(data)
    if (genreIds && genreIds.length > 0) {
      await movie.related('genres').attach(genreIds)
    }
    await movie.load('genres')
    return serialize(MovieTransformer.transform(movie).useVariant('toDetail'))
  }

  async update({ params, request, serialize }: HttpContext) {
    const movie = await Movie.findOrFail(params.id)
    const { genreIds, ...data } = await request.validateUsing(updateMovieValidator)
    movie.merge(data)
    await movie.save()
    if (genreIds) {
      await movie.related('genres').sync(genreIds)
    }
    await movie.load('genres')
    return serialize(MovieTransformer.transform(movie).useVariant('toDetail'))
  }

  async destroy({ params, response }: HttpContext) {
    const movie = await Movie.findOrFail(params.id)
    await movie.delete()
    return response.noContent()
  }
}
