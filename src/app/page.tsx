"use client"

import Login from "../app/login/page"
import AddCandidate from "../app/add-candidate/page"
import ViewCandidates from "../app/view-candidates/page"
import Vote from "../app/vote/page"
import AppKit from "../context/"
import Navbar from "../app/navbar/page"
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";

export default function Home() {
  const { isConnected } = useAccount();
  const router = useRouter();

  // Jika wallet belum terhubung, tampilkan halaman login
  // if (!isConnected) {
  //   return <Login />;
  // }

  // // return <ViewCandidates />;


  return (
    <div>
      <Navbar/>
      <Login/>
      
      {/* <AddCandidate />
      <ViewCandidates />
      <Vote /> */}
    </div>
  );
}
