import Link from "next/link";
import Image from "next/image";
import supabase from "@/lib/supabase";
import PostResource from "@/components/ui/post-resource";
import Container from "@/components/ui/container";

export default async function Home() {
  const { data: resources } = await supabase.from("resources").select("*");
  // console.log(resources, "resources");

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-gradient-to-b from-neutral-900 to-neutral-950">
      <Container className="py-32">
        <h1 className="font-bold text-8xl">Knowr</h1>
      </Container>
    </main>
  );
}
