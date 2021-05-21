import Link from "next/link"
import { API } from "@/config/index"
import Layout from "@/components/Layout"

export default function BugTestPage({ bug, projectObj }) {
    return (
        <Layout
            breadcrumb={[
                <Link href={`/projects/${projectObj.slug}`}>
                    <a className="italic hover:text-indigo-900">
                        {projectObj.name}
                    </a>
                </Link>,
                " > ",
                bug.name,
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
