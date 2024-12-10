"use client";

import bgIMG from "@/../public/bg2.jpg";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";

export default function Home() {
  const { isConnected } = useAccount();
  const router = useRouter();

  if (!isConnected) {
    return (
      <div className="relative h-screen flex-col items-center justify-center grid lg:grid-cols-2 lg:px-0">
        <div
          className="relative w-full h-full flex-col bg-muted p-10 text-white dark:border-r flex bg-cover bg-no-repeat"
          style={{ backgroundImage: `url(${bgIMG.src})` }}
        >
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-20 mt-auto h-full flex flex-col justify-center gap-10">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;Lorem Ipsum is simply dummy text of the printing and
                typesetting industry. Lorem Ipsum has been the industry&apos;s
                standard dummy text ever since the 1500s, when an unknown
                printer took a galley of type and scrambled it to make a type
                specimen book.&rdquo;
              </p>
              <footer className="text-sm">Demigohu</footer>
            </blockquote>
            <p className="lg:hidden h-9 px-4 py-2 rounded-md text-sm font-medium border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground flex items-center justify-center">
              <w3m-button />
            </p>
          </div>
        </div>
        <div className="lg:p-8 h-full lg:float-start lg:flex items-center bg-black/10 hidden">
          <div className="mx-auto flex justify-center sm:w-[350px]">
            <w3m-button />
          </div>
        </div>
      </div>
    );
  } else {
    router.push("/candidates");
  }
}
