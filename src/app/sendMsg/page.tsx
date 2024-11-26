"use client"

import { useState } from "react"
import { trpc } from "../_trpc/client"
import { number } from "zod"

export default function send() {
    const [sender, setSender] = useState("")
    const [reciever, setReciever] = useState("")
    const [msg, setMsg] = useState("")
    const { mutate, isLoading, error } = trpc.chat.sendMsg.useMutation()
    const handleSend = async () => {
      
        mutate({
            sender: parseInt(sender), 
            receiver: parseInt(reciever), 
            mes: msg,
        })
    }
    return (
        <div>
            <input
                placeholder="type your msg..."
                className="rounded-sm border p-2 "
                onChange={(e) => setMsg(e.target.value)}
            >
            </input>
            <input
                placeholder="senderId"
                className="rounded-sm border p-2 "
                onChange={(e) => setSender(e.target.value)}
                type="number"
            ></input>
            <input
                placeholder="RecieverId"
                className="rounded-sm border p-2 "
                onChange={(e) => setReciever(e.target.value)}
                type="number"
            ></input>
            <button className="bg-blue-500 text-white rounded-sm p-2"
                onClick={() => handleSend()}
            >Send</button>

        </div>
    )
}