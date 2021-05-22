import "react-toastify/dist/ReactToastify.css"

import { ToastContainer, toast } from "react-toastify"

import { useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { API } from "@/config/index"
import Layout from "@/components/Layout"

export default function EditProjectPage({ project, bug }) {
    const [values, setValues] = useState({
        bug_name: bug.name,
        severity: bug.severity,
        about: bug.description,
        reproduction: bug.reproduction,
        stackTrace: bug.stackTrace,
    })

    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Validation
        let hasEmptyFields = false

        const valueObject = Object.values(values)

        if (
            valueObject[0].length <= 0 ||
            valueObject[1].length <= 0 ||
            valueObject[2].length <= 0
        ) {
            hasEmptyFields = true
        }

        if (hasEmptyFields) {
            return toast.error("Empty Fields")
        }

        const res = await fetch(`${API}/bugs/${project._id}/${bug._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        })

        if (!res.ok) {
            toast.error("Something went wrong")
        } else {
            const bug = await res.json()
            router.push(`/projects/${project.slug}`)
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
                <Link href={`/projects/${project.slug}`} key={project.name}>
                    <a className="hover:text-gray-400">{project.name}</a>
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
                                        value={values.bug_name}
                                        onChange={handleInputChange}
                                        required
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
                                    value={values.severity}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                >
                                    <option value="low">Low</option>
                                    <option value="moderate">Moderate</option>
                                    <option value="critical">Critical</option>
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
                                        value={values.reproduction}
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
                                        value={values.stackTrace}
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
                                        value={values.about}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <p className="mt-2 text-sm text-gray-500">
                                    Detailed description of the bug
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                        <Link href={`/projects/${project.slug}`}>
                            <button className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Cancel
                            </button>
                        </Link>{" "}
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

export async function getServerSideProps({ params: { project, slug } }) {
    const bugRes = await fetch(`${API}/bugs/${project}/${slug}`)
    const bug = await bugRes.json()

    const projectRes = await fetch(`${API}/projects/${project}`)
    const projectObj = await projectRes.json()

    return {
        props: { bug, project: projectObj[0] },
    }
}
