function errorHandler(err, req, res, next) {
    console.error("ERROR", req.method, req.path, err)

    if (!res.headersSent) {
        const statusCode = err.statusCode || 500
        const message = err.message || "Internal server error. Check the server console"

        res.status(statusCode).json({
            message: message,
        })
    }
    next(err)
}

function notFoundHandler(req, res, next) {
    res.status(404).json({ message: "This route does not exist" })
}

module.exports = { errorHandler, notFoundHandler }
