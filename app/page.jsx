import Link from "next/link";
import Image from "next/image";
import supabase from "@/lib/supabase";
import PostResource from "@/components/ui/post-resource";

export default async function Home() {
  const { data: resources } = await supabase.from("resources").select("*");
  // console.log(resources, "resources");
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="font-bold text-8xl">Knowr</h1>
      <PostResource />
      {resources.map((resource, index) => (
        <div key={index}>
          <p>{resource.title}</p>
          <p>{resource.description}</p>
          <Link href={resource.link} target="_blank">
            {resource.link}
          </Link>
          {resource.image && (
            <Image
              src={resource.image}
              alt={resource.title}
              width="100"
              height="100"
            />
          )}
          {resource.tags.map((tag, index) => (
            <p className="border border-indigo-500 rounded-lg text-center text-xs" key={index}>{tag}</p>
          ))}
        </div>
      ))}
    </main>
  );
}
