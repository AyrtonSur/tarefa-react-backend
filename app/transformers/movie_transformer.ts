import type Movie from '#models/movie'
import { BaseTransformer } from '@adonisjs/core/transformers'
import GenreTransformer from '#transformers/genre_transformer'

type MovieExtra = {
  avgRating?: number | null
  reviewCount?: number
  isFavorite?: boolean
  isWatched?: boolean
}

export default class MovieTransformer extends BaseTransformer<Movie> {
  constructor(
    resource: Movie,
    private extra: MovieExtra = {}
  ) {
    super(resource)
  }

  /**
   * Lightweight variant for lists/carousels — expects `genres` to be preloaded.
   */
  toObject() {
    return {
      ...this.pick(this.resource, ['id', 'title', 'posterImageUrl', 'releaseYear']),
      genres: GenreTransformer.transform(this.resource.genres),
    }
  }

  /**
   * Full variant for the movie detail page — expects `genres` to be preloaded.
   */
  toDetail() {
    return {
      ...this.pick(this.resource, [
        'id',
        'title',
        'synopsis',
        'posterImageUrl',
        'bannerImageUrl',
        'releaseYear',
        'durationMinutes',
        'ageRating',
        'contentWarning',
        'cast',
        'createdAt',
        'updatedAt',
      ]),
      genres: GenreTransformer.transform(this.resource.genres),
      avgRating: this.extra.avgRating ?? null,
      reviewCount: this.extra.reviewCount ?? 0,
      isFavorite: this.extra.isFavorite ?? false,
      isWatched: this.extra.isWatched ?? false,
    }
  }
}
