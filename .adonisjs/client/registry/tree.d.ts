/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  auth: {
    newAccount: {
      store: typeof routes['auth.new_account.store']
    }
    accessTokens: {
      store: typeof routes['auth.access_tokens.store']
    }
  }
  profile: {
    profile: {
      show: typeof routes['profile.profile.show']
    }
    accessTokens: {
      destroy: typeof routes['profile.access_tokens.destroy']
    }
  }
  genres: {
    index: typeof routes['genres.index']
    show: typeof routes['genres.show']
    store: typeof routes['genres.store']
    update: typeof routes['genres.update']
    destroy: typeof routes['genres.destroy']
  }
  movies: {
    index: typeof routes['movies.index']
    featured: typeof routes['movies.featured']
    show: typeof routes['movies.show']
    store: typeof routes['movies.store']
    update: typeof routes['movies.update']
    destroy: typeof routes['movies.destroy']
  }
  reviews: {
    index: typeof routes['reviews.index']
    random: typeof routes['reviews.random']
    show: typeof routes['reviews.show']
    store: typeof routes['reviews.store']
    update: typeof routes['reviews.update']
    destroy: typeof routes['reviews.destroy']
  }
  users: {
    show: typeof routes['users.show']
  }
  userFavorites: {
    index: typeof routes['user_favorites.index']
  }
  userWatched: {
    index: typeof routes['user_watched.index']
  }
  userReviews: {
    index: typeof routes['user_reviews.index']
  }
  account: {
    accountFavorites: {
      index: typeof routes['account.account_favorites.index']
      store: typeof routes['account.account_favorites.store']
      destroy: typeof routes['account.account_favorites.destroy']
    }
    accountWatched: {
      index: typeof routes['account.account_watched.index']
      store: typeof routes['account.account_watched.store']
      destroy: typeof routes['account.account_watched.destroy']
    }
    accountReviews: {
      index: typeof routes['account.account_reviews.index']
    }
  }
}
