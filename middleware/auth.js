const jwt = require("jsonwebtoken")
const config = require("config")

module.exports = function (req, res, next) {
    // Get token from header
    const authHeader = req.header("authorization")
    const token = authHeader.split("Bearer ")[1]

    // Check if not token
    if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied" })
    }

    // Verify token
    try {
        jwt.verify(token, config.get("jwtSecret"), (error, decoded) => {
            if (error) {
                return res.status(401).json({ msg: "Token is not valid" })
            } else {
                req.user = decoded.user
                next()
            }
        })
    } catch (err) {
        console.error("something wrong with auth middleware")
        res.status(500).json({ msg: "Server Error" })
    }
}
