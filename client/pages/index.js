import { useContext } from "react";
import { isAuthenticated } from "@/helpers/index";
import AuthContext from "@/context/AuthContext";
import Layout from "@/components/Layout";

export default function DashboardPage() {
  const { user } = useContext(AuthContext);

  return (
    <Layout breadcrumb="Dashboard">Hello {user ? user.name : "User"}</Layout>
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

  return {
    props: {},
  };
}
