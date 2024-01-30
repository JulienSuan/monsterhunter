const express = require("express")
const {connectMongo} = require("./utils/connect_mongoose")
const {userRouter} = require("./routes/UserRoots")
const cors = require("cors")
const errorHandling = require("./controllers/errorController")
const appError = require("./utils/appError")


const app = express()
const port = 3001

// ===================  Middleware 🚗
app.use(express.json())
app.use(cors())
// =======================

//  ==========Routes  🔱
app.use("/api/mhgu/v1/", userRouter)
// ==========


app.all("*", (req, res, next) => {
    // res.json(404, {message: "Quelque chose de mauvais s'est produit"})
    const error = new appError("une erreur s'est produite", 404)
    error.status = "fail"
    error.statusCode = 404
    next(error)

})


app.use(errorHandling)



app.listen(port, async () => {
    console.log(`serveur lancé içi : http://localhost:${port}`)
    await connectMongo()
})


