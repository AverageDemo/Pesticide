import Layout from "@/components/Layout"

export default function DashboardPage() {
    return <Layout breadcrumb="Dashboard">Nothing to display yet</Layout>
}

export async function getServerSideProps() {
    return {
        props: {},
    }
}
