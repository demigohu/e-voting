import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="p-4 bg-gray-800 text-white">
      <ul className="flex space-x-4">
        <li>
          <Link href="/view-candidates">View Candidates</Link>
        </li>
        <li>
          <Link href="/add-candidate">Add Candidate</Link>
        </li>
        <li>
          <Link href="/vote">Vote</Link>
        </li>
        <li>
          <w3m-button />
        </li>
      </ul>
    </nav>
  );
}
