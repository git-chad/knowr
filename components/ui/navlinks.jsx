import React from "react";
import TransitionLink from "./transitionLink";

const NavLinks = () => {
  return (
    <ul className="space-x-4 flex">
      <li>
        <TransitionLink href="/" label="Home" />
      </li>
      <li>
        <TransitionLink href="/resources" label="Resources" />
      </li>
      <li>
        <TransitionLink href="/create" label="Create" />
      </li>
      {/* <li>
        <TransitionLink href="/profile" label="Profile" />
      </li> */}
    </ul>
  );
};

export default NavLinks;
