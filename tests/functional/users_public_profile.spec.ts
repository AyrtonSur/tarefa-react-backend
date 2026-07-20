import { test } from '@japa/runner'
import { UserFactory } from '#database/factories/user_factory'
import { MovieFactory } from '#database/factories/movie_factory'
import { ReviewFactory } from '#database/factories/review_factory'

test.group('Users public profile', () => {
  test('shows public fields without email', async ({ client, assert }) => {
    const user = await UserFactory.create()

    const response = await client.get(`/api/v1/users/${user.id}`)

    response.assertStatus(200)
    response.assertBodyContains({ data: { id: user.id, fullName: user.fullName } })
    assert.notProperty((response.body() as any).data, 'email')
  })

  test("lists a user's favorites, watched movies and reviews", async ({ client, assert }) => {
    const user = await UserFactory.create()
    const favoriteMovie = await MovieFactory.create()
    const watchedMovie = await MovieFactory.create()
    const reviewedMovie = await MovieFactory.create()

    await client.post('/api/v1/account/favorites').loginAs(user).json({ movieId: favoriteMovie.id })
    await client.post('/api/v1/account/watched').loginAs(user).json({ movieId: watchedMovie.id })
    await ReviewFactory.merge({ userId: user.id, movieId: reviewedMovie.id }).create()

    const favoritesResponse = await client.get(`/api/v1/users/${user.id}/favorites`)
    favoritesResponse.assertStatus(200)
    assert.lengthOf((favoritesResponse.body() as any).data, 1)

    const watchedResponse = await client.get(`/api/v1/users/${user.id}/watched`)
    watchedResponse.assertStatus(200)
    assert.lengthOf((watchedResponse.body() as any).data, 1)

    const reviewsResponse = await client.get(`/api/v1/users/${user.id}/reviews`)
    reviewsResponse.assertStatus(200)
    assert.lengthOf((reviewsResponse.body() as any).data, 1)
    assert.equal((reviewsResponse.body() as any).data[0].movie.id, reviewedMovie.id)
  })

  test('returns 404 for a missing user', async ({ client }) => {
    const response = await client.get('/api/v1/users/999999')
    response.assertStatus(404)
  })
})
