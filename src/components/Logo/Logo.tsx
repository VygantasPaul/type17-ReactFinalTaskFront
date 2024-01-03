// Logo component
import React from "react";
import Image from "next/image";

const Logo = () => {
  return (
    <Image
      className="h-10 lg:h-20 w-auto"
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Stack_Overflow_icon.svg/768px-Stack_Overflow_icon.svg.png"
      alt="Your Company"
      width={200}
      height={200}
    />
  );
};

export default Logo;
