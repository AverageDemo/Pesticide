import Link from "next/link";
import { API_URL } from "@/config/index";
import { isAuthenticated } from "@/helpers/index";
import Layout from "@/components/Layout";
import ProjectTable from "@/components/ProjectTable";

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
  );
}

export async function getServerSideProps({ req }) {
  const token = await isAuthenticated(req);

  if (!token) {
    return {
      redirect: {
        destination: "/account/login",
        permanent: false,
      },
    };
  }

  const res = await fetch(`${API_URL}/projects`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  const projects = await res.json();

  const openCountRes = await fetch(`${API_URL}/bugs/openCount`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  const openCount = await openCountRes.json();

  return {
    props: { projects, openCount },
  };
}
