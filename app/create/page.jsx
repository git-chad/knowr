import Container from "@/components/ui/container";
import PostResource from "@/components/ui/post-resource";
import React from "react";

const CreatePage = () => {
  return (
    <div className="mesh min-h-screen text-white flex justify-center items-center">
      <Container className="w-full">
        <PostResource />
      </Container>
    </div>
  );
};

export default CreatePage;
