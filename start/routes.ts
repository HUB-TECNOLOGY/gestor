import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    Route.post('/login', 'Auth/AuthController.store')
    Route.post('/logout', 'Auth/AuthController.destroy')
  }).prefix('/auth')
  Route.post('/register', 'User/RegisterController.store')

  Route.group(() => {
    Route.resource('/admin/deposit', 'Admin/DepositController')
    Route.resource('/admin/withdraw', 'Admin/WithdrawalsController')
    Route.resource('/withdraw', 'User/WithdrawalsController')
    Route.resource('/account', 'User/AccountController')
    Route.resource('/transactions', 'User/TransactionsController')
    Route.resource('/invest', 'User/InvestmentController')
    Route.resource('/deposit', 'User/DepositController')
    Route.resource('/user', 'User/UsersController')
  }).middleware('auth')
}).prefix('/api/v1')
