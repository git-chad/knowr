"use client";
import React, { useState } from "react";
import Link from "next/link";
import useUser from "@/app/hooks/useUser";
import Image from "next/image";
import createSupabaseClient from "@/lib/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { protectedPaths } from "@/lib/constant";
import NavLinks from "./navlinks";
import TransitionLink from "./transitionLink";
import { motion, AnimatePresence } from "framer-motion";

const Profile = () => {
  const { data, isFetching } = useUser();
  const [tooltip, setToolTip] = useState(false);
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

  const tooltipVariants = {
    hidden: { opacity: 0, scale: 0.5, transition: { duration: 0.3, type: "spring", ease: [0.17, 0.67, 0.83, 0.67] } },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3, type: "spring", ease: [0.17, 0.67, 0.83, 0.67] } },
  };

  return (
    <div>
      {!data?.id ? (
        <div className="flex space-x-4">
          <ul className="flex space-x-4">
            <li>
              <TransitionLink href="/" label="Home" />
            </li>
            <li>
              <TransitionLink href="/resources" label="Resources" />
            </li>
          </ul>
          <Link
            href="/auth"
            className="group text-zinc-100 transition duration-300 animate-fade-in"
          >
            Sign in
            <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-[1px] bg-zinc-100"></span>
          </Link>
        </div>
      ) : (
        <>
          {data?.image_url ? (
            <div className="flex items-center space-x-4">
              <ul className="flex space-x-4">
                <li>
                  <TransitionLink href="/" label="Home" />
                </li>
                <li>
                  <TransitionLink href="/resources" label="Resources" />
                </li>
              </ul>
              <NavLinks />
              <div
                onMouseEnter={() => setToolTip(true)}
                onMouseLeave={() => setToolTip(false)}
                className="relative"
              >
                <Image
                  onClick={handleLogout}
                  src={data.image_url || ""}
                  width={128}
                  height={0}
                  className="cursor-pointer rounded-full w-10 h-10 animate-fade-in duration-300 ring-2 ring-zinc-800"
                  alt={data.display_name || ""}
                />
                <AnimatePresence>
                  {tooltip && (
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={tooltipVariants}
                      transition={{ duration: 0.3 }}
                      className="pointer-events-none absolute p-1 text-sm border-b border-indigo-300 text-center text-white rounded-md w-20 top-14 -left-4"
                    >
                      Log out
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
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
