import Image from "next/image";
import Container from "@/components/ui/container";
import koko from "@/public/illustrations/koko.svg";
import Resources from "@/components/ui/resources";

export default function Home() {
  return (
    <main className="mesh flex flex-col items-center justify-between text-neutral-100">
      <Container className="w-full py-32 flex justify-between">
        <div className=" flex flex-col justify-between">
          <h1 className="font-black text-[128px] leading-none">Knowr</h1>
          <h2 className="text-2xl w-[35ch]">
            Your go-to database for web design resources of all types. Curated &
            perfected by <b>this funny guy.</b>
          </h2>
        </div>

        <Image src={koko} className="w-1/3" alt="koko the fuzzball"/>
      </Container>
      <Container className="w-full flex pb-32">
        <Resources />
      </Container>
    </main>
  );
}
