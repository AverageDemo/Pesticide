import Head from "next/head"
import Header from "./Header"
import { useRouter } from "next/router"

export default function Layout({
    title,
    keywords,
    description,
    children,
    breadcrumb,
}) {
    const router = useRouter()

    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
            </Head>

            <Header breadcrumb={breadcrumb} />

            <main>
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    <div className="px-4 py-6 sm:px-0">{children}</div>
                </div>
            </main>
        </div>
    )
}

Layout.defaultProps = {
    title: "Pesticide",
    description: "Bugtracking software",
    keywords: "bugtrack",
    breadcrumb: "Breadcrumb",
}
