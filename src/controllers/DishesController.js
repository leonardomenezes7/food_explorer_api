const DiskStorage = require("../providers/DiskStorage")
const knex = require("../database/knex")
const AppError = require("../utils/AppError")

class DishesController{
  async create(request, response) {
    const { name, category, description, price, ingredients } = request.body
    const image = request.file.filename

    const diskStorage = new DiskStorage()
    const filename = await diskStorage.saveFile(image)

    const [dish_id] = await knex("dishes").insert({
      name,
      description,
      category,
      price,
      image: filename
    })

    const ingredientsArray = JSON.parse(ingredients)

    const ingredientsInsert = ingredientsArray.map(name => {
      return {
        dish_id,
        name
      }
    })

    await knex("ingredients").insert(ingredientsInsert)

    response.json({
      "message": "Prato criado com sucesso!"
    })
  }

  async update(request, response) {
    const { name, category, description, price, ingredients } = request.body
    const { id } = request.params

    const imageFileName = request.file?.filename

    const dish = await knex("dishes").where({ id }).first()

    if(!dish) {
      throw new AppError("Prato não encontrado.", 404)
    }
    
    dish.name = name ?? dish.name
    dish.category = category ?? dish.category
    dish.description = description ?? dish.description
    dish.price = price ?? dish.price

    if(imageFileName) {
      const diskStorage = new DiskStorage()

      if(dish.image) {
        await diskStorage.deleteFile(dish.image)
      }

      const filename = await diskStorage.saveFile(imageFileName)
      dish.image = filename ?? dish.image
    }

    if(ingredients) {
      await knex("ingredients").where({ dish_id: id }).delete()

      const ingredientsInsert = ingredients.map(name => {
        return {
          dish_id: id,
          name
        }
      })

      await knex("ingredients").insert(ingredientsInsert)
    }

    await knex("dishes").where({ id }).update(dish)

    return response.json({
      "message": "Prato atualizado com sucesso!"
    })
  }

  async delete(request, response) {
    const { id } = request.params

    await knex("dishes").where({ id }).delete()

    return response.json({
      "message": "Prato excluído com sucesso!"
    })
  }

  async show(request, response) {
    const { id } = request.params

    const dish = await knex("dishes").where({ id }).first()
    const ingredients = await knex("ingredients").where({ dish_id: id })
    .orderBy("name")

    return response.json({
      ...dish,
      ingredients
    })
  }

  async index(request, response) {
    const { name, ingredients } = request.query

    let dishes

    if(ingredients) {
      const filterIngredients = ingredients.split(",").map(ingredient => ingredient.trim())

      dishes = await knex("ingredients")
        .innerJoin("dishes", "dishes.id", "ingredients.dish_id")
        .select([
          "dishes.id",
          "dishes.name",
          "dishes.description",
          "dishes.price",
          "dishes.image"
        ])
        .whereLike("dishes.name", `%${name}%`)
        .whereIn("ingredients.name", filterIngredients)

    } else {
      dishes = await knex("dishes")
      .whereLike("name", `%${name}%`)
      .orderBy("name")
    }

    response.json(dishes)
  }
}

module.exports = DishesController
