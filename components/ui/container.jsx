import React from "react";

const Container = ({ children, className, ...props }) => {
  const containerClass = `mx-auto max-w-[1440px] px-10 ${className || ""}`;
  
  return (
    <div className={containerClass} {...props}>
      {children}
    </div>
  );
};

export default Container;
