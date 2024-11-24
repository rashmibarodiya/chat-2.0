import { signIn } from "next-auth/react"

interface GoogleSigninProp {
    providerId: string,
    providerName: string
}

export default function GoogleSignin({ providerId, providerName }: GoogleSigninProp) {
    return (
        <div>

            <button
                onClick={() => signIn(providerId)}
                className="text-white bg-blue-500 p-4 rounded-sm ">Continue with google</button>
        </div>
    )
}