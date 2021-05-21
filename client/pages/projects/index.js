import { API } from "@/config/index"
import Layout from "@/components/Layout"
import ProjectTable from "@/components/ProjectTable"

export default function ProjectsPage({ projects }) {
    return (
        <Layout breadcrumb="Projects">
            {projects.length === 0 && <h3>No projects to display</h3>}
            <ProjectTable projectArray={projects} />
        </Layout>
    )
}

export async function getServerSideProps() {
    const res = await fetch(`${API}/projects`)
    const projects = await res.json()

    return {
        props: { projects },
    }
}
