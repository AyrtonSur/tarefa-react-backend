import { MovieSchema } from '#database/schema'
import { manyToMany, hasMany } from '@adonisjs/lucid/orm'
import type { ManyToMany, HasMany } from '@adonisjs/lucid/types/relations'
import Genre from '#models/genre'
import Review from '#models/review'

export default class Movie extends MovieSchema {
  @manyToMany(() => Genre, { pivotTable: 'movie_genres', pivotTimestamps: false })
  declare genres: ManyToMany<typeof Genre>

  @hasMany(() => Review)
  declare reviews: HasMany<typeof Review>
}
