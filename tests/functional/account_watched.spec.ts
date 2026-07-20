import { test } from '@japa/runner'
import { UserFactory } from '#database/factories/user_factory'
import { MovieFactory } from '#database/factories/movie_factory'

test.group('Account watched', () => {
  test('marks, lists and unmarks a movie as watched', async ({ client, assert }) => {
    const user = await UserFactory.create()
    const movie = await MovieFactory.create()

    const addResponse = await client
      .post('/api/v1/account/watched')
      .loginAs(user)
      .json({ movieId: movie.id })
    addResponse.assertStatus(200)

    const listResponse = await client.get('/api/v1/account/watched').loginAs(user)
    listResponse.assertStatus(200)
    assert.lengthOf((listResponse.body() as any).data, 1)

    const removeResponse = await client.delete(`/api/v1/account/watched/${movie.id}`).loginAs(user)
    removeResponse.assertStatus(204)

    const listAfterRemove = await client.get('/api/v1/account/watched').loginAs(user)
    assert.lengthOf((listAfterRemove.body() as any).data, 0)
  })

  test('marking the same movie twice is idempotent', async ({ client, assert }) => {
    const user = await UserFactory.create()
    const movie = await MovieFactory.create()

    await client.post('/api/v1/account/watched').loginAs(user).json({ movieId: movie.id })
    const secondResponse = await client
      .post('/api/v1/account/watched')
      .loginAs(user)
      .json({ movieId: movie.id })
    secondResponse.assertStatus(200)

    const listResponse = await client.get('/api/v1/account/watched').loginAs(user)
    assert.lengthOf((listResponse.body() as any).data, 1)
  })

  test('requires authentication', async ({ client }) => {
    const response = await client.get('/api/v1/account/watched')
    response.assertStatus(401)
  })
})
