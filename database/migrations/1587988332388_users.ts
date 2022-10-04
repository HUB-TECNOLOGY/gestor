import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsersSchema extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name').notNullable()
      table.date('birthdate').notNullable()
      table.string('document').unique().notNullable()
      table.string('document_type').notNullable()
      table.string('document_issuer').notNullable()
      table.string('cpf').unique().notNullable()
      table.string('mother_name').notNullable()
      table.string('address').notNullable()
      table.string('zip_code')
      table.string('city').notNullable()
      table.string('province').notNullable()
      table.string('country').notNullable()
      table.string('email', 255).notNullable().unique()
      table.string('password', 180).notNullable()
      table.string('username').unique()
      table.string('phone').notNullable()
      table.string('landline').notNullable()
      table.string('bank').notNullable()
      table.string('agency').notNullable()
      table.string('account').unique().notNullable()
      table.string('account_type').notNullable()
      table.string('pix_key').unique().notNullable()
      table.string('pix_key_type').notNullable()
      table.string('profession').notNullable()
      table.string('marital_status').notNullable()
      table.string('referral')
      table.integer('ref_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table
        .integer('profile_id')
        .unsigned()
        .references('id')
        .inTable('profiles')
        .onDelete('CASCADE')
      table.boolean('status').defaultTo('PIN_PENDING')
      table.string('role')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
