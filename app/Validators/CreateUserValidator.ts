import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    name: schema.string({}),
    cpf: schema.string({}, [rules.unique({ table: 'users', column: 'cpf' })]),
    birthdate: schema.date({}),
    email: schema.string({}, [rules.email()]),
    password: schema.string({}, [
      rules.unique({ table: 'users', column: 'email' }),
      rules.minLength(6),
      rules.maxLength(8),
      rules.confirmed(),
    ]),
    address: schema.string({}),
    zipCode: schema.string({}),
    city: schema.string({}),
    province: schema.string({}),
    country: schema.string({}),
    myCode: schema.string.optional({}, [rules.unique({ table: 'users', column: 'my_code' })]),
    sponsorCode: schema.string({}),
    points: schema.number(),
    investiment: schema.number(),
    role: schema.enum.optional([
      'CLIENT',
      'SUPERVISOR_ASSISTANT',
      'SUPERVISOR',
      'MANAGER_ASSISTANT',
      'MANAGER',
      'ADMIN',
    ] as const),
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
  public messages = {}
}
