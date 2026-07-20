import { test } from '@japa/runner'
import { UserFactory } from '#database/factories/user_factory'
import { MovieFactory } from '#database/factories/movie_factory'
import { ReviewFactory } from '#database/factories/review_factory'

test.group('Account reviews', () => {
  test('lists only the current user reviews, with the movie embedded', async ({
    client,
    assert,
  }) => {
    const user = await UserFactory.create()
    const otherUser = await UserFactory.create()
    const movie = await MovieFactory.create()
    const otherMovie = await MovieFactory.create()

    await ReviewFactory.merge({ userId: user.id, movieId: movie.id }).create()
    await ReviewFactory.merge({ userId: otherUser.id, movieId: otherMovie.id }).create()

    const response = await client.get('/api/v1/account/reviews').loginAs(user)

    response.assertStatus(200)
    assert.lengthOf((response.body() as any).data, 1)
    assert.equal((response.body() as any).data[0].movie.id, movie.id)
  })

  test('requires authentication', async ({ client }) => {
    const response = await client.get('/api/v1/account/reviews')
    response.assertStatus(401)
  })
})
