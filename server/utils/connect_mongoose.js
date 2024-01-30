const mongoose = require("mongoose")


const connectMongo = async () => {
    const machin = await mongoose.connect("mongodb+srv://julienlemolo:vmtBLWVAH7ITijbM@monsterhunter.6g077fl.mongodb.net/?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
    console.log("connected ! " + machin)
}



module.exports.connectMongo = connectMongo