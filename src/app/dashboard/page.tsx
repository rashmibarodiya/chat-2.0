import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { trpc } from "../_trpc/client";
import { User, UsersSchema } from "../../types/User";

export default function Dashboard() {
    const { data: users, isLoading, error } = trpc.getAll.getUser.useQuery();
    const [msg, setMsg] = useState("")
    const [userList, setUserList] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User>();


    useEffect(() => {
        if (users) {
            const validatedUsers = UsersSchema.parse(users.users);
            setUserList(validatedUsers);
        }
    }, [users]);
const handleMsgSubmit = async() =>{

}

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="h-full items-center bg-gray-200 rounded-md bg-clip-padding backdrop-filter
     backdrop-blur-sm bg-opacity-20  m-4 lg:m-20">
            <Navbar />
            <div className="w-full flex flex-wrap">
                {/* List of users */}
                <div className="w-full lg:w-1/2 h-full">
                    <ul className=" ">
                        {userList.map((user) => (
                            <div>
                                <li key={user.id}
                                    onClick={() => {
                                        setSelectedUser(user)
                                    }}
                                    className={`cursor-pointer lg:pl-6 ${selectedUser?.id === user.id ? "bg-cyan-900 text-white p-3 rounded-sm" : ""
                                        }`}
                                >
                                    {user.name || user.username}

                                </li>
                                <hr className="my-2 border-gray-300" />
                            </div>

                        ))}
                    </ul>
                </div>

                <div className="w-full lg:w-1/2 flex-1 ">
                    {selectedUser === null ? (
                        <div>
                            <h1 className="flex justify-center mt-5 text-2xl">Welcome back, LetsTalk</h1>
                        </div>
                    ) : <div>
                        <div className="font-semibold">
                            {selectedUser?.name || selectedUser?.username}
                        </div>
                        {/* Spacer to push the input to the bottom */}
                        <div className="flex-grow overflow-y-auto p-4">
                            {/* Chat messages */}
                            <p>Chat messages will appear here...</p>
                        </div>

                        <div className="flex justify-between">
                            <input className="mt-19 bg-cyan-900 w-5/6 p-3"
                                onChange={(e) => setMsg(e.target.value)}
                                placeholder="Type here..."
                            ></input>
                            <button className="w-1/6"
                            
                            onClick={handleMsgSubmit}
                            
                            >Send</button>
                        </div>
                    </div>

                    }

                </div>
            </div>


            {/* Right section for chat */}

        </div>
    );
}
