import type Review from '#models/review'
import { BaseTransformer } from '@adonisjs/core/transformers'
import UserTransformer from '#transformers/user_transformer'
import MovieTransformer from '#transformers/movie_transformer'

export default class ReviewTransformer extends BaseTransformer<Review> {
  /**
   * Expects `user` to always be preloaded. `movie` is embedded only when preloaded
   * (e.g. "my reviews" / public profile reviews list).
   */
  toObject() {
    return {
      ...this.pick(this.resource, ['id', 'rating', 'text', 'createdAt', 'updatedAt']),
      user: UserTransformer.transform(this.resource.user).useVariant('toPublic'),
      movie: MovieTransformer.transform(this.whenLoaded(this.resource.movie)),
    }
  }
}
