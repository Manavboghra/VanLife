import { useState, useEffect } from "react";
import { Eye, EyeOff, User, Mail, Lock } from "react-feather";
import {
  Link,
  useLoaderData,
  useActionData,
  useNavigation,
  Form,
  redirect,
} from "react-router-dom";
import { checkUsername, getHost, signupHost, signupUser } from "../../api";

export function loader({ request }) {
  return new URL(request.url).searchParams.get("message");
}


export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmpassword");
  const username = formData.get("username");
  const role = formData.get("role"); 

  const pathname =
    new URL(request.url).searchParams.get("redirectTo") || "/host";

  if (password !== confirmPassword) {
    return "Passwords do not match.";
  }

  let hostId;
  let data;

  try {
    if (role === "user") {
      hostId = "01";
      data = await signupUser({
        email,
        password,
        name: username,
        hostId,
      });
    } else if (role === "host") {
      const vans = await getHost();
      const maxId = Math.max(...vans.map((v) => parseInt(v.hostId, 10)));
      hostId = (maxId + 1).toString();

      data = await signupHost({
        email,
        password,
        name: username,
        hostId,
      });
    } else {
      return "Invalid role selected.";
    }

    localStorage.setItem("loggedin", true);
    localStorage.setItem("currentUser", JSON.stringify(data));

    return redirect(pathname);
  } catch (err) {
    return err.message;
  }
}



const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [usernameStatus, setUsernameStatus] = useState({
    message: "",
    color: "",
  });

  const message = useLoaderData();
  const errorMessage = useActionData();
  const navigation = useNavigation();

  useEffect(() => {
    const handler = setTimeout(async () => {
      if (username) {
        setUsernameStatus({ message: "Checking...", color: "text-gray-500" });
        const isTaken = await checkUsername(username);
        if (isTaken) {
          setUsernameStatus({
            message: "Username is taken.",
            color: "text-red-500",
          });
        } else {
          setUsernameStatus({
            message: "Username is available!",
            color: "text-green-500",
          });
        }
      } else {
        setUsernameStatus({ message: "", color: "" });
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [username]);

  return (
    <div className="min-h-screen flex  items-center justify-center bg-gray-200 px-4 pb-5">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl  ">
        <div className="bg-blue-500 rounded-t-2xl p-8 max-w-full text-white">
        <h1 className="text-3xl font-extrabold text-center ">
          Create an Account
        </h1>
        <p className="text-center mt-2">
          Sign up to get started 
        </p>
        </div>
        <div className="px-8 pb-8">

        {message && (
          <div className="bg-red-100 text-red-600 p-2 mt-4 rounded-lg text-sm text-center">
            {message}
          </div>
        )}
        {errorMessage && (
          <div className="bg-red-100 text-red-600 p-2 mt-4 rounded-lg text-sm text-center">
            {errorMessage}
          </div>
        )}

        <Form method="post" className="flex flex-col gap-5 mt-6" replace>
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-sm text-gray-700">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Choose a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>
            {usernameStatus.message && (
              <p className={`text-xs ${usernameStatus.color}`}>
                {usernameStatus.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold text-sm text-gray-700">
              Role
            </label>
            <select
              name="role"
              id="role"
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="user">User</option>
              <option value="host">Host</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold text-sm text-gray-700">
              Email address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="w-full pl-10 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold text-sm text-gray-700">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter your password"
                className="w-full pl-10 pr-10 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
              <div
                className="absolute right-3 top-3 cursor-pointer text-gray-500"
                onClick={() => setShowPassword((p) => !p)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
              
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold text-sm text-gray-700">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmpassword"
                name="confirmpassword"
                placeholder="Confirm your password"
                className="w-full pl-10 pr-10 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
              <div
                className="absolute right-3 top-3 cursor-pointer text-gray-500"
                onClick={() => setShowConfirmPassword((p) => !p)}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
            </div>
          </div>

          <button
            className="bg-blue-500 !text-white font-bold py-2 px-4 rounded-lg mt-3 hover:bg-blue-600 transition-all disabled:bg-[#ffc9a0]"
            disabled={
              navigation.state === "submitting" ||
              usernameStatus.message === "Username is taken."
            }
          >
            {navigation.state === "submitting" ? "Signing up..." : "Sign Up"}
          </button>
        </Form>

        <div className="text-center text-sm mt-6 text-gray-600">
          Already have an account?{" "}
          <Link to={"/login"} className="text-blue-500 font-bold">
            Login
          </Link>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
