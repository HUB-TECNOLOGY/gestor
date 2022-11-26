import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Profile from 'App/Models/Profile'
export default class ProfileSeeder extends BaseSeeder {
  public async run() {
    await Profile.createMany([
      {
        title: 'Cliente',
        points: 1,
        // minimunInvest: '1000',
      },
      {
        title: 'Assistente de Supervisor',
        points: 2,
        // minimunInvest: '2000',
      },
      {
        title: 'Supervisor',
        points: 2,
        // minimunInvest: '2000',
      },
      {
        title: 'Assistente de Gerente',
        points: 2,
        // minimunInvest: '2000',
      },
      {
        title: 'Gerente',
        points: 2,
        // minimunInvest: '2000',
      },
    ])
  }
}
