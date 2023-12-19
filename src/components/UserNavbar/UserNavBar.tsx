import React, { useState, useEffect } from "react";
import Link from "next/link";
import cookie from "js-cookie";
import { useRouter } from "next/router";

const UserNavBar = () => {
  const router = useRouter();
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState(false);
  useEffect(() => {
    const cookieLogged = cookie.get("jwttoken");
    if (cookieLogged) {
      setLoggedIn(true);
      const userDataString = localStorage.getItem("userData");
      const userData = userDataString ? JSON.parse(userDataString) : null;
      console.log(userData);
      if (userData && userData.user) {
        setUserName(userData.user);
      }
    }
  }, []);

  const onLogout = () => {
    cookie.remove("jwttoken");
    setLoggedIn(false);
    router.push("/login");
  };

  return (
    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
      {!isLoggedIn && (
        <>
          <Link
            href="/login"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
          >
            Register
          </Link>
        </>
      )}
      {isLoggedIn && (
        <div className="flex items-center">
          <img
            className="h-8 w-8 rounded-full"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          ></img>
          <span className="text-white px-3">{userName},</span>

          <button
            onClick={onLogout}
            className="text-white bg-gray-700 rounded-md px-3 py-2 text-sm font-medium hover:bg-red-400"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserNavBar;
