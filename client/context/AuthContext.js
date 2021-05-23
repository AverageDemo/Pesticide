import { createContext, useState, useEffect } from "react"
import { useRouter } from "next/router"
import { API } from "@/config/index"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)

    // Register
    const register = async (user) => {
        console.log(user)
    }

    // Login
    const login = async ({ email, password }) => {
        console.log({ email, password })
    }

    // Logout
    const logout = async () => {
        console.log("Logout")
    }

    // Check if user is logged in
    const isLoggedIn = async () => {
        console.log("Check")
    }

    return (
        <AuthContext.Provider value={{ user, error, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
