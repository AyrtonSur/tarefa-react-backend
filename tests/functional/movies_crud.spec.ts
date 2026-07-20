import { test } from '@japa/runner'
import { UserFactory } from '#database/factories/user_factory'
import { GenreFactory } from '#database/factories/genre_factory'
import { MovieFactory } from '#database/factories/movie_factory'

test.group('Movies CRUD', () => {
  test('creates a movie with genres when authenticated', async ({ client, assert }) => {
    const user = await UserFactory.create()
    const genre = await GenreFactory.create()

    const response = await client
      .post('/api/v1/movies')
      .loginAs(user)
      .json({
        title: 'New Movie',
        synopsis: 'A synopsis',
        genreIds: [genre.id],
      })

    response.assertStatus(200)
    response.assertBodyContains({ data: { title: 'New Movie' } })
    assert.lengthOf((response.body() as any).data.genres, 1)
  })

  test('cannot create a movie unauthenticated', async ({ client }) => {
    const response = await client.post('/api/v1/movies').json({ title: 'X', synopsis: 'Y' })
    response.assertStatus(401)
  })

  test('rejects an invalid movie payload', async ({ client }) => {
    const user = await UserFactory.create()

    const response = await client.post('/api/v1/movies').loginAs(user).json({ title: '' })
    response.assertStatus(422)
  })

  test('updates a movie', async ({ client }) => {
    const user = await UserFactory.create()
    const movie = await MovieFactory.create()

    const response = await client
      .put(`/api/v1/movies/${movie.id}`)
      .loginAs(user)
      .json({ title: 'Updated Title' })

    response.assertStatus(200)
    response.assertBodyContains({ data: { title: 'Updated Title' } })
  })

  test('deletes a movie', async ({ client }) => {
    const user = await UserFactory.create()
    const movie = await MovieFactory.create()

    const response = await client.delete(`/api/v1/movies/${movie.id}`).loginAs(user)
    response.assertStatus(204)
  })
})
