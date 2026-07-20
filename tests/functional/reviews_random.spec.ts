import { test } from '@japa/runner'
import { UserFactory } from '#database/factories/user_factory'
import { MovieFactory } from '#database/factories/movie_factory'
import { ReviewFactory } from '#database/factories/review_factory'

test.group('Random reviews', () => {
  test('lists reviews for the movie via ?movieId=', async ({ client, assert }) => {
    const user = await UserFactory.create()
    const movie = await MovieFactory.create()
    const otherMovie = await MovieFactory.create()
    await ReviewFactory.merge({ userId: user.id, movieId: movie.id }).create()

    const otherUser = await UserFactory.create()
    await ReviewFactory.merge({ userId: otherUser.id, movieId: otherMovie.id }).create()

    const response = await client.get('/api/v1/reviews').qs({ movieId: movie.id })

    response.assertStatus(200)
    assert.lengthOf((response.body() as any).data, 1)
    assert.equal((response.body() as any).data[0].movie.id, movie.id)
  })

  test('returns a bounded number of random reviews', async ({ client, assert }) => {
    const user = await UserFactory.create()
    const movies = await MovieFactory.createMany(3)
    for (const movie of movies) {
      await ReviewFactory.merge({ userId: user.id, movieId: movie.id }).create()
    }

    const response = await client.get('/api/v1/reviews/random').qs({ count: 2 })

    response.assertStatus(200)
    assert.isAtMost((response.body() as any).data.length, 2)
  })
})
