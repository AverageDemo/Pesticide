import "react-toastify/dist/ReactToastify.css"

import { ToastContainer, toast } from "react-toastify"

import { useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { API } from "@/config/index"
import Layout from "@/components/Layout"

export default function NewProjectPage() {
    const [values, setValues] = useState({
        project_name: "",
        about: "",
    })

    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Validation
        const hasEmptyFields = Object.values(values).some(
            (element) => element === ""
        )

        if (hasEmptyFields) {
            return toast.error("Empty Fields")
        }

        const res = await fetch(`${API}/projects/new`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        })

        if (!res.ok) {
            console.log(res)
            toast.error("Project with the same title already exists")
        } else {
            const project = await res.json()
            router.push(`/projects/${project.slug}`)
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setValues({ ...values, [name]: value })
    }

    return (
        <Layout breadcrumb="New Project">
            <ToastContainer />
            <form onSubmit={handleSubmit}>
                <div className="shadow sm:rounded-md sm:overflow-hidden">
                    <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                        <div className="grid grid-cols-3 gap-6">
                            <div className="col-span-3 sm:col-span-2">
                                <label
                                    htmlFor="project_name"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Project Name
                                </label>
                                <div className="mt-1 flex rounded-md shadow-sm">
                                    <input
                                        type="text"
                                        name="project_name"
                                        id="project_name"
                                        className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-md sm:text-sm border-gray-300"
                                        placeholder="Project Name"
                                        value={values.name}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
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
                                Brief description of the project
                            </p>
                        </div>
                    </div>
                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                        <Link href="/projects">
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

export async function getServerSideProps() {
    return {
        props: {},
    }
}