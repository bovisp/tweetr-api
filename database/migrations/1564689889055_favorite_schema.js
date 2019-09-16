'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FavoriteSchema extends Schema {
  up () {
    this.create('favorites', (table) => {
      table.increments()
      table.integer('user_id').unsigned().notNullable()
      table.integer('tweet_id').unsigned().notNullable()
      table.timestamps()

      table.foreign('user_id')
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')

      table.foreign('tweet_id')
        .references('id')
        .inTable('tweets')
        .onDelete('CASCADE')
    })
  }

  down () {
    this.drop('favorites')
  }
}

module.exports = FavoriteSchema
