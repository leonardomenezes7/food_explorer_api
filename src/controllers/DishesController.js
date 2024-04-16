const DiskStorage = require("../providers/DiskStorage")
const knex = require("../database/knex")

class DishesController{
  async create(request, response) {
    const { name, category, description, price, ingredients } = request.body
    const image = request.file.filename

    const diskStorage = new DiskStorage()
    const filename = await diskStorage.saveFile(image)

    const ingredientsArray = ingredients.split(" ")

    const [dish_id] = await knex("dishes").insert({
      name,
      description,
      category,
      price,
      image: filename
    })

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
    
  }
}

module.exports = DishesController