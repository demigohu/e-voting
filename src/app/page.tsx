import { Button } from "@/components/ui/button";
import backgroundImg from "@/assets/login_bg.jpg";

export default function Home() {
  return (
    <div className="relative h-screen flex-col items-center justify-center grid lg:grid-cols-2 lg:px-0">
      <div
        className="relative w-full h-full flex-col bg-muted p-10 text-white dark:border-r flex bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImg.src})` }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-20 mt-auto h-full flex flex-col justify-center gap-10">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;Lorem Ipsum is simply dummy text of the printing and
              typesetting industry. Lorem Ipsum has been the industry&apos;s
              standard dummy text ever since the 1500s, when an unknown printer
              took a galley of type and scrambled it to make a type specimen
              book.&rdquo;
            </p>
            <footer className="text-sm">Demigohu</footer>
          </blockquote>
          <Button variant={"outline"} className="lg:hidden">
            <w3m-button />
          </Button>
        </div>
      </div>
      <div className="lg:p-8 h-full lg:float-start lg:flex items-center bg-black/10 hidden">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <Button variant={"outline"}>
            <w3m-button />
          </Button>
        </div>
      </div>
    </div>
  );
}
