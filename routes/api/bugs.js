const express = require("express")
const router = express.Router()
const { check, validationResult } = require("express-validator")
const { default: slugify } = require("slugify")
const mongoose = require("mongoose")

const Bug = require("../../models/Bug")
const Project = require("../../models/Project")

/*
 * @route   GET api/bugs/
 * @desc    Get all bugs
 * @access  Private
 */

router.get("/", async (req, res) => {
    const bugs = await Bug.find()

    bugs.length > 0
        ? res.json(bugs)
        : res.status(404).json({ errors: "No bugs found" })
})

/*
 * @route   GET api/bugs/:slug
 * @desc    Get bugs for a project
 * @access  Private
 */

router.get("/:slug/bugs", async (req, res) => {
    const project = await Project.find({ slug: req.params.slug })
    const bugs = await Bug.find({ project: project[0]._id })

    bugs.length > 0
        ? res.json(bugs)
        : res.status(404).json({ errors: "No bugs found" })
})

/*
 * @route   GET api/bugs/:projectSlug/:bugSlug
 * @desc    Get all bugs
 * @access  Private
 */

router.get("/:projectSlug/:bugSlug", async (req, res) => {
    const project = await Project.find({ slug: req.params.projectSlug })
    const bug = await Bug.findOne({
        project: project[0]._id,
        slug: req.params.bugSlug,
    })

    bug ? res.json(bug) : res.status(404).json({ errors: "No bug found" })
})

/*
 * @route   POST api/bugs/new
 * @desc    Submit a new bug
 * @access  Private
 */

router.post(
    "/new",
    check("name", "Name requires a minimum of 6 characters").isLength({
        min: 6,
    }),
    check("name").custom(async (value, { req }) => {
        const bug = await Bug.findOne({ slug: slugify(value) })

        if (bug) {
            throw new Error("Bug with the same title already exists")
        }

        return true
    }),
    check("description", "Please include a valid description").notEmpty(),
    check("project", "Please include a valid project").notEmpty(),
    check("project").custom((value, { req }) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
            throw new Error("Project does not exist")
        }

        return true
    }),
    async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const {
            name,
            description,
            severity,
            reproduction,
            stackTrace,
            project,
        } = req.body

        try {
            const count = await Bug.countDocuments()

            const newBug = new Bug({
                name,
                description,
                severity,
                reproduction,
                stackTrace,
                project,
                slug: slugify(name),
                tag: `TEMP-${count}`,
            })

            await newBug.save()
            res.json(newBug)
        } catch (e) {
            res.status(500).send("Server error")
        }
    }
)

module.exports = router
