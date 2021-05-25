const express = require("express")
const router = express.Router()
const { check, validationResult } = require("express-validator")
const { default: slugify } = require("slugify")
const mongoose = require("mongoose")

const userInfo = require("../../helpers/userInfo")
const auth = require("../../middleware/auth")

const Bug = require("../../models/Bug")
const Project = require("../../models/Project")

/*
 * @route   GET api/bugs/:slug
 * @desc    Get bugs for a project
 * @access  Private
 */
router.get("/:slug/bugs", auth, async (req, res) => {
    const project = await Project.findOne({ slug: req.params.slug })
    const bugs = await Bug.find({ project: project._id })
        .sort("status")
        .populate("assigned", ["name"])

    bugs
        ? res.json(bugs)
        : res.status(404).json({
              errors: [{ msg: "No bugs found" }],
          })
})

/*
 * @route   GET api/bugs/openCount
 * @desc    Get unresolved issue count for a project
 * @access  Private
 */
router.get("/openCount", auth, async (req, res) => {
    const bugs = await Bug.find()

    const oc = {}

    bugs.map((bug) => {
        oc[bug.project] = 0
    })

    bugs.map((bug) => {
        bug.status < 3 && oc[bug.project]++
    })

    bugs.length > 0
        ? res.json(oc)
        : res.status(404).json({
              errors: [{ msg: "No bugs found" }],
          })
})

/*
 * @route   GET api/bugs/:projectSlug/:bugSlug
 * @desc    View a bug
 * @access  Private
 */
router.get("/:projectSlug/:bugSlug", auth, async (req, res) => {
    const project = await Project.find({ slug: req.params.projectSlug })
    const bug = await Bug.findOne({
        project: project[0]._id,
        slug: req.params.bugSlug,
    })
        .populate("comments.author", ["name"])
        .populate("author", ["name"])
        .populate("assigned", ["name"])

    bug
        ? res.json(bug)
        : res.status(404).json({
              errors: [{ msg: "No bug found" }],
          })
})

/*
 * @route   DELETE api/bugs/:slug
 * @desc    Delete a bug
 * @access  Private
 */
router.delete("/:slug", auth, async (req, res) => {
    const user = await userInfo(req.user)

    const bugC = await Bug.findOne({ slug: req.params.slug })

    if (!bugC) {
        res.status(404).json({
            errors: [{ msg: "No bug found" }],
        })
    }

    if (user.role > 1 || String(user._id) === String(bugC.author)) {
        await Bug.findOneAndDelete({ slug: req.params.slug })
        res.json({ msg: "Success" })
    } else {
        res.status(403).json({
            errors: [{ msg: "You are not authorized to delete this bug" }],
        })
    }
})

/*
 * @route   PUT api/bugs/:bugId
 * @desc    Update bug
 * @access  Private
 */
router.put(
    "/:slug",
    auth,
    check("bug_name").custom(async (value, { req }) => {
        const bug = await Bug.findOne({
            slug: slugify(value.toLowerCase()),
        })

        if (bug && bug.slug !== req.params.slug) {
            throw new Error("A bug with the same title already exists")
        }

        return true
    }),
    check("about", "Please include a valid description").notEmpty(),
    async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const user = await userInfo(req.user)

        const bugC = await Bug.findOne({ slug: req.params.slug })

        if (!bugC) {
            res.status(404).json({
                errors: [{ msg: "No bug found" }],
            })
        }

        if (user.role > 1 || String(user._id) === String(bugC.author)) {
            const { bug_name, severity, about, reproduction, stackTrace } =
                req.body
            const bug = await Bug.findOneAndUpdate(
                { slug: req.params.slug },
                {
                    name: bug_name,
                    severity,
                    description: about,
                    reproduction,
                    stackTrace,
                    slug: slugify(bug_name.toLowerCase()),
                    dateUpdated: Date.now(),
                },
                { new: true }
            )

            bug
                ? res.json(bug)
                : res.status(500).json({
                      errors: [{ msg: "Server error" }],
                  })
        } else {
            res.status(403).json({
                errors: [{ msg: "You are not authorized to update this bug" }],
            })
        }
    }
)

/*
 * @route   PUT api/bugs/:slug/assign
 * @desc    Update bug status
 * @access  Private
 */
router.put("/:slug/assign", auth, async (req, res) => {
    const user = await userInfo(req.user)

    if (user.role > 1) {
        const { assigned } = req.body

        const bug = await Bug.findOneAndUpdate(
            { slug: req.params.slug },
            {
                assigned: assigned._id,
            },
            { new: true }
        )

        console.log(bug)

        res.json({ msg: "Success" })
    } else {
        res.status(403).json({
            errors: [{ msg: "You are not authorized to update this bug" }],
        })
    }
})

/*
 * @route   PUT api/bugs/:bugId/status
 * @desc    Update bug status
 * @access  Private
 */
router.put("/:slug/status", auth, async (req, res) => {
    const { status } = req.body

    const bug = await Bug.findOneAndUpdate(
        { slug: req.params.slug },
        {
            status,
        },
        { new: true }
    )

    bug
        ? res.json(bug)
        : res.status(404).json({
              errors: [{ msg: "No bug found" }],
          })
})

/*
 * @route   PUT api/bugs/:slug/newcomment
 * @desc    Create a new comment on a bug
 * @access  Private
 */
router.put(
    "/:slug/newcomment",
    auth,
    check("comment", "Please include a valid comment").notEmpty(),
    async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { comment, author } = req.body

        Bug.findOne({ slug: req.params.slug })
            .then((bug) => {
                const newComment = {
                    comment,
                    author,
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
 * @route   DELETE api/bugs/:slug/:commentid
 * @desc    Delete a comment
 * @access  Private
 */
router.delete("/:slug/:commentid", auth, async (req, res) => {
    const bug = await Bug.findOneAndUpdate(
        { slug: req.params.slug },
        { $pull: { comments: { _id: req.params.commentid } } }
    )

    bug
        ? res.json(bug)
        : res.status(404).json({
              errors: [{ msg: "No comment found" }],
          })
})

/*
 * @route   POST api/bugs/new
 * @desc    Submit a new bug
 * @access  Private
 */
router.post(
    "/new",
    auth,
    check("bug_name").custom(async (value, { req }) => {
        const bug = await Bug.findOne({
            slug: slugify(value.toLowerCase()),
        })

        if (bug) {
            throw new Error("A bug with the same title already exists")
        }

        return true
    }),
    check("bug_name", "Name requires a minimum of 6 characters").isLength({
        min: 6,
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
            const newBug = new Bug({
                name: bug_name,
                description: about,
                severity,
                reproduction,
                stackTrace,
                project,
                assigned: null,
                author: req.user.id,
                slug: slugify(bug_name.toLowerCase()),
            })

            await newBug.save()
            res.json(newBug)
        } catch (e) {
            if (e.code === 11000) {
                res.status(500).json({
                    errors: [{ msg: "A bug with this title already exists" }],
                })
            } else {
                console.log(e)
                res.status(500).json({
                    errors: [{ msg: "Server error" }],
                })
            }
        }
    }
)

module.exports = router
