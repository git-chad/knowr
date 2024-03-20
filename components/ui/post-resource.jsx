"use client";
import React, { useState } from "react";
import createSupabaseClient from "@/lib/supabase/client";
import koko from "@/public/illustrations/koko.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";

const PostResource = () => {
  const supabase = createSupabaseClient();
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    link: "",
    image: "",
    tags: [],
    slug: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      tags: formData.tags.split(",").map((tag) => tag.trim()),
    };

    const { data, error } = await supabase.from("resources").insert([payload]);

    if (error) {
      console.error("Error inserting data:", error.message);
    } else {
      console.log("Data inserted successfully:", data);
      router.push("/");
    }
  };

  const maxDescriptionLength = 250;
  const charactersLeft = maxDescriptionLength - formData.description.length;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "description" && value.length > maxDescriptionLength) return;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div className="grid grid-cols-2 gap-20">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <label className="text-sm">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="bg-transparent border-b border-neutral-300 p-4"
          required
        />
        <div className="flex justify-between">
          <label className="text-sm">Description</label>
          <span
            className={`text-sm text-neutral-500 ${
              charactersLeft < 70 ? "text-yellow-500/50" : ""
            } ${charactersLeft < 20 ? "text-red-500/50 animate-pulse" : ""}`}
          >
            Characters left: {charactersLeft}
          </span>
        </div>
        <textarea
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="bg-transparent border-b border-neutral-300 px-4 py-8 resize-none"
          required
          maxLength={maxDescriptionLength}
        />
        <label className="text-sm">Website</label>
        <input
          type="text"
          name="link"
          value={formData.link}
          onChange={handleChange}
          className="bg-transparent border-b border-neutral-300 p-4"
          required
        />
        <div className="flex justify-between">
          <label className="text-sm">Image URL</label>
          <span className="text-sm text-neutral-500">
            Image uploading is unsupported for now, oops!
          </span>
        </div>
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          className="bg-transparent border-b border-neutral-300 p-4"
          required
        />
        <div className="flex justify-between">
          <label className="text-sm">Tags</label>
          <span className="text-sm text-neutral-500">
            Separate &apos;em with a comma if you&apos;re writing a couple
          </span>
        </div>
        <input
          type="text"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          className="bg-transparent border-b border-neutral-300 p-4"
          required
        />
        <label className="text-sm">Slugs</label>
        <input
          type="text"
          name="slug"
          value={formData.slug}
          onChange={handleChange}
          className="bg-transparent border-b border-neutral-300 p-4"
          required
        />

        <button
          type="submit"
          className="bg-neutral-950/20 border self-end border-neutral-100 w-max px-12 py-1 rounded"
        >
          Submit
        </button>
      </form>

      <div className="flex flex-col space-y-4 mt-20 ormt5?">
        <div className="h-64 bg-neutral-500/10 object-cover rounded-t-xl rounded-br-xl overflow-hidden">
          <Image
            src={koko}
            alt="hiding koko"
            width={256}
            className="mt-40 opacity-50"
          />
        </div>
        <div className="flex justify-between">
          <div className="text-lg font-bold">{formData.title}&nbsp;</div>
          <div className="space-x-1">
            {formData.tags.length > 0 ? (
              formData.tags
                .split(",")
                .filter((tag) => tag.trim())
                .map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs border ring-1 ring-neutral-500 rounded px-2"
                  >
                    {tag.trim()}
                  </span>
                ))
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="mt-2">{formData.description}&nbsp;</div>
        <div className="flex space-x-2"></div>
      </div>
    </div>
  );
};

export default PostResource;
