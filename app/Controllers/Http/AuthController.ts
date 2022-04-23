import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AuthController {
  public async store({ request, auth, response }: HttpContextContract) {
    const { email, password } = request.all()
    const user = await User.findBy('email', email)
    const token = await auth.attempt(email, password, {
      expiresIn: '1 day',
    })
    return response.json({
      user,
      token,
    })
  }

  public async destroy({ auth }: HttpContextContract) {
    await auth.logout()
  }
}
