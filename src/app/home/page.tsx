"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { trpc } from "../_trpc/client";

export default function Home() {
    const { data: session } = useSession();
    const [name, setName] = useState("");

    // Call the `check` query
    const { data: check, isLoading, error } = trpc.chat.check.useQuery();

    useEffect(() => {
        if (session) {
            console.log("hiiiii");
            console.log("session ", session);
        } else {
            console.log("biiiii");
        }
    }, [session]);

    return (
        <div>
            <p>Home</p>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {check && <p>{check}</p>}
        </div>
    );
}
