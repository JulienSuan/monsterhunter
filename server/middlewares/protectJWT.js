const jwt = require('jsonwebtoken');
const { User } = require('../models/User');

module.exports.protectJWT = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token || !token.startsWith("Bearer ")) {
        return res.status(201).json({ success: false, message: "Pas de Token" });
    }
    const tokenValue = token.split(" ")[1];
    try {
        const decoded = jwt.verify(tokenValue, "secretkey");
        if (!decoded) {
            throw new Error("Mauvais token");
        }
        const user = await User.findById(decoded.id);
        if (!user) {
            throw new Error("Pas de User");
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(201).json({ success: false, error: error.message });
    }
};
