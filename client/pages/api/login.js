import cookie from "cookie"
import { API_URL } from "@/config/index"

export default async (req, res) => {
    if (req.method === "POST") {
        const { email, password } = req.body

        const apiRes = await fetch(`${API_URL}/auth`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        })

        const data = await apiRes.json()

        if (apiRes.ok) {
            res.setHeader(
                "Set-Cookie",
                cookie.serialize("token", data.jwt, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== "development",
                    maxAge: 60 * 60 * 24 * 7, // 1 Week
                    sameSite: "strict",
                    path: "/",
                })
            )
            res.status(200).json({ user: data.user })
        } else {
            res.status(400).json({ errors: data.errors })
        }
    } else {
        res.setHeader("Allow", ["POST"])
        res.status(405).json({ message: `Method ${req.method} not allowed` })
    }
}
