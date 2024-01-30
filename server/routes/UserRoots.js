const express = require("express")
const {signup, login, isConnected, test, profil, save_url} = require("../controllers/UserController")
const {protectJWT} = require("../middlewares/protectJWT")

const userRouter = express.Router()


userRouter.post("/signup", signup)
userRouter.post("/login", login)



const multer  = require('multer')
const upload = multer()

userRouter.post("/testaaa",protectJWT, upload.single("test"), test)



userRouter.get("/isConnected", protectJWT, isConnected)

userRouter.get("/profil", protectJWT, profil)
userRouter.post("/save_url", protectJWT, save_url)



module.exports.userRouter = userRouter