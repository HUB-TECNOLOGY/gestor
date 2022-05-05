/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/
import Event from '@ioc:Adonis/Core/Event'
import Network from 'App/Models/Network'
Event.on('new:user', async (user) => {
  console.log(user.email)
  await Network.create({
    sponsorCode: user.myCode,
    userId: user.id,
  })
})
