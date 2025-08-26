import React, { useState } from "react";
import { Eye, EyeOff } from "react-feather";
import { Link } from "react-router-dom";

const Account = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword((prev) => !prev);

  return (
    <div className="p-6 bg-[#FFF7ED]">
      <div className="font-bold text-4xl text-center">
        Sign in to your account
      </div>
      <div className="flex flex-col justify-center items-center mt-10">
        <div className="border-2 border-black p-10 rounded-lg bg-white">
          <form className="flex flex-col gap-5">
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
              />
              <div
                className="absolute right-3 pt-2 top-[38px] cursor-pointer"
                onClick={togglePassword}
                aria-label={showPassword ? "Hide password" : "Show password"}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && togglePassword()}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>
            </div>
            <button className="bg-[#FF8C38] font-bold py-2 px-4 rounded-lg mt-5 hover:bg-[#e6761a] !text-white">
              Sign In
            </button>
          </form>
        </div>
        <div className="mt-6">
          Don't have an account?{" "}
          <Link to={""} className="text-[#FF8C38] font-bold">
            Create one now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Account;
