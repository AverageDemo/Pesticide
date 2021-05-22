import Link from "next/link"
import { API } from "@/config/index"
import Layout from "@/components/Layout"

export default function BugPage({ bug, projectObj }) {
    return (
        <Layout
            breadcrumb={[
                <Link href="/">
                    <a className="hover:text-gray-400">Dashboard</a>
                </Link>,
                <span className="text-gray-400"> / </span>,
                <Link href="/projects">
                    <a className="hover:text-gray-400">Projects</a>
                </Link>,
                <span className="text-gray-400"> / </span>,
                <Link href={`/projects/${projectObj.slug}`}>
                    <a className="hover:text-gray-400">{projectObj.slug}</a>
                </Link>,
                <span className="text-gray-400"> / </span>,
                <span className="text-gray-400">{bug.name}</span>,
            ]}
        >
            Bug content for {bug.name}
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
