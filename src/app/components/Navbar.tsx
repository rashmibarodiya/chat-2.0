import { signOut } from "next-auth/react"

export default function Navbar(){
    return(
        <div className="flex flex-wrap shadow-lg p-2 justify-between">
            <div>
                Let{"'"}sTalk
            </div>
            <div className="flex flex-wrap justify-between gap-4">
                <span>settings</span>
                <span>profile</span>
                <button
                onClick={()=>{signOut}}
                 className="cursosr-pointer">logout</button>
            </div>
           
        </div>
    )
}