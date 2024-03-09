import React from "react";
import Profile from "./profile";
import Container from "./container";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="fixed top-0 w-full h-20 text-neutral-100">
      <Container className="flex justify-between items-center py-10">
        <span className="font-black text-xl pointer-events-none">Knowr</span>
        <Profile />
      </Container>
    </div>
  );
};

export default Navbar;
