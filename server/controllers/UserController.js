
const {User} = require("../models/User")
const jwt = require("jsonwebtoken")
const fs = require("fs")
const {extractData} = require("../scripts/scripts")
const path = require("path")
const catchAsync = require("../utils/catchAsync")


module.exports.signup = catchAsync(async (req, res, next) => {
    const {password, email} = req.body
    console.log(req.body)
    let token;
    let user;
    if (password && email) {
        user = new User({
            email:email,
            password: password,
        })
        token = await jwt.sign({id: user._id}, "secretkey", {expiresIn: "7d"})
        user.token = token
    }  
    await user.save()
    res.status(201).json({user: user,token: token})
})

module.exports.login = catchAsync(async (req, res, next) => {
        const {password, email} = req.body
        console.log(req.body)
        let token;
        if (password && email) {
            const user = await User.findOne({email: email})
            if (!user) {
                return next(new Error("Pas de user"))
            }
            const isCorrectPass = await user.isComparePassword(password)
            if (!user || !isCorrectPass) {
                return next(new Error("Vérifiez le mail où le mot de passe"))
            } else {
                token = await jwt.sign({id: user._id}, "secretkey", {expiresIn: "7d"})
                user.token = token
                res.json(201, {token: token, user: user})
            }
        }
})

module.exports.isConnected = catchAsync(async (req, res, next) => {
    console.log("connected: true")
    res.json({success : true})
})

module.exports.test = catchAsync(async (req, res, next) => {
        if (!req.file.buffer) {
            return next(new Error("Pas le bon fichier"));
        }
        const datas = extractData(req.file.buffer)
        console.log(req.file)
        console.log(datas)
        await User.findByIdAndUpdate(req.user._id, { profilDatas: [{}] });
        await User.findByIdAndUpdate(req.user._id, { profilDatas: datas });
        const usersaved = await req.user.save()
        console.log(usersaved)
        res.json({success : true, datas: datas})
})

module.exports.profil = catchAsync(async (req, res, next) => {
        const user = req.user
        console.log(user)
        const datas = user.profilDatas
        res.json({success : true, datas: datas})
})
module.exports.save_url = catchAsync(async (req, res, next) => {
        console.log(req.body)
        res.json({success : true, url: req.body.url})
        await User.findOneAndUpdate({_id: req.user._id}, {systemFileUrl: req.body.url})
})