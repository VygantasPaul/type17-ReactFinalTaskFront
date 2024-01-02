/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import Link from "next/link";
import cookie from "js-cookie";
import { useRouter } from "next/router";

const UserNavBar = () => {
  const router = useRouter();
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState(false);
  const [avatar, setAvatar] = useState(false);

  useEffect(() => {
    const cookieLogged = cookie.get("jwttoken");
    if (cookieLogged) {
      setLoggedIn(true);
      const userDataString = localStorage.getItem("userData");
      const userData = userDataString ? JSON.parse(userDataString) : null;

      if (userData && userData.user) {
        setUserName(userData.user);
      }
      if (userData && userData.avatar) {
        setAvatar(userData.avatar);
      }
    }
  });

  const onLogout = () => {
    cookie.remove("jwttoken");
    setLoggedIn(false);
    router.push("/login");
  };

  return (
    <div className="lg:flex inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
      {!isLoggedIn && (
        <>
          <Link
            href="/login"
            className="text-gray-500 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="text-gray-500 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
          >
            Register
          </Link>
        </>
      )}
      {isLoggedIn && (
        <div className="flex w-full items-center">
          <img
            className="h-8 w-8 rounded-full mr-2 lg:mr-0"
            src={avatar ? avatar : <> No image</>}
            alt={`alt text`}
          ></img>
          <span className="text-gray-500 px-3 hidden lg:block">
            Sveiki, {userName}
          </span>

          <button
            onClick={onLogout}
            className="text-white bg-red-500 rounded-md px-3 py-2 text-sm font-medium hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserNavBar;
