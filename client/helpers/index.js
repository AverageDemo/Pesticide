import cookie from "cookie"
import { API_URL } from "@/config/index"

export function parseCookies(req) {
    return cookie.parse((req && req.headers.cookie) || "")
}

export async function isAuthenticated(req) {
    const { token } = cookie.parse((req && req.headers.cookie) || "")
    const res = await fetch(`${API_URL}/auth`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    return res
}
