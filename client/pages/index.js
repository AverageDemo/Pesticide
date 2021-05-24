import { useContext } from "react"
import AuthContext from "@/context/AuthContext"
import { isAuthenticated } from "@/helpers/index"
import Layout from "@/components/Layout"

export default function DashboardPage() {
    const { user } = useContext(AuthContext)

    return <Layout breadcrumb="Dashboard">Hello {user.name}</Layout>
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
