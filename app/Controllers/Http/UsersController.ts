import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Database from '@ioc:Adonis/Lucid/Database'
import { DateTime } from 'luxon'

export default class UsersController {
  public async index({}: HttpContextContract) {
    return await User.all()
  }

  public async store({ request, response }: HttpContextContract) {
    const data = request.all()

    const verificarSeExistePatrocinador = await Database.from('users').where(
      'my_code',
      data.sponsorCode
    )

    const pontosInvestidosPatrocinador = await Database.from('users')
      .select('points')
      .where('my_code', data.sponsorCode)

    if (verificarSeExistePatrocinador.length) {
      if (pontosInvestidosPatrocinador[0]?.points >= 2) {
        data.myCode =
          'F' +
          data.cpf.substring(0, 3).toUpperCase() +
          DateTime.local().month +
          DateTime.local().year
        return await User.create(data)
      }
      return response.status(403).json({
        message: 'O patrocinador deve ter uma pontuação maior que 1 para poder indicar',
      })
    }
    return response.status(403).json({
      message: 'Não existe patrocinador com este código informado!',
    })
  }

  public async show({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
