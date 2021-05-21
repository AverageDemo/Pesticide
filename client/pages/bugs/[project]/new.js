import Link from "next/link"
import { API } from "@/config/index"
import Layout from "@/components/Layout"

export default function NewBugPage({ projectObj }) {
    return (
        <Layout
            breadcrumb={[
                <Link href={`/projects/${projectObj.slug}`}>
                    <a className="italic hover:text-indigo-900">
                        {projectObj.name}
                    </a>
                </Link>,
                " > New Bug",
            ]}
        >
            <h1>This is where the new bug form will be</h1>
        </Layout>
    )
}

export async function getServerSideProps({ params: project }) {
    const projectRes = await fetch(`${API}/projects/${project.project}`)
    const projectObj = await projectRes.json()

    return {
        props: { projectObj: projectObj[0] },
    }
}
