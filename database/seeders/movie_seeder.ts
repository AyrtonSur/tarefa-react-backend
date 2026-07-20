import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Genre from '#models/genre'
import Movie from '#models/movie'

const GENRE_NAMES = [
  'Ação',
  'Aventura',
  'Comédia',
  'Drama',
  'Terror',
  'Romance',
  'Ficção Científica',
  'Fantasia',
  'Animação',
  'Suspense',
  'Documentário',
  'Família',
]

const TITLES_BY_GENRE: string[][] = [
  ['Fúria de Aço', 'Zona de Combate', 'Alvo Eliminado', 'Operação Relâmpago'],
  ['A Última Fronteira', 'Mapa Perdido', 'Expedição Selvagem', 'O Tesouro Esquecido'],
  ['Confusão em Família', 'Um Casamento Daqueles', 'Vizinhos Barulhentos', 'Férias Trapalhonas'],
  ['Entre Nós', 'O Peso do Silêncio', 'Caminhos Cruzados', 'Depois da Tempestade'],
  ['A Casa do Fim', 'Sombras no Porão', 'O Chamado da Noite', 'Presença Invisível'],
  ['Cartas Nunca Enviadas', 'Um Verão Para Lembrar', 'Reencontro em Paris', 'Coração em Aberto'],
  ['Órbita Zero', 'Colônia 9', 'O Último Sinal', 'Máquinas do Amanhã'],
  ['O Reino Esquecido', 'A Coroa de Espinhos', 'Feitiço Ancestral', 'As Crônicas de Aldebar'],
  ['O Pequeno Explorador', 'Amigos de Pelúcia', 'A Fábrica de Sonhos', 'Aventuras no Jardim'],
  ['Sem Testemunhas', 'O Vizinho Perfeito', 'Rastros no Escuro', 'A Última Chamada'],
  ['Vozes do Oceano', 'O Mundo em Números', 'Raízes Profundas', 'Depois do Silêncio'],
  ['Um Natal Especial', 'Nossa Casa Nova', 'O Verão da Vovó', 'Irmãos Para Sempre'],
]

const CASTS = [
  'Marina Sales, Théo Cardoso',
  'Bianca Lopes, Rafael Nunes',
  'Igor Salgado, Helena Prado',
  'Camila Duarte, Bruno Farias',
  'Vitor Andrade, Larissa Mota',
  'Fernanda Reis, Diego Amaral',
  'Priscila Nogueira, Otávio Ramos',
  'Sofia Barbosa, Gustavo Teles',
]

const AGE_RATINGS = ['L', '10', '12', '14', '16', '18']

export default class extends BaseSeeder {
  async run() {
    const genres = await Genre.query().whereIn('name', GENRE_NAMES)
    const genreByName = new Map(genres.map((genre) => [genre.name, genre]))

    const entries: { title: string; primaryIndex: number }[] = []
    for (let round = 0; round < TITLES_BY_GENRE[0].length; round++) {
      for (let genreIndex = 0; genreIndex < GENRE_NAMES.length; genreIndex++) {
        entries.push({ title: TITLES_BY_GENRE[genreIndex][round], primaryIndex: genreIndex })
      }
    }

    for (const [index, entry] of entries.entries()) {
      const primaryGenre = GENRE_NAMES[entry.primaryIndex]
      const secondaryGenre = GENRE_NAMES[(entry.primaryIndex + 4) % GENRE_NAMES.length]
      const tertiaryGenre =
        index % 3 === 0 ? GENRE_NAMES[(entry.primaryIndex + 8) % GENRE_NAMES.length] : null

      const genreNames = tertiaryGenre
        ? [primaryGenre, secondaryGenre, tertiaryGenre]
        : [primaryGenre, secondaryGenre]

      const movie = await Movie.updateOrCreate(
        { title: entry.title },
        {
          synopsis: `Uma história envolvente de ${primaryGenre.toLowerCase()} que promete prender o espectador do início ao fim.`,
          posterImageUrl: `https://picsum.photos/seed/filminhos-poster-${index + 1}/500/750`,
          bannerImageUrl: `https://picsum.photos/seed/filminhos-banner-${index + 1}/1600/900`,
          releaseYear: 1990 + (index % 34),
          durationMinutes: 85 + (index % 60),
          ageRating: AGE_RATINGS[index % AGE_RATINGS.length],
          contentWarning:
            index % 4 === 0 ? 'Violência' : index % 4 === 1 ? 'Linguagem imprópria' : null,
          cast: CASTS[index % CASTS.length],
        }
      )

      const genreIds = genreNames
        .map((name) => genreByName.get(name)?.id)
        .filter((id): id is number => id !== undefined)

      await movie.related('genres').sync(genreIds)
    }
  }
}
