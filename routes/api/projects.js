const express = require("express")
const router = express.Router()
const { check, validationResult } = require("express-validator")
const { default: slugify } = require("slugify")

const checkObjectId = require("../../middleware/checkObjectId")

const Project = require("../../models/Project")
const Bug = require("../../models/Bug")

/*
 * @route   GET api/projects
 * @desc    Get all projects
 * @access  Private
 */

router.get("/", async (req, res) => {
    const projects = await Project.find().sort("-date")

    projects.length > 0
        ? res.json(projects)
        : res.status(404).json({ errors: "No projects found" })
})

/*
 * @route   GET api/projects/:slug
 * @desc    Get project
 * @access  Private
 */

router.get("/:slug", async (req, res) => {
    const project = await Project.find({ slug: req.params.slug })

    project.length > 0
        ? res.json(project)
        : res.status(404).json({ errors: "No project found" })
})

/*
 * @route   POST api/projects/new
 * @desc    Create a new project
 * @access  Private
 */

router.post(
    "/new",
    check("project_name", "Name requires a minimum of 6 characters").isLength({
        min: 6,
    }),
    check("project_name").custom(async (value, { req }) => {
        const project = await Project.findOne({ slug: slugify(value) })

        if (project) {
            throw new Error("Project with the same title already exists")
        }

        return true
    }),
    check("about", "Please include a valid description").notEmpty(),
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { project_name, about } = req.body

        try {
            const newProject = new Project({
                project_name,
                about,
                slug: slugify(project_name),
            })

            await newProject.save()
            res.json(newProject)
        } catch (e) {
            res.status(500).send("Server error")
        }
    }
)

module.exports = router
