import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoreUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({}),
    birthdate: schema.date({}),
    document: schema.string({}, [rules.unique({ table: 'users', column: 'document' })]),
    document_type: schema.string({}),
    document_issuer: schema.string({}),
    cpf: schema.string({}, [rules.unique({ table: 'users', column: 'cpf' })]),
    mother_name: schema.string({}),
    address: schema.string({}),
    zipCode: schema.string({}),
    city: schema.string({}),
    province: schema.string({}),
    country: schema.string({}),
    email: schema.string({}, [rules.email(), rules.unique({ table: 'users', column: 'email' })]),
    password: schema.string({}, [rules.minLength(6), rules.maxLength(8), rules.confirmed()]),
    username: schema.string({}, [rules.unique({ table: 'users', column: 'username' })]),
    phone: schema.string(),
    landline: schema.string(),
    bank: schema.string(),
    agency: schema.string(),
    account: schema.string({}, [rules.unique({ table: 'users', column: 'account' })]),
    accountType: schema.string(),
    pixKey: schema.string({}, [rules.unique({ table: 'users', column: 'pix_key' })]),
    pixKeyType: schema.string(),
    profession: schema.string(),
    maritalStatus: schema.string(),
    refId: schema.number.optional(),
    profileId: schema.number.optional(),
    referral: schema.string.optional(),
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
}
