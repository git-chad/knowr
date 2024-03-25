import React from "react";
import TransitionLink from "./transitionLink";

const NavLinks = () => {
  return (
    <ul className="space-x-4 flex">
      <li>
        <TransitionLink href="/create" label="Create" />
      </li>
    </ul>
  );
};

export default NavLinks;
