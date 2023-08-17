function errorHandler(err, req, res, next) {
    console.error("ERROR", req.method, req.path, err)

    if (!res.headersSent) {
        let statusCode = err.statusCode || 500
        if (err.name === "ValidationError") {
            statusCode = 400
        }
        res.status(statusCode).json({ name: err.name, message: err.message })
    }
    next(err)
}

function notFoundHandler(req, res, next) {
    res.status(404).json({ message: "This route does not exist" })
}

module.exports = { errorHandler, notFoundHandler }
