import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Network from 'App/Models/Network'
export default class NetworksController {
  public async index({ auth }: HttpContextContract) {
    await Network.findBy('sponsor_code', auth.user?.myCode)
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
