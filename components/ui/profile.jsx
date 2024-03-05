"use client";
import React from "react";
import Link from "next/link";
import useUser from "@/app/hooks/useUser";
import Image from "next/image";

const Profile = () => {
  const { data, isFetching } = useUser();

  if (isFetching) {
    return <></>;
  }

  return (
    <div>
      {!data.id ? (
        <Link
          href="/auth"
          class="group text-neutral-100 transition duration-300 animate-fade-in"
        >
          Sign in
          <span class="block max-w-0 group-hover:max-w-full transition-all duration-500 h-[1px] bg-neutral-100"></span>
        </Link>
      ) : (
        <Image
          src={data.image_url || ""}
          width={128}
          height={0}
          className="rounded-full w-10 h-10 animate-fade-in duration-300"
          alt={data.display_name || ""}
        />
      )}
    </div>
  );
};

export default Profile;
