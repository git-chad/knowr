"use client";
import React, { useState } from "react";
import createSupabaseClient from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Image from "next/image";

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

    let link = formData.link;
    if (link && !link.startsWith("https://")) {
      link = `https://${link}`;
    }

    const payload = {
      ...formData,
      link: link,
      tags: formData.tags.split(",").map((tag) => tag.trim()),
    };

    const { data, error } = await supabase.from("resources").insert([payload]);

    if (error) {
      console.error("Error inserting data:", error.message);
    } else {
      console.log("Data inserted successfully:", data);
      router.push(`/resources/${formData.slug}`);
    }
  };

  const maxDescriptionLength = 250;
  const charactersLeft = maxDescriptionLength - formData.description.length;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "description" && value.length > maxDescriptionLength) return;

    let newValue = value;

    if (name === "title") {
      const slug = value
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");
      setFormData((prevFormData) => ({
        ...prevFormData,
        slug: slug,
      }));
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: newValue,
    }));
  };

  return (
    <div className="grid md:grid-cols-2 gap-20">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <label className="text-sm">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="bg-transparent border-b border-zinc-300 p-4"
          required
        />
        <div className="flex justify-between">
          <label className="text-sm">Description</label>
          <span
            className={`text-xs md:text-sm text-zinc-500 ${
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
          className="bg-transparent border-b border-zinc-300 px-4 py-8 resize-none"
          required
          maxLength={maxDescriptionLength}
        />
        <label className="text-sm">Website</label>
        <input
          type="text"
          name="link"
          value={formData.link}
          onChange={handleChange}
          className="bg-transparent border-b border-zinc-300 p-4"
          required
        />
        <div className="flex justify-between">
          <label className="text-sm">Image URL</label>
          <span className="text-xs md:text-sm text-zinc-500">
            Image uploading is unsupported for now, oops!
          </span>
        </div>
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          className="bg-transparent border-b border-zinc-300 p-4"
          required
        />
        <div className="flex justify-between">
          <label className="text-sm">Tags</label>
          <span className="text-xs md:text-sm text-zinc-500">
            Separate &apos;em with a comma if you&apos;re writing a couple
          </span>
        </div>
        <input
          type="text"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          className="bg-transparent border-b border-zinc-300 p-4"
          required
        />

        <div className="flex justify-between">
          <label className="text-sm">Slugs</label>
          <span className="text-xs md:text-sm text-zinc-500">
            Auto-generated so nothing breaks
          </span>
        </div>
        <input
          type="text"
          name="slug"
          value={formData.slug}
          onChange={handleChange}
          className="bg-transparent border-b border-zinc-300 p-4"
          required
        />
        <button
          type="submit"
          className="bg-zinc-950/20 border self-end border-zinc-100 w-full md:w-max px-12 py-2 md:py-1 rounded"
        >
          Submit
        </button>
      </form>

      <div className="hidden md:flex flex-col space-y-4 mt-20 ormt5?">
        <div className="h-64 bg-zinc-500/10 object-cover rounded-t-xl rounded-br-xl overflow-hidden">
          {formData.image && (
            <Image
              src={formData.image}
              width={256}
              height={0}
              className="w-full"
            />
          )}
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
                    className="text-xs border ring-1 ring-zinc-500 rounded px-2"
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
