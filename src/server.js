const express = require("express")

const server = express()
const PORT = 2222

server.listen(PORT, console.log(`Server is running on PORT ${PORT}`))