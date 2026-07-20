import { test } from '@japa/runner'
import { UserFactory } from '#database/factories/user_factory'
import { MovieFactory } from '#database/factories/movie_factory'

test.group('Account favorites', () => {
  test('adds, lists and removes a favorite', async ({ client, assert }) => {
    const user = await UserFactory.create()
    const movie = await MovieFactory.create()

    const addResponse = await client
      .post('/api/v1/account/favorites')
      .loginAs(user)
      .json({ movieId: movie.id })
    addResponse.assertStatus(200)

    const listResponse = await client.get('/api/v1/account/favorites').loginAs(user)
    listResponse.assertStatus(200)
    assert.lengthOf((listResponse.body() as any).data, 1)

    const removeResponse = await client
      .delete(`/api/v1/account/favorites/${movie.id}`)
      .loginAs(user)
    removeResponse.assertStatus(204)

    const listAfterRemove = await client.get('/api/v1/account/favorites').loginAs(user)
    assert.lengthOf((listAfterRemove.body() as any).data, 0)
  })

  test('adding the same favorite twice is idempotent', async ({ client, assert }) => {
    const user = await UserFactory.create()
    const movie = await MovieFactory.create()

    await client.post('/api/v1/account/favorites').loginAs(user).json({ movieId: movie.id })
    const secondResponse = await client
      .post('/api/v1/account/favorites')
      .loginAs(user)
      .json({ movieId: movie.id })
    secondResponse.assertStatus(200)

    const listResponse = await client.get('/api/v1/account/favorites').loginAs(user)
    assert.lengthOf((listResponse.body() as any).data, 1)
  })

  test('filters favorites by movie title', async ({ client, assert }) => {
    const user = await UserFactory.create()
    const movieA = await MovieFactory.merge({ title: 'Alpha Movie' }).create()
    const movieB = await MovieFactory.merge({ title: 'Beta Movie' }).create()

    await client.post('/api/v1/account/favorites').loginAs(user).json({ movieId: movieA.id })
    await client.post('/api/v1/account/favorites').loginAs(user).json({ movieId: movieB.id })

    const response = await client
      .get('/api/v1/account/favorites')
      .qs({ search: 'Alpha' })
      .loginAs(user)

    assert.lengthOf((response.body() as any).data, 1)
    assert.equal((response.body() as any).data[0].id, movieA.id)
  })

  test('requires authentication', async ({ client }) => {
    const response = await client.get('/api/v1/account/favorites')
    response.assertStatus(401)
  })
})
