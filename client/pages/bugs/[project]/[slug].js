import "react-toastify/dist/ReactToastify.css"

import { ToastContainer, toast } from "react-toastify"

import Link from "next/link"
import moment from "moment"
import { API } from "@/config/index"
import Layout from "@/components/Layout"
import { useRouter } from "next/router"

export default function BugPage({ bug, projectObj }) {
    const router = useRouter()

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

    const handleDeleteBtn = async (e) => {
        if (confirm("Are you sure?")) {
            const res = await fetch(`${API}/bugs/${bug._id}`, {
                method: "DELETE",
            })

            const data = await res.json()

            !res.ok
                ? toast.error(data.message)
                : router.push(`/projects/${projectObj.slug}`)
        }
    }

    const handleReopenBtn = async (e) => {
        const res = await fetch(`${API}/bugs/${bug._id}/status`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: 1 }),
        })

        if (!res.ok) {
            toast.error("Something went wrong")
        } else {
            const bug = await res.json()
            router.reload()
        }
    }

    const handleReviewBtn = async (e) => {
        const res = await fetch(`${API}/bugs/${bug._id}/status`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: 2 }),
        })

        if (!res.ok) {
            toast.error("Something went wrong")
        } else {
            const bug = await res.json()
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
                    {" "}
                    /{" "}
                </span>,
                <Link href="/projects" key="Projects">
                    <a className="hover:text-gray-400">Projects</a>
                </Link>,
                <span className="text-gray-400" key="Separator2">
                    {" "}
                    /{" "}
                </span>,
                <Link
                    href={`/projects/${projectObj.slug}`}
                    key={projectObj.name}
                >
                    <a className="hover:text-gray-400">{projectObj.slug}</a>
                </Link>,
                <span className="text-gray-400" key="Separator3">
                    {" "}
                    /{" "}
                </span>,
                <span className="text-gray-400" key={bug.name}>
                    {bug.name}
                </span>,
            ]}
        >
            <ToastContainer />
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                        {bug.name}
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        {moment(bug.date).format("LLLL") + " EST"}
                    </p>
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
                    <div className="px-4 py-3 bg-white text-right sm:px-6">
                        {/* Only show this button if admin / lead dev */}
                        <button
                            onClick={handleDeleteBtn}
                            className="inline-flex justify-center rounded-md border border-transparent shadow-sm mr-2 px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                            Delete
                        </button>
                        {bug.status === 0 ? (
                            <button className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                                Assign to user
                            </button>
                        ) : bug.status === 1 ? (
                            <button
                                onClick={handleReviewBtn}
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Mark for Review
                            </button>
                        ) : (
                            bug.status === 2 && (
                                <button
                                    onClick={handleReopenBtn}
                                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                >
                                    Re-Open
                                </button>
                            )
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export async function getServerSideProps({ params: { slug, project } }) {
    const bugRes = await fetch(`${API}/bugs/${project}/${slug}`)
    const bug = await bugRes.json()

    const projectRes = await fetch(`${API}/projects/${project}`)
    const projectObj = await projectRes.json()

    return {
        props: { bug, projectObj: projectObj[0] },
    }
}
