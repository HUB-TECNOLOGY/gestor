import Transaction from 'App/Models/Transaction'
import User from 'App/Models/User'
import Logger from '@ioc:Adonis/Core/Logger'
import Database from '@ioc:Adonis/Lucid/Database'

export function getAmount(amount: number, length: number = 0) {
  if (0 < length) {
    return Math.round(amount)
  }
  return amount
}

export async function referralCommission(userId: number | undefined, invest: number) {
  const user = await User.find(userId)
  const referral = await User.findByOrFail('ref_id', user?.refId)
  // @ts-ignore
  const parent = await Database.from('users').where('parent_id', user?.refId).count('id').first()

  if (!referral) {
    return 'Patrocinador não encontrado!'
  }

  const amount = invest * 0.05
  user?.merge({
    balance: (user.balance += amount),
  })
  user?.save()
  createTransaction(userId, amount, '+', `Bônus de ${formatCurrency(amount)}`, 'referral_bonus')

  if (referral.profileId === 3) {
    const amount = invest * 0.01
    user?.merge({
      balance: (user.balance += amount),
    })
    user?.save()
    createTransaction(userId, amount, '+', `Bônus de ${formatCurrency(amount)}`, 'referral_bonus')
  }

  Logger.info('[SEND COMMISSION SUCCESSFUL]')
}

export async function createTransaction(
  userId: number | undefined,
  amount: any,
  type: string,
  details: string,
  remark: string
) {
  await Transaction.create({
    userId: userId,
    amount: amount,
    transactionType: type,
    details: details,
    remark: remark,
    postBalance: 0,
    charge: 0,
  })
}

export function formatCurrency(amount: number | undefined) {
  return Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(amount ? amount : 0)
}
