import "react-toastify/dist/ReactToastify.css"

import { ToastContainer, toast } from "react-toastify"

import moment from "moment"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState, useContext } from "react"
import { XIcon } from "@heroicons/react/solid"
import { API_URL } from "@/config/index"
import AuthContext from "@/context/AuthContext"
import { isAuthenticated } from "@/helpers/index"
import Layout from "@/components/Layout"

export default function BugPage({ bug, projectObj, token }) {
    const router = useRouter()
    const { user } = useContext(AuthContext)
    const [comment, setComment] = useState()

    const statusOptions = {
        Inactive: "bg-gray-300",
        Active: "bg-blue-300",
        Review: "bg-red-300",
        Resolved: "bg-green-300",
    }

    const severityOptions = {
        Low: "bg-gray-300",
        Moderate: "bg-green-300",
        High: "bg-yellow-300",
        Critical: "bg-red-300",
    }

    const handleDeleteComment = async (id) => {
        const res = await fetch(`${API_URL}/bugs/${bug.slug}/${id}/delete`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })

        if (!res.ok) {
            toast.error("Something went wrong")
        } else {
            router.reload()
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const res = await fetch(`${API_URL}/bugs/${bug.slug}/newcomment`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ comment, author: user._id }),
        })

        const commentRes = await res.json()

        if (!res.ok) {
            commentRes.errors.map((error) => {
                toast.error(error.msg)
            })
        } else {
            router.reload()
        }
    }

    const handleDeleteBtn = async (e) => {
        if (confirm("Are you sure?")) {
            const res = await fetch(`${API_URL}/bugs/${bug.slug}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            const data = await res.json()

            !res.ok
                ? toast.error(data.message)
                : router.push(`/projects/${projectObj.slug}`)
        }
    }

    const handleReopenBtn = async (e) => {
        const res = await fetch(`${API_URL}/bugs/${bug.slug}/status`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ status: 1 }),
        })

        if (!res.ok) {
            toast.error("Something went wrong")
        } else {
            router.reload()
        }
    }

    const handleReviewBtn = async (e) => {
        const res = await fetch(`${API_URL}/bugs/${bug.slug}/status`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ status: 2 }),
        })

        if (!res.ok) {
            toast.error("Something went wrong")
        } else {
            router.reload()
        }
    }

    return (
        <Layout
            breadcrumb={[
                <Link href="/" key="Dashboard">
                    <a className="hover:text-gray-400">Dashboard</a>
                </Link>,
                <span className="text-gray-400" key="Separator">
                    {" / "}
                </span>,
                <Link href="/projects" key="Projects">
                    <a className="hover:text-gray-400">Projects</a>
                </Link>,
                <span className="text-gray-400" key="Separator2">
                    {" / "}
                </span>,
                <Link
                    href={`/projects/${projectObj.slug}`}
                    key={projectObj.name}
                >
                    <a className="hover:text-gray-400">{projectObj.name}</a>
                </Link>,
                <span className="text-gray-400" key="Separator3">
                    {" / "}
                </span>,
                <span className="text-gray-400" key={bug.name}>
                    {bug.name}
                </span>,
            ]}
            page={bug.name}
        >
            <ToastContainer />
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                        {bug.name}
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        Created on {moment(bug.date).format("LLLL") + " EST"}
                    </p>
                    {bug.date !== bug.dateUpdated && (
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">
                            Last updated on{" "}
                            {moment(bug.dateUpdated).format("LLLL") + " EST"}
                        </p>
                    )}
                </div>
                <div className="border-t border-gray-200">
                    <dl>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Project
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {projectObj.name}
                            </dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Status
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                <span
                                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-white ${
                                        Object.values(statusOptions)[bug.status]
                                    }`}
                                >
                                    {Object.keys(statusOptions)[bug.status]}
                                </span>
                            </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Severity
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                <span
                                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-white ${
                                        severityOptions[bug.severity]
                                    }`}
                                >
                                    {bug.severity}
                                </span>
                            </dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Assigned to
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                User
                            </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                About
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {bug.description}
                            </dd>
                        </div>
                        {bug.reproduction && (
                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Steps to reproduce
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {bug.reproduction}
                                </dd>
                            </div>
                        )}
                        {bug.stackTrace && (
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Stack Trace
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {bug.stackTrace}
                                </dd>
                            </div>
                        )}
                    </dl>
                    <div className="px-4 py-3 bg-white flex justify-between sm:px-6 border-t border-gray-100">
                        <Link
                            href={`/bugs/${projectObj.slug}/${bug.slug}/edit`}
                        >
                            <button className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                                Edit
                            </button>
                        </Link>
                        <div>
                            {/* Only show this button if admin / lead dev */}
                            <button
                                onClick={handleDeleteBtn}
                                className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                            >
                                Delete
                            </button>
                            {bug.status === 0 ? (
                                <button className="inline-flex justify-center ml-2 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                                    Assign to user
                                </button>
                            ) : bug.status === 1 ? (
                                <button
                                    onClick={handleReviewBtn}
                                    className="inline-flex justify-center ml-2 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Mark for Review
                                </button>
                            ) : (
                                bug.status === 2 && (
                                    <button
                                        onClick={handleReopenBtn}
                                        className="inline-flex justify-center ml-2 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                    >
                                        Re-Open
                                    </button>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {bug.comments &&
                bug.comments.length > 0 &&
                bug.comments
                    .sort((a, b) => moment(a.date) - moment(b.date))
                    .map((ctx, idx) => (
                        <div
                            key={`Comment-${idx}`}
                            className="bg-gray-50 shadow overflow-hidden sm:rounded-lg mt-6"
                        >
                            <div className="px-4 py-2 sm:px-6 flex justify-between">
                                <p className="mt-1 max-w-2xl text-sm text-gray-600">
                                    <span className="font-semibold">
                                        {ctx.author.name}
                                    </span>
                                    {` posted ${moment(ctx.date).fromNow()}`}
                                </p>

                                {/* Only show if admin */}
                                <p className="mt-1 max-w-2xl text-sm text-gray-600">
                                    <button
                                        onClick={() =>
                                            handleDeleteComment(ctx._id)
                                        }
                                        className="hover:text-gray-400 focus:outline-none"
                                    >
                                        <XIcon className="h-5 w-5" />
                                    </button>
                                </p>
                            </div>

                            <div className="bg-white px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {ctx.comment}
                                </dd>
                            </div>
                        </div>
                    ))}
            <form onSubmit={handleSubmit}>
                <div className="shadow sm:rounded-md sm:overflow-hidden mt-6">
                    <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                        <div>
                            <div className="mt-1">
                                <textarea
                                    id="comment"
                                    name="comment"
                                    rows={5}
                                    className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md ${
                                        bug.status === 3 && "bg-gray-50"
                                    }`}
                                    placeholder={
                                        bug.status === 3
                                            ? "Locked due to issue being resolved"
                                            : "New Comment"
                                    }
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    disabled={bug.status === 3 && "disabled"}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                        <button
                            disabled={bug.status === 3 && "disabled"}
                            type="submit"
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Post
                        </button>
                    </div>
                </div>
            </form>
        </Layout>
    )
}

export async function getServerSideProps({ params: { slug, project }, req }) {
    const token = await isAuthenticated(req)

    if (!token) {
        return {
            redirect: {
                destination: "/account/login",
                permanent: false,
            },
        }
    }

    const projectRes = await fetch(`${API_URL}/projects/${project}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
    })
    const projectData = await projectRes.json()

    if (!projectRes.ok) {
        return {
            redirect: {
                destination: "/projects",
                permanent: false,
            },
        }
    }

    const bugRes = await fetch(`${API_URL}/bugs/${project}/${slug}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
    })
    const bug = await bugRes.json()

    if (!bugRes.ok) {
        return {
            redirect: {
                destination: "/projects",
                permanent: false,
            },
        }
    }

    const projectObj = !projectData.error && projectData[0]

    return {
        props: { bug, projectObj, token },
    }
}
