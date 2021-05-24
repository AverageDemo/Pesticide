import { isAuthenticated } from "@/helpers/index"
import Layout from "@/components/Layout"

export default function DashboardPage() {
    return <Layout breadcrumb="Dashboard">Nothing to display yet</Layout>
}

export async function getServerSideProps({ req }) {
    const token = await isAuthenticated(req)

    if (!token) {
        return {
            redirect: {
                destination: "/account/login",
                permanent: false,
            },
        }
    }

    return {
        props: {},
    }
}
