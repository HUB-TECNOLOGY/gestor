import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Transactions extends BaseSchema {
  protected tableName = 'transactions'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.decimal('amount').notNullable()
      table.decimal('charge').notNullable()
      table.decimal('post_balance').notNullable()
      table.string('transaction_type').notNullable()
      table.string('transaction_code').notNullable()
      table.string('details').notNullable()
      table.string('remark').notNullable()
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
