"use client";
import React from "react";
import Link from "next/link";
import useUser from "@/app/hooks/useUser";
import Image from "next/image";
import createSupabaseClient from "@/lib/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { protectedPaths } from "@/lib/constant";
import NavLinks from "./navlinks";

const Profile = () => {
  const { data, isFetching } = useUser();
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();

  if (isFetching) {
    return <></>;
  }

  const handleLogout = async () => {
    const supabase = createSupabaseClient();
    await supabase.auth.signOut();
    queryClient.clear();
    router.refresh();
    if (protectedPaths.includes(pathname)) {
      router.replace("/auth?next=" + pathname);
    }
  };

  return (
    <div>
      {!data?.id ? (
        <Link
          href="/auth"
          className="group text-zinc-100 transition duration-300 animate-fade-in"
        >
          Sign in
          <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-[1px] bg-zinc-100"></span>
        </Link>
      ) : (
        <>
          {data?.image_url ? (
            <div className="flex items-center space-x-4">
            <NavLinks/>
            <Image
              onClick={handleLogout}
              src={data.image_url || ""}
              width={128}
              height={0}
              className="cursor-pointer rounded-full w-10 h-10 animate-fade-in duration-300 ring-2 ring-zinc-800"
              alt={data.display_name || ""}
            />
            </div>
          ) : (
            <div
              onClick={handleLogout}
              className="cursor-pointer capitalize w-10 h-10 bg-gradient-to-br ring-zinc-800 from-zinc-600 to-zinc-700 flex justify-center items-center rounded-full leading-none"
            >
              <span className="font-semibold text-xl">@</span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Profile;
