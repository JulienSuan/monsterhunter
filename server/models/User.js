const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    validate: {
        validator: function (value) {
            return validator.isEmail(value);
        },
        message: "L'adresse e-mail n'est pas valide.",
    },
    unique: true,
    required: true,
  },
  password : {
    type: String,
    minLength: 8,
    required: true,
  },
  token: String,
  profilDatas: {
    type: [Object], 
  },
  systemFileUrl: {
    type:String
  }
});



userSchema.pre("save", async function() {
    const hashed = await bcrypt.hash(this.password, 12)
    console.log(hashed)
    this.password = hashed
})

userSchema.methods.isComparePassword = async function(password) {
    console.log("pass : " + this.password, "another : " + password)
    return await bcrypt.compare(password, this.password)
}


const User = mongoose.model("User", userSchema);
module.exports.User = User;
