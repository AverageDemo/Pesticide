const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const normalize = require("normalize-url");
const { check, validationResult, header } = require("express-validator");

const auth = require("../../middleware/auth");
const User = require("../../models/User");

/*
 * @route   GET api/users
 * @desc    Get users for populating lists
 * @access  Private
 */
router.get("/", auth, async (req, res) => {
  const users = await User.find().select(["id", "name", "avatar"]);

  res.json(users);
});

/*
 * @route   POST api/users
 * @desc    Register user
 * @access  Public
 */
router.post(
  "/",
  header("authorization").custom((value) => {
    if (value) throw new Error("You are already logged in");

    return true;
  }),
  check("name", "Name is required").notEmpty(),
  check("email", "Please include a valid email")
    .normalizeEmail()
    .isEmail()
    .notEmpty(),
  check(
    "password",
    "Please enter a password with 6 or more characters"
  ).isLength({ min: 6 }),
  check("passwordConfirm").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }

    return true;
  }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Email already in use" }] });
      }

      const avatar = normalize(
        gravatar.url(email, {
          s: "200",
          r: "pg",
          d: "mm",
        }),
        { forceHttps: true }
      );

      user = new User({
        name,
        email,
        avatar,
        password,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      return res.json({ msg: "Success" });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
