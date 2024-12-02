"use client";

import Signup from "./auth/signup/page";
import Dashboard from "./dashboard/page";
import { useSession } from "next-auth/react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { userId, userName } from "@/state/User";
import { trpc } from "./_trpc/client";
import { useEffect } from "react";



export default function Home() {
  const { data: session, status } = useSession();
  const setUsername = useSetRecoilState(userName);
  const setUserId = useSetRecoilState(userId);
  // const idd = typeof window !== "undefined" ? useRecoilValue(userName) : null;

  const { data, isLoading, error } = trpc.getId.getUsesId.useQuery(
    { email: session?.user?.email || "" },
    {
      enabled: !!session?.user?.email, // Only run the query when the email exists
    }
  );

  // const{data:convId} = trpc.getConvId.getConvId.useQuery({

  // })
  useEffect(() => {
    if (session?.user && data?.id) {
      console.log("this is seession user " ,session.user)
      setUsername(session.user.name ||"abc");
      setUserId(data.id); // Use the fetched ID from TRPC
    }
  }, [session, data, setUsername, setUserId]);






  return (
    <div>
      {status === "loading" ? (
        <div>Loading...</div>
      ) : session?.user ? (
        <Dashboard />
      ) : (
        <Signup />
      )}
    </div>
  );
}
