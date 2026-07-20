/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type { ExtractBody, ExtractErrorResponse, ExtractQuery, ExtractQueryForGet, ExtractResponse } from '@tuyau/core/types'
import type { InferInput, SimpleError } from '@vinejs/vine/types'

export type ParamValue = string | number | bigint | boolean

export interface Registry {
  'docs.show': {
    methods: ["GET","HEAD"]
    pattern: '/docs'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/docs_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/docs_controller').default['show']>>>
    }
  }
  'docs.json': {
    methods: ["GET","HEAD"]
    pattern: '/docs.json'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/docs_controller').default['json']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/docs_controller').default['json']>>>
    }
  }
  'auth.new_account.store': {
    methods: ["POST"]
    pattern: '/api/v1/auth/signup'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user').signupValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/user').signupValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/new_account_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/new_account_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'auth.access_tokens.store': {
    methods: ["POST"]
    pattern: '/api/v1/auth/login'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user').loginValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/user').loginValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/access_tokens_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/access_tokens_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'profile.profile.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/account/profile'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/profile_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/profile_controller').default['show']>>>
    }
  }
  'profile.access_tokens.destroy': {
    methods: ["POST"]
    pattern: '/api/v1/account/logout'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/access_tokens_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/access_tokens_controller').default['destroy']>>>
    }
  }
  'genres.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/genres'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/genres_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/genres_controller').default['index']>>>
    }
  }
  'genres.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/genres/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/genres_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/genres_controller').default['show']>>>
    }
  }
  'movies.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/movies'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#validators/movie').movieSearchValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/movies_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/movies_controller').default['index']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'movies.featured': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/movies/featured'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#validators/movie').featuredMoviesValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/movies_controller').default['featured']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/movies_controller').default['featured']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'movies.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/movies/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/movies_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/movies_controller').default['show']>>>
    }
  }
  'reviews.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/reviews'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#validators/review').reviewListValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/reviews_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/reviews_controller').default['index']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'reviews.random': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/reviews/random'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#validators/review').randomReviewsValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/reviews_controller').default['random']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/reviews_controller').default['random']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'reviews.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/reviews/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/reviews_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/reviews_controller').default['show']>>>
    }
  }
  'users.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/users/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/users_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/users_controller').default['show']>>>
    }
  }
  'user_favorites.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/users/:id/favorites'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQueryForGet<InferInput<(typeof import('#validators/pagination').paginationValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/user_favorites_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/user_favorites_controller').default['index']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'user_watched.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/users/:id/watched'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQueryForGet<InferInput<(typeof import('#validators/pagination').paginationValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/user_watched_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/user_watched_controller').default['index']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'user_reviews.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/users/:id/reviews'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQueryForGet<InferInput<(typeof import('#validators/pagination').paginationValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/user_reviews_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/user_reviews_controller').default['index']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'genres.store': {
    methods: ["POST"]
    pattern: '/api/v1/genres'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/genre').createGenreValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/genre').createGenreValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/genres_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/genres_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'genres.update': {
    methods: ["PUT"]
    pattern: '/api/v1/genres/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/genre').updateGenreValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/genre').updateGenreValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/genres_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/genres_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'genres.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/genres/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/genres_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/genres_controller').default['destroy']>>>
    }
  }
  'movies.store': {
    methods: ["POST"]
    pattern: '/api/v1/movies'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/movie').createMovieValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/movie').createMovieValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/movies_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/movies_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'movies.update': {
    methods: ["PUT"]
    pattern: '/api/v1/movies/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/movie').updateMovieValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/movie').updateMovieValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/movies_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/movies_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'movies.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/movies/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/movies_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/movies_controller').default['destroy']>>>
    }
  }
  'reviews.store': {
    methods: ["POST"]
    pattern: '/api/v1/reviews'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/review').createReviewValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/review').createReviewValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/reviews_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/reviews_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'reviews.update': {
    methods: ["PUT"]
    pattern: '/api/v1/reviews/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/review').updateReviewValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/review').updateReviewValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/reviews_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/reviews_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'reviews.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/reviews/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/reviews_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/reviews_controller').default['destroy']>>>
    }
  }
  'account.account_favorites.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/account/favorites'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#validators/pagination').paginationValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/account_favorites_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/account_favorites_controller').default['index']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'account.account_favorites.store': {
    methods: ["POST"]
    pattern: '/api/v1/account/favorites'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/movie').attachMovieValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/movie').attachMovieValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/account_favorites_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/account_favorites_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'account.account_favorites.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/account/favorites/:movieId'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { movieId: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/account_favorites_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/account_favorites_controller').default['destroy']>>>
    }
  }
  'account.account_watched.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/account/watched'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#validators/pagination').paginationValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/account_watched_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/account_watched_controller').default['index']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'account.account_watched.store': {
    methods: ["POST"]
    pattern: '/api/v1/account/watched'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/movie').attachMovieValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/movie').attachMovieValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/account_watched_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/account_watched_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'account.account_watched.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/account/watched/:movieId'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { movieId: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/account_watched_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/account_watched_controller').default['destroy']>>>
    }
  }
  'account.account_reviews.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/account/reviews'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#validators/pagination').paginationValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/account_reviews_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/account_reviews_controller').default['index']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
}
