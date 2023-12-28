import React, { useEffect, useState } from "react";
import Link from "next/link";

const DesktopNavBar = () => {
  return (
    <div className="hidden sm:ml-6 sm:block">
      <div className="flex space-x-4">
        <Link
          href="/"
          className="text-gray-500 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
        >
          Home page
        </Link>

        <Link
          href="/questions"
          className="text-gray-500 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
        >
          Questions
        </Link>
        <Link
          href="/answers"
          className="text-gray-500 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
        >
          Answers
        </Link>
      </div>
    </div>
  );
};

export default DesktopNavBar;
