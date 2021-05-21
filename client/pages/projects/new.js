import { API } from "@/config/index"
import Layout from "@/components/Layout"

export default function NewProjectPage() {
    return (
        <Layout breadcrumb="New Project">
            <h1>This is where the new project form will be</h1>
        </Layout>
    )
}

export async function getServerSideProps() {
    return {
        props: {},
    }
}
