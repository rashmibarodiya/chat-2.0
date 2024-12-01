
import { trpc } from "../_trpc/client"

interface sendMsgProp {
    receiver: number,
    sender: number,
    msg: string,
}


export default function sendMsg({ receiver, sender, msg }: sendMsgProp) {
    const { mutate, isLoading, error } = trpc.chat.sendMsg.useMutation()
    const res = mutate({
        sender,
        receiver,
        mes: msg
    })
    return res
}