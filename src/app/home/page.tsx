
"use client"
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Home(){

    const {data:session} = useSession()
    const [name,setName] = useState("")
    useEffect(()=>{
        if(session){
            console.log("hiiiii")
            console.log("session " ,session)
        }
        else{
            console.log("biiiii")
        }
    },[session])
    return(
        <div>
home
        </div>
    )
}