import { test } from '@japa/runner'
import { MovieFactory } from '#database/factories/movie_factory'
import { GenreFactory } from '#database/factories/genre_factory'

test.group('Movies search', () => {
  test('filters movies by title', async ({ client, assert }) => {
    await MovieFactory.merge({ title: 'The Great Escape' }).create()
    const target = await MovieFactory.merge({ title: 'Space Odyssey' }).create()

    const response = await client.get('/api/v1/movies').qs({ q: 'Space' })

    response.assertStatus(200)
    const titles = (response.body() as any).data.map((movie: any) => movie.id)
    assert.deepEqual(titles, [target.id])
  })

  test('filters movies by genre', async ({ client, assert }) => {
    const genreA = await GenreFactory.create()
    const genreB = await GenreFactory.create()

    const movieA = await MovieFactory.create()
    await movieA.related('genres').attach([genreA.id])

    const movieB = await MovieFactory.create()
    await movieB.related('genres').attach([genreB.id])

    const response = await client.get(`/api/v1/movies?genreIds[]=${genreA.id}`)

    response.assertStatus(200)
    const ids = (response.body() as any).data.map((movie: any) => movie.id)
    assert.deepEqual(ids, [movieA.id])
  })

  test('rejects perPage above the allowed maximum', async ({ client }) => {
    const response = await client.get('/api/v1/movies').qs({ perPage: 999 })
    response.assertStatus(422)
  })
})
