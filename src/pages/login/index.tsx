/* eslint-disable @next/next/no-img-element */
import AddTemplate from "@/components/PageTemplate/AddTemplate";
import React, { useState } from "react";
import cookie from "js-cookie";
import axios from "axios";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import Alerts from "@/components/Alerts/Alerts";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();
  const [alert, setAlert] = useState<string | null>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setLoading] = useState(false);
  const onLogin = async () => {
    try {
      if (!email || !password) {
        setAlert("Empty fields");
        setLoading(false);
        return false;
      }
      const body = {
        email: email,
        password: password,
      };
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3010/users/login",
        body
      );
      cookie.set("jwttoken", response.data.token);
      localStorage.setItem("userData", JSON.stringify(response.data));
      setLoading(false);
      if (response.status === 200) {
        setTimeout(() => {
          router.push("/");
        }, 1000);

        setAlert("User logged in");
      }
    } catch (err) {
      // @ts-ignore

      if (err.response.status === 401 || err.response.status === 400) {
        setAlert("Bad user email or  password");
        setLoading(false);
        return false;
      }
    }
  };
  return (
    <AddTemplate>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div>
          <h2 className="mt-5 lg:mt-10 text-center font-bold text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign form
          </h2>
        </div>
        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6">
            <Input
              label="Email"
              labelClassName={`block text-sm font-medium leading-6 text-gray-900`}
              value={String(email)}
              setValue={setEmail}
              className={`block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
              placeholder="Please fill Email"
              name="email"
              type="text"
              id="email"
            />
            <Input
              label="Password"
              labelClassName={`block text-sm font-medium leading-6 text-gray-900`}
              value={String(password)}
              setValue={setPassword}
              className={`block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
              placeholder="Please fill password"
              name="password"
              type="password"
              id="password"
            />

            <Button
              text="Login"
              isLoading={isLoading}
              onClick={onLogin}
              className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            />
          </form>
          <Alerts alert={alert} />
        </div>
      </div>
    </AddTemplate>
  );
};

export default Login;
