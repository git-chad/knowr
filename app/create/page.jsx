import Container from "@/components/ui/container";
import PostResource from "@/components/ui/post-resource";
import React from "react";

const CreatePage = () => {
  return (
    <div className="mesh min-h-screen text-white flex flex-col justify-center items-center lg:py-48 2xl:py-0">
      <Container className="w-full">
        <PostResource />
      </Container>
    </div>
  );
};

export default CreatePage;
