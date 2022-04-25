import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'

export default class NetworksController {
  public async index({ auth, request }: HttpContextContract) {
    const qParams = request.qs()
    console.log('fl', qParams)
    const user = await auth.authenticate()
    switch (qParams.status) {
      case 'DOCUMENT_PENDING':
        return Database.from('users')
          .where('sponsor_code', user.myCode)
          .where('status', 'DOCUMENT_PENDING')
      case 'PIN_PENDING':
        return Database.from('users')
          .where('sponsor_code', user.myCode)
          .where('status', 'PIN_PENDING')
      case 'SUCCESS':
        return Database.from('users').where('sponsor_code', user.myCode).where('status', 'SUCCESS')
      default:
        return Database.from('users').where('sponsor_code', user.myCode)
    }
  }

  public async show({ auth }: HttpContextContract) {
    const user = await auth.authenticate()
    return Database.from('users').where('role', 'MANAGER').where('sponsor_code', user.myCode)
  }
}
