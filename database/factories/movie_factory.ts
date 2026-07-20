import factory from '@adonisjs/lucid/factories'
import Movie from '#models/movie'
import { GenreFactory } from '#database/factories/genre_factory'

export const MovieFactory = factory
  .define(Movie, async ({ faker }) => {
    return {
      title: faker.lorem.words(3),
      synopsis: faker.lorem.paragraph(),
      posterImageUrl: faker.image.url(),
      bannerImageUrl: faker.image.url(),
      releaseYear: faker.number.int({ min: 1980, max: 2025 }),
      durationMinutes: faker.number.int({ min: 80, max: 180 }),
      ageRating: faker.helpers.arrayElement(['L', '10', '12', '14', '16', '18']),
      contentWarning: null,
      cast: `${faker.person.fullName()}, ${faker.person.fullName()}`,
    }
  })
  .relation('genres', () => GenreFactory)
  .build()
