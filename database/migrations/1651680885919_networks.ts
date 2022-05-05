import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Networks extends BaseSchema {
  protected tableName = 'networks'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('sponsor_code')
      table.string('status').defaultTo('ACTIVE')
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('users.id')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
