import "react-toastify/dist/ReactToastify.css"

import { ToastContainer, toast } from "react-toastify"

import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { API } from "@/config/index"
import Layout from "@/components/Layout"

export default function NewBugPage({ projectObj }) {
    const router = useRouter()

    useEffect(() => {
        !projectObj && router.push("/projects")
    })

    const [values, setValues] = useState({
        bug_name: "",
        severity: "Low",
        about: "",
        reproduction: "",
        stackTrace: "",
        project: projectObj._id,
    })

    const handleSubmit = async (e) => {
        e.preventDefault()

        const res = await fetch(`${API}/bugs/new`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        })

        const bug = await res.json()

        if (!res.ok) {
            bug.errors.map((error) => {
                toast.error(error.msg)
            })
        } else {
            router.push(`/bugs/${projectObj.slug}/${bug.slug}`)
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setValues({ ...values, [name]: value })
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

                <span className="text-gray-400" key="Bug">
                    New Bug
                </span>,
            ]}
        >
            <ToastContainer />
            <form onSubmit={handleSubmit}>
                <div className="shadow sm:rounded-md sm:overflow-hidden">
                    <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                        <div className="grid grid-cols-6 gap-6">
                            <div className="col-span-6 sm:col-span-3">
                                <label
                                    htmlFor="bug_name"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Bug Name
                                </label>
                                <div className="mt-1 flex rounded-md shadow-sm">
                                    <input
                                        type="text"
                                        name="bug_name"
                                        id="bug_name"
                                        className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-md sm:text-sm border-gray-300"
                                        placeholder="Project Name"
                                        value={values.name}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <label
                                    htmlFor="severity"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Severity
                                </label>
                                <select
                                    id="severity"
                                    name="severity"
                                    autoComplete="severity"
                                    value={values.name}
                                    defaultValue="Low"
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                >
                                    <option value="Low">Low</option>
                                    <option value="Moderate">Moderate</option>
                                    <option value="High">High</option>
                                    <option value="Critical">Critical</option>
                                </select>
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <label
                                    htmlFor="reproduction"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Steps to reproduce
                                </label>
                                <div className="mt-1">
                                    <textarea
                                        id="reproduction"
                                        name="reproduction"
                                        rows={8}
                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                                        placeholder="Lorem ipsum..."
                                        defaultValue={""}
                                        value={values.name}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <label
                                    htmlFor="stackTrace"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Stack Trace
                                </label>
                                <div className="mt-1">
                                    <textarea
                                        id="stackTrace"
                                        name="stackTrace"
                                        rows={8}
                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                                        placeholder="Lorem ipsum..."
                                        defaultValue={""}
                                        value={values.name}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <div className="col-span-12 sm:col-span-6">
                                <label
                                    htmlFor="about"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    About
                                </label>
                                <div className="mt-1">
                                    <textarea
                                        id="about"
                                        name="about"
                                        rows={8}
                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                                        placeholder="Lorem ipsum..."
                                        defaultValue={""}
                                        value={values.name}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <p className="mt-2 text-sm text-gray-500">
                                    Detailed description of the bug
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                        <Link href={`/projects/${projectObj.slug}`}>
                            <button className="inline-flex justify-center mr-2 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Cancel
                            </button>
                        </Link>
                        <button
                            type="submit"
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </form>
        </Layout>
    )
}

export async function getServerSideProps({ params: project }) {
    const projectRes = await fetch(`${API}/projects/${project.project}`)
    const projectData = await projectRes.json()

    const projectObj = !projectData.error && projectData[0]

    return {
        props: { projectObj: projectObj },
    }
}
