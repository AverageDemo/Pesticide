import { API } from "@/config/index"
import Layout from "@/components/Layout"
import BugTable from "@/components/BugTable"

export default function BugTestPage({ bugs, project }) {
    return (
        <Layout breadcrumb={`${project.name} Bugs`}>
            {bugs.length === 0 && <h3>No bugs to display</h3>}
            <BugTable bugArray={bugs} project={project} />
        </Layout>
    )
}

export async function getServerSideProps({ params: { slug } }) {
    const bugRes = await fetch(`${API}/bugs/${slug}/bugs`)
    const bugs = await bugRes.json()

    const projectRes = await fetch(`${API}/projects/${slug}`)
    const project = await projectRes.json()

    return {
        props: { bugs, project: project[0] },
    }
}
