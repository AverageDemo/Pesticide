import { API_URL } from "@/config/index";

export default async (req, res) => {
  if (req.method === "POST") {
    const { name, email, password, passwordConfirm } = req.body;

    const apiRes = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        passwordConfirm,
      }),
    });

    const data = await apiRes.json();

    if (apiRes.ok) {
      res.status(200).json({
        user: data.user,
        message: "This acccount is not yet verified. Contact an admin",
      });
    } else {
      res.status(400).json({ errors: data.errors });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
