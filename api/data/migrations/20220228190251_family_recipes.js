
exports.up = async (knex) => {
    await knex.schema
      .createTable('users', tbl => {
        tbl.increments('user_id')
        tbl.string('username', 200).notNullable()
        tbl.string('password', 200).notNullable()
        tbl.timestamps(false, true)
      })
      .createTable('recipes', tbl => {
        tbl.increments('recipe_id')
        tbl.string('title', 200).notNullable()
        tbl.string('source', 200)
        tbl.string('category').notNullable()
      })
      .createTable('ingredients', tbl => {
        tbl.increments('ingredient_id')
        tbl.string('ingredient_name').notNullable().unique()
      })
      .createTable('instructions', tbl => {
        tbl.increments('instruction_id')
        tbl.string('instruction_text', 200).notNullable()
        tbl.integer('step_number').notNullable()
        tbl.integer('recipe_id')
        .unsigned()
        .notNullable()
        .references('recipe_id')
        .inTable('recipes')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      })
      .createTable('ing_instructions', tbl => {
        tbl.increments('ing_instructions_id')
        tbl.float('quantity').notNullable()
        tbl.integer('ingredient_id')
        .unsigned()
        .notNullable()
        .references('ingredient_id')
        .inTable('ingredients')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        tbl.integer('instruction_id')
        .unsigned()
        .notNullable()
        .references('instruction_id')
        .inTable('instructions')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      })
  }
  
  exports.down = async (knex) => {
    await knex.schema.dropTableIfExists('ing_instructions')
    await knex.schema.dropTableIfExists('instructions')
    await knex.schema.dropTableIfExists('ingredients')
    await knex.schema.dropTableIfExists('recipes')
    await knex.schema.dropTableIfExists('users')
  }