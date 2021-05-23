import Link from "next/link"
import moment from "moment"
import { PencilIcon } from "@heroicons/react/solid"

export default function BugTable({ bugArray, project }) {
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

    return (
        <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="pb-3 text-right">
                        <Link href={`/projects/${project.slug}/edit`}>
                            <button className="inline-flex justify-center mr-2 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                                Edit Project
                            </button>
                        </Link>

                        <Link href={`/bugs/${project.slug}/new`}>
                            <button className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                New Bug
                            </button>
                        </Link>
                    </div>
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Name
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Description
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Status
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Severity
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Assigned To
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Submission Date
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {bugArray.length > 0 ? (
                                    bugArray.map((bug) => (
                                        <tr key={bug.name}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900">
                                                            <Link
                                                                href={`/bugs/${project.slug}/${bug.slug}`}
                                                            >
                                                                <a className="hover:text-gray-600">
                                                                    {bug.name}
                                                                </a>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    {bug.description}
                                                </div>
                                                {/* <div className="text-sm text-gray-500">Category</div> */}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span
                                                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-white ${
                                                        Object.values(
                                                            statusOptions
                                                        )[bug.status]
                                                    }`}
                                                >
                                                    {
                                                        Object.keys(
                                                            statusOptions
                                                        )[bug.status]
                                                    }
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <span
                                                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-white ${
                                                        severityOptions[
                                                            bug.severity
                                                        ]
                                                    }`}
                                                >
                                                    {bug.severity}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                User
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {moment(bug.date).format(
                                                    "MM-DD-yyyy"
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <Link
                                                    href={`/bugs/${project.slug}/${bug.slug}/edit`}
                                                >
                                                    <a className="hover:text-gray-600">
                                                        <PencilIcon className="h-5 w-5" />
                                                    </a>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            No bugs to display
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
