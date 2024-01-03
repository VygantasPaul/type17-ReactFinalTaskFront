/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
const Logo = () => {
  return (
    <Link href={"/"}>
      <img
        className="h-10 lg:h-20 w-auto"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Stack_Overflow_icon.svg/768px-Stack_Overflow_icon.svg.png"
        alt="Your Company"
      ></img>
    </Link>
  );
};

export default Logo;
