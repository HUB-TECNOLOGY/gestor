import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsersSchema extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name').notNullable()
      table.string('cpf').unique().notNullable()
      table.date('birthdate').notNullable()
      table.string('email', 255).notNullable().unique()
      table.string('password', 180).notNullable()
      table.string('address').notNullable()
      table.string('zip_code')
      table.string('city').notNullable()
      table.string('province').notNullable()
      table.string('country').notNullable()
      table.string('my_code').unique()
      table.string('sponsor_code').notNullable()
      table.enu('status', ['PIN_PENDING', 'DOCUMENT_PENDING', 'SUCCESS']).defaultTo('PIN_PENDING')
      table.integer('points').notNullable()
      table.float('investiment').notNullable()
      table
        .integer('profile_id')
        .unsigned()
        .references('id')
        .inTable('profiles')
        .onDelete('CASCADE')
      table.string('remember_me_token').nullable()
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
