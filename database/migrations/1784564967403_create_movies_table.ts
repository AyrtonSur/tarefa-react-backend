import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'movies'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title').notNullable()
      table.text('synopsis').notNullable()
      table.string('poster_image_url').nullable()
      table.string('banner_image_url').nullable()
      table.integer('release_year').nullable()
      table.integer('duration_minutes').nullable()
      table.string('age_rating').nullable()
      table.string('content_warning').nullable()
      table.text('cast').nullable()

      table.index('title')

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
