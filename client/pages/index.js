import Link from "next/link"
import { API } from "@/config/index"
import Layout from "@/components/Layout"

export default function HomePage() {
    return <Layout breadcrumb="Dashboard">Nothing to display yet</Layout>
}

export async function getServerSideProps() {
    return {
        props: {},
    }
}
