import React, { Suspense } from "react";
import Container from "@/components/ui/container";
import Searchbar from "@/components/ui/search";
import createSupabaseServer from "@/lib/supabase/server";
import { format } from "date-fns";

const ResourcesPage = async ({ searchParams }) => {
  const supabase = createSupabaseServer();
  const search =
    typeof searchParams.search === "string" ? searchParams.search.trim() : "";
  let query = supabase.from("resources").select("*");

  if (search) {
    query = query.textSearch("search_vector", search);
  }

  const { data: resources, error } = await query;

  if (error) {
    console.error("Error fetching resources:", error);
    return;
  }

  return (
    <main
      className="mesh min-h-screen flex flex-col items-center justify-between text-zinc-100"
    >
      <Container className="w-full py-48 flex flex-col justify-between">
        <Searchbar />
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
          {resources &&
            resources.map((resource, index) => (
              <figure key={resource.id} className="flex flex-col">
                <div className="flex justify-between items-center">
                  <p className="text-2xl mb-1 font-bold capitalize">
                    {resource.title}
                  </p>{" "}
                  <p className="text-zinc-500 text-xs md:text-sm">{format(resource.created_at, "MM/ dd/ yyyy")}</p>
                </div>
                <a
                  href={`/resources/${resource.slug}`}
                  className="block overflow-hidden"
                >
                  <img
                    src={resource.image}
                    className="transition-transform duration-300 ease-in-out transform hover:scale-105 w-full h-48 md:h-96 object-cover rounded-lg border-t border-x border-zinc-300/30 bg-zinc-950"
                  />
                </a>

                <div className="space-x-1 self-end">
                  {resource.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs border ring-1 ring-zinc-500 rounded px-2"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </figure>
            ))}
        </div>
      </Container>
    </main>
  );
};

export default ResourcesPage;
