let notFoundHandler = (req, res, next) => {
    return res.status(404).json({
        message: "Not Found",
        status: 404,
        timestamp: new Date()
    })
}
export default notFoundHandler