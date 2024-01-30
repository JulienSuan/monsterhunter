const crypto = require("crypto")


const hash = crypto.createHash("sha256").update("sdfqsdfqsdf").digest("hex")

console.log(hash)