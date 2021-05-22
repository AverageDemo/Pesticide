import Link from "next/link"
import { API } from "@/config/index"
import Layout from "@/components/Layout"
import ProjectTable from "@/components/ProjectTable"

export default function ProjectsPage({ projects, openCount }) {
    return (
        <Layout
            breadcrumb={[
                <Link href="/" key="Dashboard">
                    <a className="hover:text-gray-400">Dashboard</a>
                </Link>,
                <span className="text-gray-400" key="Separator">
                    {" / "}
                </span>,
                <span className="text-gray-400" key="Projects">
                    Projects
                </span>,
            ]}
        >
            {projects.length === 0 && <h3>No projects to display</h3>}
            <ProjectTable projectArray={projects} openCount={openCount} />
        </Layout>
    )
}

export async function getServerSideProps() {
    const res = await fetch(`${API}/projects`)
    const projects = await res.json()

    const openCountRes = await fetch(`${API}/projects/openCount`)
    const openCount = await openCountRes.json()

    return {
        props: { projects, openCount },
    }
}
