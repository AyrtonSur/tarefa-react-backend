import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Genre from '#models/genre'

export default class extends BaseSeeder {
  async run() {
    await Genre.updateOrCreateMany('name', [
      { name: 'Ação' },
      { name: 'Aventura' },
      { name: 'Comédia' },
      { name: 'Drama' },
      { name: 'Terror' },
      { name: 'Romance' },
      { name: 'Ficção Científica' },
      { name: 'Fantasia' },
      { name: 'Animação' },
      { name: 'Suspense' },
      { name: 'Documentário' },
      { name: 'Família' },
    ])
  }
}
