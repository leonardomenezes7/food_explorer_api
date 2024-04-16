const { Router } = require("express")
const dishesRoutes = Router()
const DishesController = require("../controllers/DishesController")
const dishesController = new DishesController()
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization")
const multer = require("multer")
const uploadConfig = require("../configs/upload")
const upload = multer(uploadConfig.MULTER)

dishesRoutes.use(ensureAuthenticated)

dishesRoutes.post("/", verifyUserAuthorization("admin"), upload.single("image"), dishesController.create)
dishesRoutes.put("/:id", verifyUserAuthorization("admin"), upload.single("image"), dishesController.update)

module.exports = dishesRoutes