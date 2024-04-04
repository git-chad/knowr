"use client";
import React, { useEffect, useState } from "react";
import Container from "@/components/ui/container";
import createSupabaseClient from "@/lib/supabase/client";
import { useParams } from "next/navigation";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

const ResourcePage = () => {
  const params = useParams();
  const supabase = createSupabaseClient();
  const [resource, setResource] = useState(null);

  useEffect(() => {
    const fetchResource = async () => {
      const { data } = await supabase
        .from("resources")
        .select("*")
        .eq("slug", params.resource);
      setResource(data);
    };
    fetchResource();
  }, []);

  console.log(resource, "resource");
  if (!resource) return <></>;

  return (
    <main className="mesh min-h-screen flex flex-col items-center justify-center text-zinc-100">
      <Container className="w-full flex flex-col justify-between py-32">
        <p className="text-xl md:text-xl font-medium">Featuring</p>
        <div className="flex justify-between items-end">
          <h1 className="text-2xl md:text-6xl font-bold">
            {resource[0].title}
          </h1>{" "}
          <p className="text-zinc-500 text-xs md:text-sm">
            {format(resource[0].created_at, "MM/ dd/ yyyy")}
          </p>
        </div>
        <Link href={resource[0].link} target="_blank">
          <Image
            src={resource[0].image}
            width={1920}
            height={0}
            className="mt-3 w-full aspect-video object-cover rounded-t-xl rounded-br-xl border-t border-x border-zinc-300/30"
          /></Link>
        <div className="flex flex-col md:flex-row justify-between items-end">
          <p className="mt-6 text-base md:text-xl md:text-balance">{resource[0].description}</p>
          <a href={resource[0].link} target="_blank" className="p-2 mt-6 md:w-max border-x hover:underline hover:text-indigo-300 transition-all">Check it out at {resource[0].link}</a>
        </div>
      </Container>
    </main>
  );
};

export default ResourcePage;
