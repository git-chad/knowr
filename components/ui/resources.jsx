"use client";
import React, { useState, useEffect } from "react";
import createSupabaseClient from "@/lib/supabase/client";
import Card from "../resources/card";
import { ArrowLeft } from "lucide-react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const Resources = () => {
  const [resources, setResources] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const resourcesPerPage = 3;
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchResources = async () => {
      const supabase = createSupabaseClient();
      const { count } = await supabase
        .from("resources")
        .select("*", { count: "exact" });

      const { data: fetchedResources } = await supabase
        .from("resources")
        .select("*")
        .order("created_at", { ascending: false })
        .range(
          (currentPage - 1) * resourcesPerPage,
          currentPage * resourcesPerPage - 1
        );

      setResources(fetchedResources);
      setTotalPages(Math.ceil(count / resourcesPerPage));
    };

    fetchResources();
  }, [currentPage]);

  const goToPreviousPage = () => {
    setCurrentPage((prevCurrentPage) => Math.max(prevCurrentPage - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prevCurrentPage) =>
      Math.min(prevCurrentPage + 1, totalPages)
    );
  };

  return (
    <div>
      <div className="pagination-controls flex justify-between mb-3">
        <Link href="/resources" className="underline underline-offset-2">
          All resources
        </Link>
        <div className="space-x-5">
          {" "}
          <button onClick={goToPreviousPage} disabled={currentPage === 1}>
            <ArrowLeft />
          </button>
          {/* <span>
           {currentPage} - {totalPages}
        </span> */}
          <button onClick={goToNextPage} disabled={currentPage === totalPages}>
            <ArrowRight />
          </button>
        </div>
      </div>
      <div className="min-h-[50dvh]">
        <div className="w-full grid grid-cols-3 gap-5">
          {resources.map((resource, index) => (
            <Card key={index} resource={resource} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Resources;
