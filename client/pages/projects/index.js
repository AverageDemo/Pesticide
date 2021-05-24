import Link from "next/link"
import { API_URL } from "@/config/index"
import Layout from "@/components/Layout"
import ProjectTable from "@/components/ProjectTable"
import { isAuthenticated } from "@/helpers/index"

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
            page="View Projects"
        >
            <ProjectTable projectArray={projects} openCount={openCount} />
        </Layout>
    )
}

export async function getServerSideProps({ req }) {
    const auth = await isAuthenticated(req)

    if (!auth.ok) {
        return {
            redirect: {
                destination: "/account/login",
                permanent: false,
            },
        }
    }

    const res = await fetch(`${API_URL}/projects`)
    const projects = await res.json()

    const openCountRes = await fetch(`${API_URL}/bugs/openCount`)
    const openCount = await openCountRes.json()

    return {
        props: { projects, openCount },
    }
}
