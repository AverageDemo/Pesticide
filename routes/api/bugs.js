const express = require("express")
const router = express.Router()
const { check, validationResult } = require("express-validator")
const { default: slugify } = require("slugify")
const mongoose = require("mongoose")

const Bug = require("../../models/Bug")
const Project = require("../../models/Project")

/*
 * @route   GET api/bugs/:slug
 * @desc    Get bugs for a project
 * @access  Private
 */

router.get("/:slug/bugs", async (req, res) => {
    const project = await Project.find({ slug: req.params.slug })
    const bugs = await Bug.find({ project: project[0]._id }).sort("status")

    bugs.length > 0
        ? res.json(bugs)
        : res.status(404).json({ error: "No bugs found" })
})

/*
 * @route   GET api/bugs/openCount
 * @desc    Get unresolved issue count for a project
 * @access  Private
 */

router.get("/openCount", async (req, res) => {
    const openCount = await Bug.aggregate([
        { $match: { status: { $ne: 3 } } },
        {
            $group: {
                _id: "$project",
                openBugCount: { $sum: 1 },
            },
        },
    ])

    openCount.length > 0
        ? res.json(openCount)
        : res.status(404).json({ errors: "Found no bugs" })
})

/*
 * @route   GET api/bugs/:projectSlug/:bugSlug
 * @desc    View a bug
 * @access  Private
 */

router.get("/:projectSlug/:bugSlug", async (req, res) => {
    const project = await Project.find({ slug: req.params.projectSlug })
    const bug = await Bug.findOne({
        project: project[0]._id,
        slug: req.params.bugSlug,
    })

    bug ? res.json(bug) : res.status(404).json({ error: "No bug found" })
})

/*
 * @route   DELETE api/bugs/:bugId
 * @desc    Delete a bug
 * @access  Private
 */

router.delete("/:bugId", async (req, res) => {
    const bug = await Bug.findByIdAndDelete(req.params.bugId)

    bug ? res.json(bug) : res.status(404).json({ error: "No bug found" })
})

/*
 * @route   PUT api/bugs/:bugId
 * @desc    Update bug
 * @access  Private
 */

router.put("/:bugId", async (req, res) => {
    const { bug_name, severity, about, reproduction, stackTrace } = req.body
    const bug = await Bug.findByIdAndUpdate(req.params.bugId, {
        name: bug_name,
        severity,
        description: about,
        reproduction,
        stackTrace,
        slug: slugify(bug_name.toLowerCase()),
        dateUpdated: Date.now(),
    })

    bug ? res.json(bug) : res.status(404).json({ error: "No bug found" })
})

/*
 * @route   PUT api/bugs/:bugId/status
 * @desc    Update bug status
 * @access  Private
 */

router.put("/:bugId/status", async (req, res) => {
    const { status } = req.body

    const bug = await Bug.findByIdAndUpdate(req.params.bugId, {
        status,
    })

    bug ? res.json(bug) : res.status(404).json({ error: "No bug found" })
})

/*
 * @route   put api/bugs/:slug/newcomment
 * @desc    Create a new comment on a bug
 * @access  Private
 */

router.put(
    "/:slug/newcomment",
    check("comment").notEmpty(),
    async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { comment } = req.body

        Bug.findOne({ slug: req.params.slug })
            .then((bug) => {
                const newComment = {
                    comment,
                }

                bug.comments.unshift(newComment)

                bug.save()
                    .then((bug) => res.json(bug))
                    .catch((err) => console.log(err))
            })
            .catch((err) => console.log(err))
    }
)

/*
 * @route   POST api/bugs/new
 * @desc    Submit a new bug
 * @access  Private
 */

router.post(
    "/new",
    check("bug_name").custom(async (value, { req }) => {
        const bug = await Bug.findOne({
            slug: slugify(value.toLowerCase()),
        })

        if (bug) {
            throw new Error("Bug with the same title already exists")
        }

        return true
    }),
    check("about", "Please include a valid description").notEmpty(),
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

        const { bug_name, about, severity, reproduction, stackTrace, project } =
            req.body

        try {
            const count = await Bug.countDocuments()

            const newBug = new Bug({
                name: bug_name,
                description: about,
                severity,
                reproduction,
                stackTrace,
                project,
                slug: slugify(bug_name.toLowerCase()),
            })

            await newBug.save()
            res.json(newBug)
        } catch (e) {
            res.status(500).send("Server error")
        }
    }
)

module.exports = router
