import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Contracts extends BaseSchema {
  protected tableName = 'contracts'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.float('investiment')
      table.dateTime('due_date')
      table.string('document_url')
      table.enu('status', ['ACTIVE', 'INACTIVE', 'CANCELLED']).defaultTo('ACTIVE')
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('users.id')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
