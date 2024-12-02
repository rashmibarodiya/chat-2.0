
import { trpc } from "../_trpc/client"

interface sendMsgProp {
    receiver: number,
    senderMail: string,
    msg: string,
}


export default function sendMsg({ receiver, senderMail, msg }: sendMsgProp) {
    const { mutate, isLoading, error } = trpc.chat.sendMsg.useMutation()
    const res = mutate({
        senderMail,
        receiver,
        mes: msg
    })
    return res
}