import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Bonus extends BaseSchema {
  protected tableName = 'bonuses'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table
        .integer('investment_id')
        .unsigned()
        .references('id')
        .inTable('investments')
        .onDelete('CASCADE')
      table.decimal('amount').notNullable()
      table.dateTime('payment_date').notNullable()
      table.string('type').notNullable()
      table.boolean('paid_out').defaultTo(false)
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
