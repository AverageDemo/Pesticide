import Link from "next/link";
import { useContext } from "react";
import { isAuthenticated } from "@/helpers/index";
import AuthContext from "@/context/AuthContext";
import { API_URL } from "@/config/index";
import Layout from "@/components/Layout";
import BugTable from "@/components/BugTable";

export default function ProjectPage({ bugs, project }) {
  const { user } = useContext(AuthContext);

  return (
    <Layout
      breadcrumb={[
        <Link href="/" key="Dashboard">
          <a className="hover:text-gray-400">Dashboard</a>
        </Link>,
        <span className="text-gray-400" key="Separator">
          {" / "}
        </span>,
        <Link href="/projects" key="Projects">
          <a className="hover:text-gray-400">Projects</a>
        </Link>,
        <span className="text-gray-400" key="Separator2">
          {" / "}
        </span>,
        <span className="text-gray-400" key={project.name}>
          {project.name}
        </span>,
      ]}
      page={project.name}
    >
      <BugTable bugArray={bugs} project={project} user={user} />
    </Layout>
  );
}

export async function getServerSideProps({ params: { slug }, req }) {
  const token = await isAuthenticated(req);

  if (!token) {
    return {
      redirect: {
        destination: "/account/login",
        permanent: false,
      },
    };
  }

  const projectRes = await fetch(`${API_URL}/projects/${slug}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  const projectData = await projectRes.json();

  if (!projectRes.ok) {
    return {
      redirect: {
        destination: "/projects",
        permanent: false,
      },
    };
  }

  const bugRes = await fetch(`${API_URL}/bugs/${slug}/bugs`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  const bugs = await bugRes.json();
  const project = projectData[0];

  return {
    props: { bugs, project },
  };
}
