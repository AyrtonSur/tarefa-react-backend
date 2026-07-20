import type User from '#models/user'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class UserTransformer extends BaseTransformer<User> {
  toObject() {
    return this.pick(this.resource, [
      'id',
      'fullName',
      'email',
      'avatarUrl',
      'createdAt',
      'updatedAt',
      'initials',
    ])
  }

  /**
   * Public-facing profile — no email, for viewing other users.
   */
  toPublic() {
    return this.pick(this.resource, ['id', 'fullName', 'avatarUrl', 'initials'])
  }
}
