import Image from "next/image";
import Signin from "./auth/signin/page";

export default function Home() {
  return (
    // <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16
    //  sm:p-20 font-[family-name:var(--font-geist-sans)]">
    //   {/* <Signin/> */}
    // </div>
    // <div className="relative h-full w-full bg-neutral-900">
    //   <div className="text-white absolute inset-0 bg-fuchsia-400 bg-[size:20px_20px] opacity-20 blur-[100px]">
    //   <Signin/>dfndskjfh
    //     </div></div>

    <div>
      <Signin></Signin>
    </div>

  );
}
