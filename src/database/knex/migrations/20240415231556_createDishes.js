exports.up = knex  => knex.schema.createTable("dishes", table => {
  table.increments("id")
  table.text("name").notNullable()
  table.text("image").notNullable()
  table.text("category").notNullable()
  table.text("description").notNullable()
  table.decimal("price", 8,2).notNullable()
})

exports.down = knex  => knex.schema.dropTable("dishes")

