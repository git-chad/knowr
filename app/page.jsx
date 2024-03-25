import Container from "@/components/ui/container";
import Resources from "@/components/ui/resources";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-[100dvh] mesh flex flex-col items-center justify-between text-zinc-100">
      <Container className="w-full flex justify-between pt-48 pb-24">
        <div className=" flex flex-col justify-between w-full">
          <h1 className="font-black text-2xl md:text-[128px] leading-none">
            Knowr
          </h1>
          <div className="mt-40 md:mt-64 w-full flex justify-between items-end">
            <h2 className="text-xs md:text-2xl md:w-[35ch]">
              Your go-to database for web design resources of all types. Put
              together with love by{" "}
              <Link
                href="https://github.com/git-chad"
                target="_blank"
                className="font-bold text-indigo-200"
              >
                @git-chad
              </Link>
              .
            </h2>
            <p className="text-xs md:text-base">
              Submit your own resources by <b>signing in.</b>
            </p>
          </div>
        </div>
      </Container>
      <Container className="w-full pb-16 flex md:pb-32">
        <Resources />
      </Container>
    </main>
  );
}
