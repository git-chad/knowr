"use client";
import React, { useState } from "react";
import supabase from "@/lib/supabase";

const PostResource = () => {
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
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
        className="bg-neutral-800 rounded py-1 px-2"
        required
      />

      <input
        type="text"
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="description"
        className="bg-neutral-800 rounded py-1 px-2"
        required
      />

      <input
        type="text"
        name="link"
        value={formData.link}
        onChange={handleChange}
        placeholder="link"
        className="bg-neutral-800 rounded py-1 px-2"
        required
      />

      <input
        type="text"
        name="image"
        value={formData.image}
        onChange={handleChange}
        placeholder="image link"
        className="bg-neutral-800 rounded py-1 px-2"
        required
      />

      <input
        type="text"
        name="tags"
        value={formData.tags}
        onChange={handleChange}
        placeholder="tags"
        className="bg-neutral-800 rounded py-1 px-2"
        required
      />

      <input
        type="text"
        name="slug"
        value={formData.slug}
        onChange={handleChange}
        placeholder="slug"
        className="bg-neutral-800 rounded py-1 px-2"
        required
      />

      <button type="submit">Submit</button>
    </form>
  );
};

export default PostResource;
