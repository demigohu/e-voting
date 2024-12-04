"use client";

import Link from "next/link";
import ClaimToken from "../vtk-claim/page";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const isActiveLink = (href: string) => pathname === href;

  const itemHeader = [
    {
      label: "Candidates",
      link: "/candidates",
    },
    {
      label: "Add Candidate",
      link: "/add-candidate",
    },
    {
      label: "Vote",
      link: "/vote",
    },
  ];

  return (
    <>
      <nav className="fixed top-0 py-4 z-50 bg-gradient-to-b from-neutral-950 via-neutral-950 left-0 w-full flex items-center justify-around lg:justify-center lg:gap-20">
        {itemHeader.map((item, index) => (
          <Link
            key={index}
            href={item.link}
            className={`${
              isActiveLink(item.link) ? "text-white" : "text-neutral-400"
            }`}
          >
            {item.label}
          </Link>
        ))}

        <Button variant={"secondary"} className="hidden md:block">
          <w3m-button />
        </Button>
        <div className="hidden md:block">
          <ClaimToken />
        </div>
      </nav>
      <div className="flex items-center gap-4 justify-around z-50 fixed bottom-0 w-full lg:hidden px-5 py-3 bg-neutral-800">
        <Button variant={"secondary"}>
          <w3m-button />
        </Button>
        <ClaimToken />
      </div>
    </>
  );
}
