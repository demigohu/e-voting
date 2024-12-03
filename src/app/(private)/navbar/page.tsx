import Link from "next/link";
import ClaimToken from "../vtk-claim/page";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="fixed top-5 z-50 text-white left-0 w-full flex items-center justify-center gap-20">
      <Link href="/candidates">View Candidates</Link>
      <Link href="/add-candidate">Add Candidate</Link>
      <Link href="/vote">Vote</Link>
      <Button variant={"secondary"}>
        <w3m-button />
      </Button>
      <ClaimToken />
    </nav>
  );
}
