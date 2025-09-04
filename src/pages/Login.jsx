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
import { loginUser } from "../api";

export function loader({ request }) {
  return new URL(request.url).searchParams.get("message");
}

export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const pathname =
    new URL(request.url).searchParams.get("redirectTo") || "/host";

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

    navigation("/login", { replace: true });
  }


  


  return (
    <div className="p-6 bg-[#FFF7ED]">
      <div>
        {currentUser ? (
          <div className="flex flex-col items-center max-w-96 h-screen">
            <div className="text-3xl font-bold text-center pb-3">
              Welcome, {currentUser.name}!
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white font-bold py-2 px-6 rounded-lg mt-8 hover:bg-red-600"
            >
              Log out
            </button>
          </div>
        ) : (
          <>
            <div className="font-bold text-4xl text-center">
              Welcome back!
            </div>
            <div className="flex flex-col justify-center items-center mt-10">
              {stateMessage && <p className="text-red-500">{stateMessage}</p>}
              {message && (
                <div className="text-red-500 text-center mb-4">{message}</div>
              )}
              {errorMessage && (
                <div className="text-red-500 text-center mb-4">
                  {errorMessage}
                </div>
              )}

              <div className="border-2 border-black p-10 rounded-lg bg-white">
                <Form method="post" className="flex flex-col gap-5" replace>
                  <div className="flex flex-col gap-2">
                    <label className="font-[600] text-lg" htmlFor="email">
                      Email address
                    </label>
                    <input
                      className="border-2 border-black rounded-lg p-2 w-80"
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  <div className="relative flex flex-col gap-2">
                    <label className="font-[600] text-lg" htmlFor="password">
                      Password
                    </label>
                    <input
                      className="border-2 border-black rounded-lg p-2 w-80 pr-10"
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      placeholder="Enter your password"
                      required
                    />
                    <div
                      className="absolute right-3 pt-2 top-[38px] cursor-pointer"
                      onClick={togglePassword}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === "Enter" && togglePassword()}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </div>
                  </div>
                  <button
                    className="bg-[#FF8C38] font-bold py-2 px-4 rounded-lg mt-5 hover:bg-[#e6761a] !text-white disabled:bg-[#ffc9a0]"
                    disabled={navigation.state === "submitting"}
                  >
                    {navigation.state === "submitting"
                      ? "Signing in..."
                      : "Sign In"}
                  </button>
                </Form>
              </div>
              <div className="mt-6">
                Don't have an account?{" "}
                <Link to={"../signup"} className="text-[#FF8C38] font-bold">
                  Create one now
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
