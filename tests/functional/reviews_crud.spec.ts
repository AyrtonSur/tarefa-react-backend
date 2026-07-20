import { test } from '@japa/runner'
import { UserFactory } from '#database/factories/user_factory'
import { MovieFactory } from '#database/factories/movie_factory'
import { ReviewFactory } from '#database/factories/review_factory'
import Review from '#models/review'

test.group('Reviews CRUD', () => {
  test('posting twice for the same movie updates the same review (upsert)', async ({
    client,
    assert,
  }) => {
    const user = await UserFactory.create()
    const movie = await MovieFactory.create()

    const firstResponse = await client
      .post('/api/v1/reviews')
      .loginAs(user)
      .json({ movieId: movie.id, rating: 4, text: 'Good movie' })
    firstResponse.assertStatus(200)

    const secondResponse = await client
      .post('/api/v1/reviews')
      .loginAs(user)
      .json({ movieId: movie.id, rating: 5, text: 'Actually great' })
    secondResponse.assertStatus(200)

    const reviews = await Review.query().where('userId', user.id).where('movieId', movie.id)
    assert.lengthOf(reviews, 1)
    assert.equal(reviews[0].rating, 5)
  })

  test('rejects an invalid half-star rating', async ({ client }) => {
    const user = await UserFactory.create()
    const movie = await MovieFactory.create()

    const response = await client
      .post('/api/v1/reviews')
      .loginAs(user)
      .json({ movieId: movie.id, rating: 0.7, text: 'Bad rating' })

    response.assertStatus(422)
  })

  test('owner can update their review', async ({ client }) => {
    const user = await UserFactory.create()
    const movie = await MovieFactory.create()
    const review = await ReviewFactory.merge({ userId: user.id, movieId: movie.id }).create()

    const response = await client
      .put(`/api/v1/reviews/${review.id}`)
      .loginAs(user)
      .json({ rating: 3, text: 'Updated text' })

    response.assertStatus(200)
    response.assertBodyContains({ data: { rating: 3, text: 'Updated text' } })
  })

  test("another user cannot update someone else's review", async ({ client }) => {
    const owner = await UserFactory.create()
    const intruder = await UserFactory.create()
    const movie = await MovieFactory.create()
    const review = await ReviewFactory.merge({ userId: owner.id, movieId: movie.id }).create()

    const response = await client
      .put(`/api/v1/reviews/${review.id}`)
      .loginAs(intruder)
      .json({ rating: 1, text: 'hijack' })

    response.assertStatus(403)
  })

  test("another user cannot delete someone else's review", async ({ client }) => {
    const owner = await UserFactory.create()
    const intruder = await UserFactory.create()
    const movie = await MovieFactory.create()
    const review = await ReviewFactory.merge({ userId: owner.id, movieId: movie.id }).create()

    const response = await client.delete(`/api/v1/reviews/${review.id}`).loginAs(intruder)
    response.assertStatus(403)
  })

  test('owner can delete their review', async ({ client }) => {
    const user = await UserFactory.create()
    const movie = await MovieFactory.create()
    const review = await ReviewFactory.merge({ userId: user.id, movieId: movie.id }).create()

    const response = await client.delete(`/api/v1/reviews/${review.id}`).loginAs(user)
    response.assertStatus(204)
  })
})
