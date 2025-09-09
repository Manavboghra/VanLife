import React, { useState, useEffect } from "react";
import { Eye, EyeOff } from "react-feather";
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
    <div className="min-h-screen flex items-center  justify-center bg-[#FFF7ED] px-4">
      {currentUser ? (
        <div className="bg-white shadow-lg rounded-2xl   p-8 w-full max-w-md text-center">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome, {currentUser.name}!
          </h1>
          <p className="mt-2 text-gray-600">Host ID: {currentUser.hostId}</p>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white font-semibold py-2 px-6 rounded-lg mt-6 hover:bg-red-600 transition"
          >
            Log out
          </button>
        </div>
      ) : (
        <div className="bg-white  border shadow-xl rounded-2xl p-8 w-full max-w-md">
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">
            Welcome Back! 
          </h1>

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
              <label className="font-semibold text-gray-700" htmlFor="email">
                Email Address
              </label>
              <input
                className="border rounded-lg px-4 py-2 mt-1 w-full focus:ring-2 focus:ring-orange-400 outline-none"
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="flex flex-col relative">
              <label className="font-semibold text-gray-700" htmlFor="password">
                Password
              </label>
              <input
                className="border rounded-lg px-4 py-2 mt-1 w-full pr-10 focus:ring-2 focus:ring-orange-400 outline-none"
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter your password"
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
              className="bg-orange-500 !text-white font-semibold py-2 rounded-lg mt-4 hover:bg-orange-600 transition disabled:bg-orange-300"
              disabled={navigation.state === "submitting"}
            >
              {navigation.state === "submitting"
                ? "Signing in..."
                : "Sign In"}
            </button>
          </Form>

          <div className="mt-6 text-center text-gray-600">
            Don’t have an account?{" "}
            <Link
              to={"../signup"}
              className="text-orange-500 font-semibold hover:underline"
            >
              Create one now
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
