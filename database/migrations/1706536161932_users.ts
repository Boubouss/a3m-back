import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('uuid_generate_v4()').knexQuery)
      table.string('email', 255).notNullable().unique()
      table.string('password', 180).notNullable()
      table.string('firstname', 255).nullable()
      table.string('lastname', 255).nullable()
      table.dateTime('birthdate', { useTz: true }).nullable()

      table.enum('genre', ['H', 'F'], {
        useNative: true,
        enumName: 'user_genre',
        existingType: false,
      })
      table.enum('role', ['USER', 'PARENT', 'STAFF', 'ADMIN'], {
        useNative: true,
        enumName: 'user_role',
        existingType: false,
      })
      table.uuid('parrent_id').nullable().references('id').inTable('users')
      table.boolean('active').defaultTo(true).notNullable()
      table.json('avatar').nullable()
      table.dateTime('created_at', { useTz: true }).defaultTo(this.now()).notNullable()
      table.dateTime('updated_at', { useTz: true }).defaultTo(this.now()).notNullable()
    })
  }

  public async down() {
    this.schema.raw('DROP TYPE IF EXISTS "user_role"')
    this.schema.raw('DROP TYPE IF EXISTS "user_genre"')
    this.schema.dropTable(this.tableName)
  }
}
