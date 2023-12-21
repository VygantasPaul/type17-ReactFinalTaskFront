/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import DesktopNavBar from "../DesktopNavBar/DesktopNavBar";
import MobileNavBar from "../MobileNavBar/MobileNavBar";
import Logo from "../Logo/Logo";
import UserNavBar from "../UserNavbar/UserNavBar";

const Header = () => {
  const [showMobile, setShowMobile] = useState(null);
  const onShoMobile = () => {
    setShowMobile(!showMobile);
  };
  return (
    <nav className="bg-white w-full z-50">
      <div className="mx-auto max-w-7xl lg:container p-3">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex w-full justify-between items-center md:hidden">
            <button
              onClick={onShoMobile}
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400  focus:outline-none  focus:ring-inset "
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
              {!showMobile && (
                <svg
                  className="block h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              )}
              {showMobile && (
                <svg
                  className=" h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
            <Logo />
            <UserNavBar />
          </div>
          {showMobile}
          <div className="hidden md:flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex justify-between w-full flex-shrink-0 items-center">
              <Logo />
              <DesktopNavBar />
              <UserNavBar />
            </div>
          </div>
        </div>
      </div>
      {showMobile && <MobileNavBar />}
    </nav>
  );
};

export default Header;
