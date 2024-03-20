"use client";
import { Suspense } from "react";
import Container from "@/components/ui/container";
import { KeySquare, Github } from "lucide-react";
import Image from "next/image";
import googleIcon from "@/public/icons/google-icon.svg";
import createSupabaseClient from "@/lib/supabase/client";
import { useSearchParams } from "next/navigation";

const AuthPageContent = () => {
  const params = useSearchParams();
  const next = params.get("next");

  const getURL = () => {
    let url =
      process?.env?.NEXT_PUBLIC_SITE_URL ?? 
      process?.env?.NEXT_PUBLIC_VERCEL_URL ?? 
      'http://localhost:3000/'

    url = url.includes('http') ? url : `https://${url}`
    url = url.charAt(url.length - 1) === '/' ? url : `${url}/`
    return url
  }

  // redirectTo: `${
  //   window.location.origin
  // }/auth/callback?next=${encodeURIComponent(next || "/")}`,

  // redirectTo: getURL() + "auth/callback?next=" + encodeURIComponent(next || "/"),

  // during production, remember to switch the default redirect url in supabase -> URL config

  const handleOauthLogin = (provider) => {
    const supabase = createSupabaseClient();
    supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: getURL() + "auth/callback?next=" + encodeURIComponent(next || "/"),
      },
    });
  };

  console.log(getURL(), 'URL');

  return (
    <Container className="py-32 flex flex-col">
      <div className="w-96 rounded-md border backdrop-blur-2xl bg-neutral-950/20 border-neutral-700 p-5 flex flex-col">
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold">Sign in (or up) to Knowr</span>
          <KeySquare />
        </div>
        <span className="text-neutral-400">and start contributing</span>
        <button
          onClick={() => handleOauthLogin("github")}
          className="border border-neutral-700 flex items-center justify-center px-5 py-1 rounded-md text-sm mt-8"
        >
          <Github className="w-6 h-6 mr-2" />
          Join via Github
        </button>
        <button
          onClick={() => handleOauthLogin("google")}
          className="border border-neutral-700 flex items-center justify-center px-5 py-1 rounded-md text-sm mt-2"
        >
          <Image src={googleIcon} alt="Google Icon" className="w-5 h-5 mr-2" />{" "}
          Join via Google
        </button>
      </div>
    </Container>
  );
};

const AuthPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-between mesh text-neutral-100">
      <Suspense fallback={<div>Loading...</div>}>
        <AuthPageContent />
      </Suspense>
    </div>
  );
};

export default AuthPage;
