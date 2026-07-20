import vine from '@vinejs/vine'

/**
 * Shared validator for paginated, searchable list endpoints.
 */
export const paginationValidator = vine.create({
  page: vine.number().min(1).optional(),
  perPage: vine.number().min(1).max(50).optional(),
  search: vine.string().trim().optional(),
})
