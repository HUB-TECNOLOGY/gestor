import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { StoreValidator } from 'App/Validators/Auth'
import User from 'App/Models/User'

export default class AuthController {
  public async store({ request, auth, response }: HttpContextContract) {
    const { email, password } = await request.validate(StoreValidator)
    const user = await User.query().where('email', email)

    const token = await auth.use('api').attempt(email, password, {
      expiresIn: '7 days',
    })
    return response.created({ user: user, token: token.token })
  }

  public async destroy({ auth }: HttpContextContract) {
    await auth.logout()
  }
}
