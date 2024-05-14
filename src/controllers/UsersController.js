const { hash } = require("bcrypt")
const knex = require("../database/knex")
const AppError = require("../utils/AppError")

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body

    if(!name || !email || !password) {
      throw new AppError("Insira todos os dados.")
    }

    if(password.length < 6) {
      throw new AppError("A senha precisa ter no mínimo 6 caracteres.")
    }
    
    const checkUserExists = await knex("users").where({ email })

    if(checkUserExists.length > 0) {
      throw new AppError("Este e-mail já está em uso.")
    }

    const hashedPassword = await hash(password, 8)

    await knex("users").insert({ name, email, password: hashedPassword })

    return response.status(201).json({
      "message": "Usuário criado com sucesso!"
    })
  }
}

module.exports = UsersController