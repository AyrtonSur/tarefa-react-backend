import factory from '@adonisjs/lucid/factories'
import Review from '#models/review'
import { UserFactory } from '#database/factories/user_factory'
import { MovieFactory } from '#database/factories/movie_factory'

const RATINGS = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]

export const ReviewFactory = factory
  .define(Review, async ({ faker }) => {
    return {
      rating: faker.helpers.arrayElement(RATINGS),
      text: faker.lorem.sentence(),
    }
  })
  .relation('user', () => UserFactory)
  .relation('movie', () => MovieFactory)
  .build()
