import Genre from '#models/genre'
import { createGenreValidator, updateGenreValidator } from '#validators/genre'
import type { HttpContext } from '@adonisjs/core/http'
import GenreTransformer from '#transformers/genre_transformer'

export default class GenresController {
  async index({ serialize }: HttpContext) {
    const genres = await Genre.query().orderBy('name')
    return serialize(GenreTransformer.transform(genres))
  }

  async show({ params, serialize }: HttpContext) {
    const genre = await Genre.findOrFail(params.id)
    return serialize(GenreTransformer.transform(genre))
  }

  async store({ request, serialize }: HttpContext) {
    const { name } = await request.validateUsing(createGenreValidator)
    const genre = await Genre.create({ name })
    return serialize(GenreTransformer.transform(genre))
  }

  async update({ params, request, serialize }: HttpContext) {
    const genre = await Genre.findOrFail(params.id)
    const { name } = await request.validateUsing(updateGenreValidator)
    genre.name = name
    await genre.save()
    return serialize(GenreTransformer.transform(genre))
  }

  async destroy({ params, response }: HttpContext) {
    const genre = await Genre.findOrFail(params.id)
    await genre.delete()
    return response.noContent()
  }
}
