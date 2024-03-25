"use client";
import LoadingProgress from "@/components/LoadingProgress";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handlerSubmit = async (e: any) => {
    try {
      e.preventDefault();
      setLoading(true); // เริ่มแสดง LoadingProgress
      if (!email) {
        setError("Please Enter your Email");
        setLoading(false); // ซ่อน LoadingProgress เนื่องจากเกิด error
        return;
      }
      if (!password) {
        setError("Please Enter your Password");
        setLoading(false); // ซ่อน LoadingProgress เนื่องจากเกิด error
        return;
      }

      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (res?.error) {
        setError("Invalid credentials");
        setLoading(false); // ซ่อน LoadingProgress เนื่องจากเกิด error
        return;
      }
      console.log("going to router");
      // setLoading(false)
      router.refresh();
      router.replace("/");
      // router.back()
    } catch (error) {
      console.log("Error from login" + error);
      setLoading(false); // ซ่อน LoadingProgress เนื่องจากเกิด error
    }
  };

  return (
    <div className="w-screen h-screen bg-[url('/img/bglogin.jpeg')] bg-cover flex justify-center items-center">
      <div className="bg-white bg-opacity-75 flex flex-col justify-center w-[569px] h-[643px] px-0 py-0 lg:px-8 rounded-3xl">
        <div className="  sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-20 w-auto"
            src="/img/logoblack.png"
            alt="Your Company"
          />
          <h2 className="tracking-wider mt-10 text-center text-2xl font-extrabold leading-9  text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className=" mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handlerSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                    console.log(password);
                  }}
                  // required
                  className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-[#107557] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
            {error && (
              <div className=" text-center bg-red-500 w-fit text-sm text-white py-1 px-3 rounded-md mt-2">
                {error}
              </div>
            )}
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Do not have an account?
            <Link
              href="/register"
              className="ml-2 font-semibold leading-6 text-[#107557] hover:text-[#557a6f]"
            >
              Sign-up
            </Link>
          </p>
        </div>
        
        <LoadingProgress show={loading} />
      </div>
    </div>
  );
}

export default LoginPage;

/**/
