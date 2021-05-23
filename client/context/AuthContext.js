import { createContext, useState, useEffect } from "react"
import { useRouter } from "next/router"
import { NEXT_URL } from "@/config/index"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [errors, setErrors] = useState(null)

    const router = useRouter()

    useEffect(() => isLoggedIn(), [])

    // Register
    const register = async (user) => {
        console.log(user)
    }

    // Login
    const login = async ({ email, password }) => {
        const res = await fetch(`${NEXT_URL}/api/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        })

        const data = await res.json()

        if (res.ok) {
            setUser(data.user)
            router.push("/")
        } else {
            setErrors(data.errors)
            setErrors(null)
        }
    }

    // Logout
    const logout = async () => {
        console.log("Logout")
    }

    // Check if user is logged in
    const isLoggedIn = async () => {
        const res = await fetch(`${NEXT_URL}/api/user`)
        const data = await res.json()

        if (res.ok) {
            setUser(data.user)
        } else {
            setUser(null)
        }
    }

    return (
        <AuthContext.Provider value={{ user, errors, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
