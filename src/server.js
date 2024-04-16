require("express-async-errors")
const AppError = require("./utils/AppError")
const express = require("express")
const routes = require("./routes")

const server = express()
server.use(express.json())
server.use(routes)

server.use((error, request, response, next) => {
  if(error instanceof AppError) {
    return response.status(error.statusCode).json({
      "status": "error",
      "message": error.message
    })
  }

  return response.status(500).json({
    "status": "error",
    "message": "Internal server error."
  })
})


const PORT = 2222
server.listen(PORT, console.log(`Server is running on PORT ${PORT}`))