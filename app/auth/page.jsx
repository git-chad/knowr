import LoginForm from "@/components/auth/login-form";
import Container from "@/components/ui/container";
import React from "react";

const AuthPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-between mesh text-neutral-100">
        <Container className='py-32 flex flex-col'>
            <LoginForm/>
        </Container>
    </div>
  );
};

export default AuthPage;
