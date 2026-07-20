import factory from '@adonisjs/lucid/factories'
import Genre from '#models/genre'

export const GenreFactory = factory
  .define(Genre, async ({ faker }) => {
    return {
      name: `${faker.word.adjective()} ${faker.string.uuid().slice(0, 8)}`,
    }
  })
  .build()
