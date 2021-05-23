const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const auth = require("../../middleware/auth")
const jwt = require("jsonwebtoken")
const config = require("config")
const { check, validationResult } = require("express-validator")

const User = require("../../models/User")

// @route    GET api/auth
// @desc     Get user by token
// @access   Private
router.get("/", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password")
        res.json(user)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
})

// @route    POST api/auth
// @desc     Authenticate user & get token
// @access   Public
router.post(
    "/",
    check("email", "Email is required").normalizeEmail().isEmail().notEmpty(),
    check("password", "Password is required").notEmpty(),
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { email, password } = req.body

        try {
            const user = await User.findOne({ email })

            if (!user) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: "Email or password is invalid" }] })
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: "Email or password is invalid" }] })
            }

            const payload = {
                user: {
                    id: user.id,
                },
            }

            const userObj = {
                _id: user.id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                date: user.date,
            }

            jwt.sign(
                payload,
                config.get("jwtSecret"),
                { expiresIn: "1 days" },
                (err, jwt) => {
                    if (err) throw err
                    res.json({ jwt, user: userObj })
                }
            )
        } catch (err) {
            console.error(err.message)
            res.status(500).send("Server error")
        }
    }
)

module.exports = router
