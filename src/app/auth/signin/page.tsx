
"use client"

import Credentials from "next-auth/providers/credentials"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { useState } from "react"
import GoogleSignin from "@/provider/signInButton"

export default function Signin() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    // const [email, setEmail] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const session = useSession()

    const handleSubmit = async () => {
        if (!username || !password) {
            setError("Please fill the all details")
            alert("Please fill the all details")
            return
        }
        try {


            const response = await signIn('credentials', {
                redirect: false,
                username: username,
                password: password,
            })


            if (response?.ok) {
                router.push("/")
                setLoading(false)
            } else {
                console.log("signin failed", response?.error)
                setLoading(false)
            }
        } catch (e) {
            console.log(e)
            alert("error " + e)
        }

    }
    return (
        <div className="flex items-center justify-center ">
            <div className="h-full items-center lg:w-1/4 bg-gray-200 rounded-md bg-clip-padding backdrop-filter
         backdrop-blur-sm bg-opacity-40 border border-gray-100">
                <div className="p-4 rounded-lg shadow-md max-w-sm mx-auto">
                    <h2 className="text-2xl  text-center  mb-6">Sign In</h2>

                    <input
                        className="w-full rounded-lg p-3 mb-4 text-blue-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Username/Email"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        className="w-full rounded-lg p-3 mb-4 text-blue-900 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-lg py-3 font-medium transition duration-300"
                        onClick={() => handleSubmit()}
                    >
                        Submit
                    </button>

                    <div className="text-center my-4 text-gray-800">or</div>

                    <GoogleSignin providerId={"google"} providerName={"google"} />

                    Don't have an accont? <button className="text-blue-500 hover:scale-50"
                        onClick={() => {
                            router.push("./signup")
                        }}
                    >Register</button>
                </div>






            </div>

        </div>
    )
} 