"use client";

import Image from "next/image";
// import { useAccount } from "wagmi";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";
import background from "@/../public/bg.jpg";

function Login() {
  // const { isConnected } = useAccount();
  // const router = useRouter();

  // useEffect(() => {
  //   if (isConnected) {
  //     router.push("/view-candidates"); // Redirect to View Candidates page
  //   }
  // }, [isConnected, router]);

  return (
    <>
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="flex flex-row bg-white shadow-lg rounded-md overflow-hidden">
          {/* Left Image */}
          <div className="w-1/2">
            <Image
              src={background}
              alt="Voting Illustration"
              className="w-full h-full object-cover"
              width={0}
              height={0}
              sizes="100vw"
            />
          </div>
          {/* Right Login Section */}
          <div className="w-1/2 flex items-center justify-center p-10">
            <w3m-button />
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
