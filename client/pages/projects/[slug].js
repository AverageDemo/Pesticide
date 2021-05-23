import { useEffect } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { API } from "@/config/index"
import Layout from "@/components/Layout"
import BugTable from "@/components/BugTable"

export default function ProjectPage({ bugs, project }) {
    const router = useRouter()

    useEffect(() => {
        !project && router.push("/")
    })

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
                <span className="text-gray-400" key={project.name}>
                    {project.name}
                </span>,
            ]}
        >
            <BugTable bugArray={bugs} project={project} />
        </Layout>
    )
}

export async function getServerSideProps({ params: { slug } }) {
    const bugRes = await fetch(`${API}/bugs/${slug}/bugs`)
    const bugs = await bugRes.json()

    const projectRes = await fetch(`${API}/projects/${slug}`)
    const projectData = await projectRes.json()

    const project = !projectData.error && projectData[0]

    return {
        props: { bugs, project },
    }
}
