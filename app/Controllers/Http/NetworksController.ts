import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class NetworksController {
  public async index({ auth, request }: HttpContextContract) {
    const qParams = request.qs()
    const user = await auth.authenticate()
    switch (qParams.status) {
      case 'DOCUMENT_PENDING':
        return User.query().where('sponsor_code', user.myCode).where('status', 'DOCUMENT_PENDING')
      case 'PIN_PENDING':
        return User.query().where('sponsor_code', user.myCode).where('status', 'PIN_PENDING')
      case 'SUCCESS':
        return User.query().where('sponsor_code', user.myCode).where('status', 'SUCCESS')
      default:
        return User.findBy('sponsor_code', user.myCode)
    }
  }

  public async show({ auth }: HttpContextContract) {
    const user = await auth.authenticate()
    return User.query().where('role', 'MANAGER').where('sponsor_code', user.myCode)
  }
}
