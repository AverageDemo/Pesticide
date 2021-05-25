const jwt = require("jsonwebtoken")
const config = require("config")

const userInfo = require("../helpers/userInfo")

module.exports = function (req, res, next) {
    // Get token from header
    const authHeader = req.header("authorization")

    if (!authHeader) {
        return res.status(401).json({
            errors: [{ msg: "No token, authorization denied" }],
        })
    }

    const token = authHeader.split("Bearer ")[1]

    // Check if not token
    if (!token) {
        return res.status(401).json({
            errors: [{ msg: "No token, authorization denied" }],
        })
    }

    // Verify token
    try {
        jwt.verify(token, config.get("jwtSecret"), async (error, decoded) => {
            if (error) {
                return res.status(401).json({
                    errors: [{ msg: "Token is not valid" }],
                })
            } else {
                const user = await userInfo(decoded.user)
                if (!user) {
                    return res.status(403).json({
                        errors: [{ msg: "Unauthorized" }],
                    })
                }
                if (user.role > 0) {
                    req.user = decoded.user
                    next()
                } else {
                    return res.status(403).json({
                        errors: [{ msg: "Unauthorized" }],
                    })
                }
            }
        })
    } catch (err) {
        console.error("something wrong with auth middleware")
        res.status(500).json({
            errors: [{ msg: "Server error" }],
        })
    }
}
