"use client";
import { KeySquare } from "lucide-react";
import React from "react";
import { Github } from "lucide-react";
import Image from "next/image";
import googleIcon from "@/public/icons/google-icon.svg";
import createSupabaseClient from "@/lib/supabase/client";
import { useSearchParams } from "next/navigation";

const LoginForm = () => {
  const params = useSearchParams();
  const next = params.get("next");

  const handleOauthLogin = (provider) => {
    const supabase = createSupabaseClient();
    supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${location.origin}/auth/callback?next=${encodeURIComponent(next || '/')}`,
      },
    });
  };

  return (
    <div className="w-96 rounded-md border backdrop-blur-2xl bg-zinc-950/20 border-zinc-700 p-5 flex flex-col">
      <div className="flex items-center justify-between">
        <span className="text-lg font-bold">Sign in (or up) to Knowr</span>
        <KeySquare />
      </div>
      <span className="text-zinc-400">and start contributing</span>
      <button
        onClick={() => handleOauthLogin("github")}
        className="border border-zinc-700 flex items-center justify-center px-5 py-1 rounded-md text-sm mt-8"
      >
        <Github className="w-6 h-6 mr-2" />
        Join via Github
      </button>
      <button
        onClick={() => handleOauthLogin("google")}
        className="border border-zinc-700 flex items-center justify-center px-5 py-1 rounded-md text-sm mt-2"
      >
        <Image src={googleIcon} className="w-5 h-5 mr-2" /> Join via Google
      </button>
    </div>
  );
};

export default LoginForm;
