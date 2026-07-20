import { test } from '@japa/runner'
import { GenreFactory } from '#database/factories/genre_factory'
import { UserFactory } from '#database/factories/user_factory'

test.group('Genres', () => {
  test('list all genres', async ({ client, assert }) => {
    await GenreFactory.createMany(3)

    const response = await client.get('/api/v1/genres')

    response.assertStatus(200)
    assert.lengthOf((response.body() as any).data, 3)
  })

  test('show a single genre', async ({ client }) => {
    const genre = await GenreFactory.create()

    const response = await client.get(`/api/v1/genres/${genre.id}`)

    response.assertStatus(200)
    response.assertBodyContains({ data: { id: genre.id, name: genre.name } })
  })

  test('returns 404 for a missing genre', async ({ client }) => {
    const response = await client.get('/api/v1/genres/999999')
    response.assertStatus(404)
  })

  test('creates a genre when authenticated', async ({ client }) => {
    const user = await UserFactory.create()

    const response = await client.post('/api/v1/genres').loginAs(user).json({ name: 'Ação' })

    response.assertStatus(200)
    response.assertBodyContains({ data: { name: 'Ação' } })
  })

  test('cannot create a genre unauthenticated', async ({ client }) => {
    const response = await client.post('/api/v1/genres').json({ name: 'Ação' })
    response.assertStatus(401)
  })

  test('updates and deletes a genre when authenticated', async ({ client }) => {
    const user = await UserFactory.create()
    const genre = await GenreFactory.create()

    const updateResponse = await client
      .put(`/api/v1/genres/${genre.id}`)
      .loginAs(user)
      .json({ name: 'Updated Name' })
    updateResponse.assertStatus(200)
    updateResponse.assertBodyContains({ data: { name: 'Updated Name' } })

    const deleteResponse = await client.delete(`/api/v1/genres/${genre.id}`).loginAs(user)
    deleteResponse.assertStatus(204)
  })
})
