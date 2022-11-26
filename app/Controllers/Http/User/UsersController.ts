import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  public async index({ auth }: HttpContextContract) {
    return User.query()
      .select('*')
      .where('id', auth?.user?.id)
      .preload('referral')
      .preload('profile')
      .first()
  }

  public async store({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
