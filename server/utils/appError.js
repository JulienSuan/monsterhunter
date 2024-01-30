class appError extends Error {
    constructor(message, statusCode) {
        super(message)
        this.statusCode = statusCode
        this.status = statusCode.startWidth("4") ? "fail (400)" : "error (500)"
        this.isOperational = true
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = appError;