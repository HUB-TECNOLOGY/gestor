import { schema } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoreWithDrawlsValidator {
  public schema = schema.create({
    userId: schema.number(),
    amount: schema.number(),
    investId: schema.number(),
    detail: schema.string.optional(),
    type: schema.string(),
  })
  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages = {
    'user.referral.required': 'O patrocinador é obrigatório',
  }

  constructor(protected ctx: HttpContextContract) {}
}
