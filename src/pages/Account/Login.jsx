import React, { useState, useEffect } from "react";
import { Eye, EyeOff, User } from "react-feather";
import {
  Link,
  useLoaderData,
  useActionData,
  useNavigation,
  useLocation,
  Form,
  redirect,
} from "react-router-dom";
import { loginUser } from "../../api";

export function loader({ request }) {
  return new URL(request.url).searchParams.get("message");
}

export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const pathname =
    new URL(request.url).searchParams.get("redirectTo") || "/vans";

  try {
    const data = await loginUser({ email, password });
    localStorage.setItem("currentUser", JSON.stringify(data));
    localStorage.setItem("loggedin", true);

    return redirect(pathname);
  } catch (err) {
    return err.message;
  }
}

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const message = useLoaderData();
  const location = useLocation();
  const stateMessage = location.state?.message;
  const errorMessage = useActionData();
  const navigation = useNavigation();

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  const togglePassword = () => setShowPassword((prev) => !prev);

  function handleLogout() {
    localStorage.removeItem("loggedin");
    localStorage.removeItem("currentUser");

    setCurrentUser(null);
    window.location.reload();
  }

  return (
    <div className="min-h-screen flex items-center bg-gray-200 justify-center px-4">
      {currentUser ? (
        <div className="bg-white h-64 w-full rounded-2xl   max-w-md text-center flex flex-col">
          <div className="h-full rounded-t-2xl bg-blue-500 flex flex-col items-center justify-center">
            <div className="rounded-full p-6 bg-white m-2">
              <User size={30} className="text-sky-500" />
            </div>
            <div className="text-white flex">
              {currentUser.name} (
              {currentUser.hostId === "01" ? <div>User</div> : <div>Host</div>})
            </div>
          </div>
          <div className="h-full rounded-b-2xl flex flex-col justify-center items-center bg-white">
            <button
              className="bg-blue-500 !text-white p-2  rounded-xl"
              onClick={handleLogout}
            >
              Sign out
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white  shadow-xl rounded-2xl  w-full max-w-md">
          <div className="bg-blue-500 p-8 text-white w-full rounded-t-2xl">
            <h1 className="text-3xl font-extrabold text-center  mb-2">
              Welcome Back
            </h1>
            <p className="text-center  mb-6">
              Sign in to continue your vanlife journey
            </p>
          </div>
          <div className="p-8">
            {stateMessage && (
              <p className="text-red-500 text-center mb-2">{stateMessage}</p>
            )}
            {message && (
              <p className="text-red-500 text-center mb-2">{message}</p>
            )}
            {errorMessage && (
              <p className="text-red-500 text-center mb-2">{errorMessage}</p>
            )}

            <Form method="post" className="flex flex-col gap-5" replace>
              <div className="flex flex-col">
                <label
                  className="font-semibold text-gray-700 mb-1"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <input
                  className="border rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-orange-400 outline-none"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div className="flex flex-col relative">
                <label
                  className="font-semibold text-gray-700 mb-1"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="border rounded-lg px-4 py-2 w-full pr-10 focus:ring-2 focus:ring-orange-400 outline-none"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  required
                />
                <div
                  className="absolute right-3 top-7 cursor-pointer text-gray-500"
                  onClick={togglePassword}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </div>
              </div>

              <button
                className="bg-blue-500 !text-white font-semibold py-2 rounded-lg mt-4 hover:bg-blue-600 transition disabled:bg-orange-300"
                disabled={navigation.state === "submitting"}
              >
                {navigation.state === "submitting"
                  ? "Signing in..."
                  : "Sign In"}
              </button>
            </Form>

            <div className="flex items-center my-6">
              <div className="flex-grow h-px bg-gray-300"></div>
              <span className="mx-2 text-gray-500 text-sm">OR</span>
              <div className="flex-grow h-px bg-gray-300"></div>
            </div>

            <div className="text-center text-gray-600">
              Don't have an account?
              <Link
                to={"../signup"}
                className="text-blue-500 font-semibold hover:underline"
              >
                <br />
                Create one now
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
