

import {atom} from "recoil"

export const userName = atom({
    key:"userName",
    default:""
})
export const userId = atom({
    key:"userId",
    default:0
})

export const receiver = atom({
    key:"receiver",
    default:0
})