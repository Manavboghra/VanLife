import { useState, useEffect } from "react";
import { Eye, EyeOff } from "react-feather";
import {
  Link,
  useLoaderData,
  useActionData,
  useNavigation,
  Form,
  redirect,
} from "react-router-dom";
import { signupUser, checkUsername, signupHost, getVans, getHost } from "../api";

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
      console.log(vans)
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

    return () => {
      clearTimeout(handler);
    };
  }, [username]);

  const togglePassword = () => setShowPassword((prev) => !prev);
  const toggleConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

  return (
    <div className="p-6 bg-[#FFF7ED]">
      <div>
        <>
          <div className="font-bold text-4xl text-center">
            Create New Account
          </div>
          <div className="flex flex-col justify-center items-center mt-10">
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
                  <label className="font-[600] text-lg" htmlFor="username">
                    Username
                  </label>
                  <input
                    className="border-2 border-black rounded-lg p-2 w-80"
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Set username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                  {usernameStatus.message && (
                    <p className={`text-sm mt-1 ${usernameStatus.color}`}>
                      {usernameStatus.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-[600] text-lg" htmlFor="role">
                    Role
                  </label>
                  <select name="role" id="role">
                    <option value="user">User</option>
                    <option value="host">Host</option>
                  </select>
                </div>

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

                <div className="relative flex flex-col gap-2">
                  <label
                    className="font-[600] text-lg"
                    htmlFor="confirmpassword"
                  >
                    Confirm Password
                  </label>
                  <input
                    className="border-2 border-black rounded-lg p-2 w-80 pr-10"
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmpassword"
                    name="confirmpassword"
                    placeholder="Confirm your password"
                    required
                  />
                  <div
                    className="absolute right-3 pt-2 top-[38px] cursor-pointer"
                    onClick={toggleConfirmPassword}
                    aria-label={
                      showConfirmPassword ? "Hide password" : "Show password"
                    }
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) =>
                      e.key === "Enter" && toggleConfirmPassword()
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </div>
                </div>
                <button
                  className="bg-[#FF8C38] font-bold py-2 px-4 rounded-lg mt-5 hover:bg-[#e6761a] !text-white disabled:bg-[#ffc9a0]"
                  disabled={
                    navigation.state === "submitting" ||
                    usernameStatus.message === "Username is taken."
                  }
                >
                  {navigation.state === "submitting"
                    ? "Signing up..."
                    : "Sign up"}
                </button>
              </Form>
            </div>
            <div className="mt-6">
              Already have an account?{" "}
              <Link to={"/login"} className="text-[#FF8C38] font-bold">
                Login now
              </Link>
            </div>
          </div>
        </>
      </div>
    </div>
  );
};

export default Signup;
