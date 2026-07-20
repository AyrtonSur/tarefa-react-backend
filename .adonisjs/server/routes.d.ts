import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'docs.show': { paramsTuple?: []; params?: {} }
    'docs.json': { paramsTuple?: []; params?: {} }
    'auth.new_account.store': { paramsTuple?: []; params?: {} }
    'auth.access_tokens.store': { paramsTuple?: []; params?: {} }
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'profile.access_tokens.destroy': { paramsTuple?: []; params?: {} }
    'genres.index': { paramsTuple?: []; params?: {} }
    'genres.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'movies.index': { paramsTuple?: []; params?: {} }
    'movies.featured': { paramsTuple?: []; params?: {} }
    'movies.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'reviews.index': { paramsTuple?: []; params?: {} }
    'reviews.random': { paramsTuple?: []; params?: {} }
    'reviews.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'users.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'user_favorites.index': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'user_watched.index': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'user_reviews.index': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'genres.store': { paramsTuple?: []; params?: {} }
    'genres.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'genres.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'movies.store': { paramsTuple?: []; params?: {} }
    'movies.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'movies.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'reviews.store': { paramsTuple?: []; params?: {} }
    'reviews.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'reviews.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'account.account_favorites.index': { paramsTuple?: []; params?: {} }
    'account.account_favorites.store': { paramsTuple?: []; params?: {} }
    'account.account_favorites.destroy': { paramsTuple: [ParamValue]; params: {'movieId': ParamValue} }
    'account.account_watched.index': { paramsTuple?: []; params?: {} }
    'account.account_watched.store': { paramsTuple?: []; params?: {} }
    'account.account_watched.destroy': { paramsTuple: [ParamValue]; params: {'movieId': ParamValue} }
    'account.account_reviews.index': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'docs.show': { paramsTuple?: []; params?: {} }
    'docs.json': { paramsTuple?: []; params?: {} }
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'genres.index': { paramsTuple?: []; params?: {} }
    'genres.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'movies.index': { paramsTuple?: []; params?: {} }
    'movies.featured': { paramsTuple?: []; params?: {} }
    'movies.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'reviews.index': { paramsTuple?: []; params?: {} }
    'reviews.random': { paramsTuple?: []; params?: {} }
    'reviews.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'users.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'user_favorites.index': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'user_watched.index': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'user_reviews.index': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'account.account_favorites.index': { paramsTuple?: []; params?: {} }
    'account.account_watched.index': { paramsTuple?: []; params?: {} }
    'account.account_reviews.index': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'docs.show': { paramsTuple?: []; params?: {} }
    'docs.json': { paramsTuple?: []; params?: {} }
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'genres.index': { paramsTuple?: []; params?: {} }
    'genres.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'movies.index': { paramsTuple?: []; params?: {} }
    'movies.featured': { paramsTuple?: []; params?: {} }
    'movies.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'reviews.index': { paramsTuple?: []; params?: {} }
    'reviews.random': { paramsTuple?: []; params?: {} }
    'reviews.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'users.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'user_favorites.index': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'user_watched.index': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'user_reviews.index': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'account.account_favorites.index': { paramsTuple?: []; params?: {} }
    'account.account_watched.index': { paramsTuple?: []; params?: {} }
    'account.account_reviews.index': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'auth.new_account.store': { paramsTuple?: []; params?: {} }
    'auth.access_tokens.store': { paramsTuple?: []; params?: {} }
    'profile.access_tokens.destroy': { paramsTuple?: []; params?: {} }
    'genres.store': { paramsTuple?: []; params?: {} }
    'movies.store': { paramsTuple?: []; params?: {} }
    'reviews.store': { paramsTuple?: []; params?: {} }
    'account.account_favorites.store': { paramsTuple?: []; params?: {} }
    'account.account_watched.store': { paramsTuple?: []; params?: {} }
  }
  PUT: {
    'genres.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'movies.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'reviews.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  DELETE: {
    'genres.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'movies.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'reviews.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'account.account_favorites.destroy': { paramsTuple: [ParamValue]; params: {'movieId': ParamValue} }
    'account.account_watched.destroy': { paramsTuple: [ParamValue]; params: {'movieId': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}