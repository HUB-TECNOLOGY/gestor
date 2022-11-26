import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Deposits extends BaseSchema {
  protected tableName = 'deposits'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.decimal('amount').notNullable()
      table.string('detail')
      table.string('transaction_code')
      table.enu('status', ['APROVADO', 'PENDENTE', 'NEGADO']).defaultTo('PENDENTE')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
