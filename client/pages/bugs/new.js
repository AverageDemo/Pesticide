import { API } from "@/config/index"
import Layout from "@/components/Layout"

export default function NewBugPage() {
    return (
        <Layout breadcrumb="New Bug">
            <h1>This is where the new bug form will be</h1>
        </Layout>
    )
}

export async function getServerSideProps() {
    return {
        props: {},
    }
}
