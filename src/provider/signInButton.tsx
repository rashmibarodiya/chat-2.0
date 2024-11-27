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
                className="text-white w-full rounded-md bg-blue-500 p-3 hover:bg-blue-600 ">Continue with google</button>
        </div>

        
    )
}