'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ReplySchema extends Schema {
  up () {
    this.create('replies', (table) => {
      table.increments()
      table.integer('user_id').unsigned().notNullable()
      table.integer('tweet_id').unsigned().notNullable()
      table.text('reply').notNullable()
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
    this.drop('replies')
  }
}

module.exports = ReplySchema
