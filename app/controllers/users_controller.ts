import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import UserTransformer from '#transformers/user_transformer'

export default class UsersController {
  async show({ params, response, serialize }: HttpContext) {
    const user = await User.find(params.id)
    if (!user) {
      return response.notFound({ message: 'User not found' })
    }

    return serialize(UserTransformer.transform(user).useVariant('toPublic'))
  }
}
