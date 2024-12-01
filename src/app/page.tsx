"use client";

import Signup from "./auth/signup/page";
import Signin from "./auth/signin/page";
import Dashboard from "./dashboard/page";
import { useSession } from "next-auth/react";
import { useSetRecoilState } from "recoil";
import { userId, userName } from "@/state/User";
import { trpc } from "./_trpc/client";
import { useEffect } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const setUsername = useSetRecoilState(userName);
  const setUserId = useSetRecoilState(userId);

  // Use TRPC to fetch user ID based on the email
  const { data, isLoading, error } = trpc.getId.getUsesId.useQuery(
    { email: session?.user?.email || "" },
    {
      enabled: !!session?.user?.email, // Only run the query when the email exists
    }
  );

  // Update Recoil state when session or TRPC query data changes
  useEffect(() => {
    if (session?.user && data?.id) {
      setUsername(session.user.name || "");
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
