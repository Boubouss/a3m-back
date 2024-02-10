import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'events'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.enum('type', ['COMPETITION', 'ENTRAINEMENT', 'STAGE', 'GRADE'], {
        useNative: true,
        enumName: 'event_type',
        existingType: false,
      })
      table.dateTime('date_debut', { useTz: true }).notNullable()
      table.dateTime('date_fin', { useTz: true }).notNullable()
      table.integer('numero_rue').nullable()
      table.string('rue').nullable()
      table.string('ville').nullable()
      table.string('code_postal').nullable()
      table.dateTime('created_at', { useTz: true }).defaultTo(this.now())
      table.dateTime('updated_at', { useTz: true }).defaultTo(this.now())
    })

    this.schema.createTable('event_competitions', (table) => {
      table.increments('id')
      table.integer('event_id').unsigned().references('id').inTable('events').onDelete('CASCADE')
      table.enum(
        'categorie',
        ['PREPOUSSIN', 'POUSSIN', 'BENJAMIN', 'MINIME', 'CADET', 'JUNIOR', 'SENIOR', 'VETERAN'],
        {
          useNative: true,
          enumName: 'event_age_categorie',
          existingType: false,
        }
      )
      table.enum('genre', ['H', 'F'], {
        useNative: true,
        enumName: 'event_genre_categorie',
        existingType: false,
      })
      table.dateTime('heure_pesee', { useTz: true })
      table.dateTime('created_at', { useTz: true }).defaultTo(this.now())
      table.dateTime('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  public async down() {
    this.schema.raw('DROP TYPE IF EXISTS "event_type"')
    this.schema.raw('DROP TYPE IF EXISTS "event_age_categorie"')
    this.schema.raw('DROP TYPE IF EXISTS "event_genre_categorie"')
    this.schema.dropTable(this.tableName)
    this.schema.dropTable(this.tableName + '_competitions')
  }
}
