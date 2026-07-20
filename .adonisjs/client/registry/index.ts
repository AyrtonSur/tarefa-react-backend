/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'docs.show': {
    methods: ["GET","HEAD"],
    pattern: '/docs',
    tokens: [{"old":"/docs","type":0,"val":"docs","end":""}],
    types: placeholder as Registry['docs.show']['types'],
  },
  'docs.json': {
    methods: ["GET","HEAD"],
    pattern: '/docs.json',
    tokens: [{"old":"/docs.json","type":0,"val":"docs.json","end":""}],
    types: placeholder as Registry['docs.json']['types'],
  },
  'auth.new_account.store': {
    methods: ["POST"],
    pattern: '/api/v1/auth/signup',
    tokens: [{"old":"/api/v1/auth/signup","type":0,"val":"api","end":""},{"old":"/api/v1/auth/signup","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/signup","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/signup","type":0,"val":"signup","end":""}],
    types: placeholder as Registry['auth.new_account.store']['types'],
  },
  'auth.access_tokens.store': {
    methods: ["POST"],
    pattern: '/api/v1/auth/login',
    tokens: [{"old":"/api/v1/auth/login","type":0,"val":"api","end":""},{"old":"/api/v1/auth/login","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/login","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['auth.access_tokens.store']['types'],
  },
  'profile.profile.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/account/profile',
    tokens: [{"old":"/api/v1/account/profile","type":0,"val":"api","end":""},{"old":"/api/v1/account/profile","type":0,"val":"v1","end":""},{"old":"/api/v1/account/profile","type":0,"val":"account","end":""},{"old":"/api/v1/account/profile","type":0,"val":"profile","end":""}],
    types: placeholder as Registry['profile.profile.show']['types'],
  },
  'profile.access_tokens.destroy': {
    methods: ["POST"],
    pattern: '/api/v1/account/logout',
    tokens: [{"old":"/api/v1/account/logout","type":0,"val":"api","end":""},{"old":"/api/v1/account/logout","type":0,"val":"v1","end":""},{"old":"/api/v1/account/logout","type":0,"val":"account","end":""},{"old":"/api/v1/account/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['profile.access_tokens.destroy']['types'],
  },
  'genres.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/genres',
    tokens: [{"old":"/api/v1/genres","type":0,"val":"api","end":""},{"old":"/api/v1/genres","type":0,"val":"v1","end":""},{"old":"/api/v1/genres","type":0,"val":"genres","end":""}],
    types: placeholder as Registry['genres.index']['types'],
  },
  'genres.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/genres/:id',
    tokens: [{"old":"/api/v1/genres/:id","type":0,"val":"api","end":""},{"old":"/api/v1/genres/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/genres/:id","type":0,"val":"genres","end":""},{"old":"/api/v1/genres/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['genres.show']['types'],
  },
  'movies.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/movies',
    tokens: [{"old":"/api/v1/movies","type":0,"val":"api","end":""},{"old":"/api/v1/movies","type":0,"val":"v1","end":""},{"old":"/api/v1/movies","type":0,"val":"movies","end":""}],
    types: placeholder as Registry['movies.index']['types'],
  },
  'movies.featured': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/movies/featured',
    tokens: [{"old":"/api/v1/movies/featured","type":0,"val":"api","end":""},{"old":"/api/v1/movies/featured","type":0,"val":"v1","end":""},{"old":"/api/v1/movies/featured","type":0,"val":"movies","end":""},{"old":"/api/v1/movies/featured","type":0,"val":"featured","end":""}],
    types: placeholder as Registry['movies.featured']['types'],
  },
  'movies.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/movies/:id',
    tokens: [{"old":"/api/v1/movies/:id","type":0,"val":"api","end":""},{"old":"/api/v1/movies/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/movies/:id","type":0,"val":"movies","end":""},{"old":"/api/v1/movies/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['movies.show']['types'],
  },
  'reviews.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/reviews',
    tokens: [{"old":"/api/v1/reviews","type":0,"val":"api","end":""},{"old":"/api/v1/reviews","type":0,"val":"v1","end":""},{"old":"/api/v1/reviews","type":0,"val":"reviews","end":""}],
    types: placeholder as Registry['reviews.index']['types'],
  },
  'reviews.random': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/reviews/random',
    tokens: [{"old":"/api/v1/reviews/random","type":0,"val":"api","end":""},{"old":"/api/v1/reviews/random","type":0,"val":"v1","end":""},{"old":"/api/v1/reviews/random","type":0,"val":"reviews","end":""},{"old":"/api/v1/reviews/random","type":0,"val":"random","end":""}],
    types: placeholder as Registry['reviews.random']['types'],
  },
  'reviews.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/reviews/:id',
    tokens: [{"old":"/api/v1/reviews/:id","type":0,"val":"api","end":""},{"old":"/api/v1/reviews/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/reviews/:id","type":0,"val":"reviews","end":""},{"old":"/api/v1/reviews/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['reviews.show']['types'],
  },
  'users.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/users/:id',
    tokens: [{"old":"/api/v1/users/:id","type":0,"val":"api","end":""},{"old":"/api/v1/users/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/users/:id","type":0,"val":"users","end":""},{"old":"/api/v1/users/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['users.show']['types'],
  },
  'user_favorites.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/users/:id/favorites',
    tokens: [{"old":"/api/v1/users/:id/favorites","type":0,"val":"api","end":""},{"old":"/api/v1/users/:id/favorites","type":0,"val":"v1","end":""},{"old":"/api/v1/users/:id/favorites","type":0,"val":"users","end":""},{"old":"/api/v1/users/:id/favorites","type":1,"val":"id","end":""},{"old":"/api/v1/users/:id/favorites","type":0,"val":"favorites","end":""}],
    types: placeholder as Registry['user_favorites.index']['types'],
  },
  'user_watched.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/users/:id/watched',
    tokens: [{"old":"/api/v1/users/:id/watched","type":0,"val":"api","end":""},{"old":"/api/v1/users/:id/watched","type":0,"val":"v1","end":""},{"old":"/api/v1/users/:id/watched","type":0,"val":"users","end":""},{"old":"/api/v1/users/:id/watched","type":1,"val":"id","end":""},{"old":"/api/v1/users/:id/watched","type":0,"val":"watched","end":""}],
    types: placeholder as Registry['user_watched.index']['types'],
  },
  'user_reviews.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/users/:id/reviews',
    tokens: [{"old":"/api/v1/users/:id/reviews","type":0,"val":"api","end":""},{"old":"/api/v1/users/:id/reviews","type":0,"val":"v1","end":""},{"old":"/api/v1/users/:id/reviews","type":0,"val":"users","end":""},{"old":"/api/v1/users/:id/reviews","type":1,"val":"id","end":""},{"old":"/api/v1/users/:id/reviews","type":0,"val":"reviews","end":""}],
    types: placeholder as Registry['user_reviews.index']['types'],
  },
  'genres.store': {
    methods: ["POST"],
    pattern: '/api/v1/genres',
    tokens: [{"old":"/api/v1/genres","type":0,"val":"api","end":""},{"old":"/api/v1/genres","type":0,"val":"v1","end":""},{"old":"/api/v1/genres","type":0,"val":"genres","end":""}],
    types: placeholder as Registry['genres.store']['types'],
  },
  'genres.update': {
    methods: ["PUT"],
    pattern: '/api/v1/genres/:id',
    tokens: [{"old":"/api/v1/genres/:id","type":0,"val":"api","end":""},{"old":"/api/v1/genres/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/genres/:id","type":0,"val":"genres","end":""},{"old":"/api/v1/genres/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['genres.update']['types'],
  },
  'genres.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/genres/:id',
    tokens: [{"old":"/api/v1/genres/:id","type":0,"val":"api","end":""},{"old":"/api/v1/genres/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/genres/:id","type":0,"val":"genres","end":""},{"old":"/api/v1/genres/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['genres.destroy']['types'],
  },
  'movies.store': {
    methods: ["POST"],
    pattern: '/api/v1/movies',
    tokens: [{"old":"/api/v1/movies","type":0,"val":"api","end":""},{"old":"/api/v1/movies","type":0,"val":"v1","end":""},{"old":"/api/v1/movies","type":0,"val":"movies","end":""}],
    types: placeholder as Registry['movies.store']['types'],
  },
  'movies.update': {
    methods: ["PUT"],
    pattern: '/api/v1/movies/:id',
    tokens: [{"old":"/api/v1/movies/:id","type":0,"val":"api","end":""},{"old":"/api/v1/movies/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/movies/:id","type":0,"val":"movies","end":""},{"old":"/api/v1/movies/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['movies.update']['types'],
  },
  'movies.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/movies/:id',
    tokens: [{"old":"/api/v1/movies/:id","type":0,"val":"api","end":""},{"old":"/api/v1/movies/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/movies/:id","type":0,"val":"movies","end":""},{"old":"/api/v1/movies/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['movies.destroy']['types'],
  },
  'reviews.store': {
    methods: ["POST"],
    pattern: '/api/v1/reviews',
    tokens: [{"old":"/api/v1/reviews","type":0,"val":"api","end":""},{"old":"/api/v1/reviews","type":0,"val":"v1","end":""},{"old":"/api/v1/reviews","type":0,"val":"reviews","end":""}],
    types: placeholder as Registry['reviews.store']['types'],
  },
  'reviews.update': {
    methods: ["PUT"],
    pattern: '/api/v1/reviews/:id',
    tokens: [{"old":"/api/v1/reviews/:id","type":0,"val":"api","end":""},{"old":"/api/v1/reviews/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/reviews/:id","type":0,"val":"reviews","end":""},{"old":"/api/v1/reviews/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['reviews.update']['types'],
  },
  'reviews.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/reviews/:id',
    tokens: [{"old":"/api/v1/reviews/:id","type":0,"val":"api","end":""},{"old":"/api/v1/reviews/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/reviews/:id","type":0,"val":"reviews","end":""},{"old":"/api/v1/reviews/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['reviews.destroy']['types'],
  },
  'account.account_favorites.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/account/favorites',
    tokens: [{"old":"/api/v1/account/favorites","type":0,"val":"api","end":""},{"old":"/api/v1/account/favorites","type":0,"val":"v1","end":""},{"old":"/api/v1/account/favorites","type":0,"val":"account","end":""},{"old":"/api/v1/account/favorites","type":0,"val":"favorites","end":""}],
    types: placeholder as Registry['account.account_favorites.index']['types'],
  },
  'account.account_favorites.store': {
    methods: ["POST"],
    pattern: '/api/v1/account/favorites',
    tokens: [{"old":"/api/v1/account/favorites","type":0,"val":"api","end":""},{"old":"/api/v1/account/favorites","type":0,"val":"v1","end":""},{"old":"/api/v1/account/favorites","type":0,"val":"account","end":""},{"old":"/api/v1/account/favorites","type":0,"val":"favorites","end":""}],
    types: placeholder as Registry['account.account_favorites.store']['types'],
  },
  'account.account_favorites.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/account/favorites/:movieId',
    tokens: [{"old":"/api/v1/account/favorites/:movieId","type":0,"val":"api","end":""},{"old":"/api/v1/account/favorites/:movieId","type":0,"val":"v1","end":""},{"old":"/api/v1/account/favorites/:movieId","type":0,"val":"account","end":""},{"old":"/api/v1/account/favorites/:movieId","type":0,"val":"favorites","end":""},{"old":"/api/v1/account/favorites/:movieId","type":1,"val":"movieId","end":""}],
    types: placeholder as Registry['account.account_favorites.destroy']['types'],
  },
  'account.account_watched.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/account/watched',
    tokens: [{"old":"/api/v1/account/watched","type":0,"val":"api","end":""},{"old":"/api/v1/account/watched","type":0,"val":"v1","end":""},{"old":"/api/v1/account/watched","type":0,"val":"account","end":""},{"old":"/api/v1/account/watched","type":0,"val":"watched","end":""}],
    types: placeholder as Registry['account.account_watched.index']['types'],
  },
  'account.account_watched.store': {
    methods: ["POST"],
    pattern: '/api/v1/account/watched',
    tokens: [{"old":"/api/v1/account/watched","type":0,"val":"api","end":""},{"old":"/api/v1/account/watched","type":0,"val":"v1","end":""},{"old":"/api/v1/account/watched","type":0,"val":"account","end":""},{"old":"/api/v1/account/watched","type":0,"val":"watched","end":""}],
    types: placeholder as Registry['account.account_watched.store']['types'],
  },
  'account.account_watched.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/account/watched/:movieId',
    tokens: [{"old":"/api/v1/account/watched/:movieId","type":0,"val":"api","end":""},{"old":"/api/v1/account/watched/:movieId","type":0,"val":"v1","end":""},{"old":"/api/v1/account/watched/:movieId","type":0,"val":"account","end":""},{"old":"/api/v1/account/watched/:movieId","type":0,"val":"watched","end":""},{"old":"/api/v1/account/watched/:movieId","type":1,"val":"movieId","end":""}],
    types: placeholder as Registry['account.account_watched.destroy']['types'],
  },
  'account.account_reviews.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/account/reviews',
    tokens: [{"old":"/api/v1/account/reviews","type":0,"val":"api","end":""},{"old":"/api/v1/account/reviews","type":0,"val":"v1","end":""},{"old":"/api/v1/account/reviews","type":0,"val":"account","end":""},{"old":"/api/v1/account/reviews","type":0,"val":"reviews","end":""}],
    types: placeholder as Registry['account.account_reviews.index']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
