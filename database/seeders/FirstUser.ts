import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
import { DateTime } from 'luxon'
export default class FirstUserSeeder extends BaseSeeder {
  public async run() {
    await User.create({
      name: 'Paulo Pinto',
      cpf: '61290749302',
      birthdate: DateTime.now(),
      document: '04694975202126',
      documentType: 'RG',
      documentIssuer: 'SSP',
      motherName: 'Matilde XPTO',
      email: 'mesquitadev@gmail.com',
      username: 'mesquitadev2',
      password: 'secret',
      phone: '98991741075',
      landline: '1231231231',
      address: 'r8, q 44 n2',
      zipCode: '655057754',
      city: 'sao luis',
      province: 'ma',
      country: 'br',
      maritalStatus: 'SOLTEIRO',
      bank: 'BB',
      agency: 'asd',
      account: '474584',
      accountType: 'CORRENTE',
      profession: 'prograador',
      pixKey: '123123123',
      pixKeyType: 'CPF',
    })
  }
}
