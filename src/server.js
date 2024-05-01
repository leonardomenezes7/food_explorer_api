require("dotenv/config")
require("express-async-errors")
const AppError = require("./utils/AppError")
const express = require("express")
const routes = require("./routes")
const cors = require("cors")
const uploadConfig = require("./configs/upload")

const server = express()
server.use(cors())
server.use(express.json())
server.use("/files", express.static(uploadConfig.UPLOADS_FOLDER))
server.use(routes)

server.use((error, request, response, next) => {
  if(error instanceof AppError) {
    return response.status(error.statusCode).json({
      "status": "error",
      "message": error.message
    })
  }

  console.error(error)

  return response.status(500).json({
    "status": "error",
    "message": "Internal server error."
  })
})

const PORT = process.env.SERVER_PORT || 3542
server.listen(PORT, console.log(`Server is running on PORT ${PORT}`))