import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { StoreValidator } from 'App/Validators/Auth'

export default class AuthController {
  public async store({ request, response, auth }: HttpContextContract) {
    const { email, password } = await request.validate(StoreValidator)
    const user = await User.query().where('email', email).preload('accountInternal')

    const token = await auth.use('api').attempt(email, password, {
      expiresIn: '2hours',
    })
    return response.created({ user: user, token })
  }

  public async destroy({ auth }: HttpContextContract) {
    await auth.logout()
  }
}
