
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
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const session = useSession()

    const handleSubmit = async () => {
        if (!username || !password || !email) {
            setError("Please fill the all details")
            alert("Please fill the all details")
            return
        }
try{


        const response = await signIn('credentials', {
            redirect: false,
            username: username,
            password: password,
            email: email
        })


        if (response?.ok) {
            router.push("/")
            setLoading(false)
        } else {
            console.log("signin failed", response?.error)
            setLoading(false)
        }
    }catch(e){
        console.log(e)
        alert("error "+e)
    }

    }
    return (
        <div className="items-center p-4">

            <div className="border p-4">
                
                <input className=" border" placeholder="username"
                    onChange={(e) => setUsername(e.target.value)}
                ></input>
                <input className=" border" placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                ></input>
                <input className=" border" placeholder="email"
                    onChange={(e) => setEmail(e.target.value)}
                ></input>

                <button
                    className="bg-blue-500 text-white rounded-sm p-2 cursor-pointer"
                    onClick={() => handleSubmit()}
                >Submit</button>
                <br/>
                or

                <GoogleSignin providerId={"google"} providerName={"google"}></GoogleSignin>
            </div>

            {/* <Signin></Signin> */}
        </div>
    )
} 