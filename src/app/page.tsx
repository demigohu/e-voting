import { Button } from "@/components/ui/button";
import backgroundImg from "@/../public/bg.jpg";

export default function Home() {
  return (
    <div className="container relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div
        className="relative h-full flex-col bg-muted p-10 text-white dark:border-r flex bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImg.src})` }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-20 mt-auto h-full flex flex-col justify-center gap-10">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;This library has saved me countless hours of work and
              helped me deliver stunning designs to my clients faster than ever
              before.&rdquo;
            </p>
            <footer className="text-sm">Sofia Davis</footer>
          </blockquote>
          <Button variant={"outline"} className="lg:hidden">
            <w3m-button />
          </Button>
        </div>
      </div>
      <div className="lg:p-8 h-full lg:float-start lg:flex items-center hidden">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <Button variant={"outline"}>
            <w3m-button />
          </Button>
        </div>
      </div>
    </div>
  );
}
