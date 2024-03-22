import TransitionLink from "@/components/ui/transitionLink";
import React from "react";

const ErrorPage = () => {
  return (
    <div className="mesh min-h-[100dvh] w-full grid place-content-center">
      <div className="text-center text-zinc-50">
        <h1 className="mb-5 text-balance text-xl">Hmmm, that shouldn&apos;t have happened, but it did.</h1>
        <TransitionLink label={"Head back"} href="/"/>
      </div>
    </div>
  );
};

export default ErrorPage;
