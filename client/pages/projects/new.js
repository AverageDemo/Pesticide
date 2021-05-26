import "react-toastify/dist/ReactToastify.css";

import { ToastContainer, toast } from "react-toastify";

import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { API_URL } from "@/config/index";
import { isAuthenticated } from "@/helpers/index";
import Layout from "@/components/Layout";

export default function NewProjectPage({ token }) {
  const [values, setValues] = useState({
    project_name: "",
    about: "",
  });

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${API_URL}/projects/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    });

    const project = await res.json();

    if (!res.ok) {
      project.errors.map((error) => {
        toast.error(error.msg);
      });
    } else {
      router.push(`/projects/${project.slug}`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

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
        <span className="text-gray-400" key="Separator 2">
          {" / "}
        </span>,
        <span className="text-gray-400" key="New Project">
          New Project
        </span>,
      ]}
      page="New Project"
    >
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-3 sm:col-span-2">
                <label
                  htmlFor="project_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Project Name
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    name="project_name"
                    id="project_name"
                    className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-md sm:text-sm border-gray-300"
                    placeholder="Project Name"
                    value={values.name}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="about"
                className="block text-sm font-medium text-gray-700"
              >
                About
              </label>
              <div className="mt-1">
                <textarea
                  id="about"
                  name="about"
                  rows={8}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Lorem ipsum..."
                  defaultValue={""}
                  value={values.name}
                  onChange={handleInputChange}
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Brief description of the project
              </p>
            </div>
          </div>
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <Link href="/projects">
              <button className="inline-flex justify-center mr-2 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Cancel
              </button>
            </Link>
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save
            </button>
          </div>
        </div>
      </form>
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

  return {
    props: { token },
  };
}
