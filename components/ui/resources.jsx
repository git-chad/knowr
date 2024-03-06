import React from "react";
import createSupabaseClient from "@/lib/supabase/client";
import Card from "../resources/card";

const Resources = async () => {
  const supabase = createSupabaseClient();
  const { data: resources } = await supabase.from("resources").select("*");
  console.log(resources, "resources");

  return (
    <div className="min-h-screen w-full grid grid-cols-3 grid-rows-3 gap-5">
      {resources.map((resource, index) => (
        <div key={index}>
          <Card resource={resource} />
        </div>
      ))}
    </div>
  );
};

export default Resources;
