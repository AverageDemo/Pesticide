import Link from "next/link"
import { PencilIcon } from "@heroicons/react/solid"

export default function ProjectTable({ projectArray }) {
    return (
        <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="pb-3 text-right">
                        <Link href="/projects/new">
                            <button className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                New Project
                            </button>
                        </Link>
                    </div>
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
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
                                        className="px-1 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Open Issues
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-1 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {projectArray.map((project) => (
                                    <tr key={project.name}>
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">
                                                        <Link
                                                            href={`/projects/${project.slug}`}
                                                        >
                                                            <a className="hover:text-indigo-900">
                                                                {project.name}
                                                            </a>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {project.description}
                                            </div>
                                        </td>
                                        <td className="px-1 py-4 whitespace-nowrap">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-green-800">
                                                0
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <Link href="#">
                                                <a className="hover:text-indigo-900">
                                                    <PencilIcon className="h-5 w-5" />
                                                </a>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
