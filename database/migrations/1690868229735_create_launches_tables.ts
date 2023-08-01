import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'launches'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('flight_number').notNullable()
      table.string('name').notNullable()
      table.dateTime('date_utc')
      table.boolean('success')
      table.boolean('reused')
      table.string('youtube_link')
      table.string('rocket').notNullable()
      table.string('links_patch_small')
      table.string('links_patch_large')
      table.string('presskit')
      table.string('wikipedia')
      table.unique(['flight_number', 'rocket', 'name'])


      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
