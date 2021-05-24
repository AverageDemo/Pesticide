import { isAuthenticated, parseCookies } from "@/helpers/index"
import Layout from "@/components/Layout"

export default function DashboardPage() {
    return <Layout breadcrumb="Dashboard">Nothing to display yet</Layout>
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

    return {
        props: {},
    }
}
