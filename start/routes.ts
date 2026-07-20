/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
import { controllers } from '#generated/controllers'

router.get('/', () => {
  return { hello: 'world' }
})

router
  .group(() => {
    router
      .group(() => {
        router.post('signup', [controllers.NewAccount, 'store'])
        router.post('login', [controllers.AccessTokens, 'store'])
      })
      .prefix('auth')
      .as('auth')

    router
      .group(() => {
        router.get('profile', [controllers.Profile, 'show'])
        router.post('logout', [controllers.AccessTokens, 'destroy'])
      })
      .prefix('account')
      .as('profile')
      .use(middleware.auth())

    router.get('genres', [controllers.Genres, 'index'])
    router.get('genres/:id', [controllers.Genres, 'show'])

    router.get('movies', [controllers.Movies, 'index'])
    router.get('movies/featured', [controllers.Movies, 'featured'])
    router.get('movies/:id', [controllers.Movies, 'show'])

    router.get('reviews', [controllers.Reviews, 'index'])
    router.get('reviews/random', [controllers.Reviews, 'random'])
    router.get('reviews/:id', [controllers.Reviews, 'show'])

    router.get('users/:id', [controllers.Users, 'show'])
    router.get('users/:id/favorites', [controllers.UserFavorites, 'index'])
    router.get('users/:id/watched', [controllers.UserWatched, 'index'])
    router.get('users/:id/reviews', [controllers.UserReviews, 'index'])

    router
      .group(() => {
        router.post('genres', [controllers.Genres, 'store'])
        router.put('genres/:id', [controllers.Genres, 'update'])
        router.delete('genres/:id', [controllers.Genres, 'destroy'])

        router.post('movies', [controllers.Movies, 'store'])
        router.put('movies/:id', [controllers.Movies, 'update'])
        router.delete('movies/:id', [controllers.Movies, 'destroy'])

        router.post('reviews', [controllers.Reviews, 'store'])
        router.put('reviews/:id', [controllers.Reviews, 'update'])
        router.delete('reviews/:id', [controllers.Reviews, 'destroy'])
      })
      .use(middleware.auth())

    router
      .group(() => {
        router.get('favorites', [controllers.AccountFavorites, 'index'])
        router.post('favorites', [controllers.AccountFavorites, 'store'])
        router.delete('favorites/:movieId', [controllers.AccountFavorites, 'destroy'])

        router.get('watched', [controllers.AccountWatched, 'index'])
        router.post('watched', [controllers.AccountWatched, 'store'])
        router.delete('watched/:movieId', [controllers.AccountWatched, 'destroy'])

        router.get('reviews', [controllers.AccountReviews, 'index'])
      })
      .prefix('account')
      .as('account')
      .use(middleware.auth())
  })
  .prefix('/api/v1')
