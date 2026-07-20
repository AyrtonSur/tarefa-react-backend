import { test } from '@japa/runner'
import { MovieFactory } from '#database/factories/movie_factory'
import { UserFactory } from '#database/factories/user_factory'

test.group('Movie detail', () => {
  test('shows favorite/watched as false when unauthenticated', async ({ client }) => {
    const movie = await MovieFactory.create()

    const response = await client.get(`/api/v1/movies/${movie.id}`)

    response.assertStatus(200)
    response.assertBodyContains({ data: { id: movie.id, isFavorite: false, isWatched: false } })
  })

  test('shows isFavorite true after favoriting', async ({ client }) => {
    const user = await UserFactory.create()
    const movie = await MovieFactory.create()

    await client.post('/api/v1/account/favorites').loginAs(user).json({ movieId: movie.id })

    const response = await client.get(`/api/v1/movies/${movie.id}`).loginAs(user)

    response.assertStatus(200)
    response.assertBodyContains({ data: { isFavorite: true } })
  })

  test('returns 404 for a missing movie', async ({ client }) => {
    const response = await client.get('/api/v1/movies/999999')
    response.assertStatus(404)
  })
})
