
"use client"
import Image from "next/image";
import Signup from "./auth/signup/page";
import Signin from "./auth/signin/page";
import Dashboard from "./dashboard/page";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession()

  return (
    // <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16
    //  sm:p-20 font-[family-name:var(--font-geist-sans)]">
    //   {/* <Signin/> */}
    // </div>
    // <div className="relative h-full w-full bg-neutral-900">
    //   <div className="text-white absolute inset-0 bg-fuchsia-400 bg-[size:20px_20px] opacity-20 blur-[100px]">
    //   <Signin/>dfndskjfh
    //     </div></div>

    <div >
      {/* bg-gradient-to-b from-gray-400 via-gray-600 to-gray-800  */}
      {/* <div className="bg-gradient-to-r from-cyan-200 to-stone-500"> */}

      {(status == "loading") ? (
        <div></div>
      ) : (session?.user) ? (
        <div>
          
          <Dashboard />
        </div>
      ) : (<div>
        <Signup/>
        {/* <Signin></Signin> */}
      </div>)}

      {/* <Signin></Signin> */}
    </div>

  );
}
