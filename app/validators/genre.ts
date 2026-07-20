import vine from '@vinejs/vine'

export const createGenreValidator = vine.create({
  name: vine.string().trim().minLength(1).maxLength(64),
})

export const updateGenreValidator = vine.create({
  name: vine.string().trim().minLength(1).maxLength(64),
})
