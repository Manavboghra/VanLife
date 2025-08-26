import React from "react";
import { Eye, EyeOff } from "react-feather";
import { 
    Link, 
    useLoaderData, 
    useActionData,
    useNavigation,
    Form,
    redirect
} from "react-router-dom";
import { loginUser } from "../../api"; // Make sure the path to api.js is correct

// The loader function gets any message from the URL search params
export function loader({ request }) {
  return new URL(request.url).searchParams.get("message");
}

// The action function handles the form submission
export async function action({ request }) {
    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");
    const pathname = new URL(request.url).searchParams.get("redirectTo") || "/host"

    try {
        // Attempt to log the user in
        const data = await loginUser({ email, password });
        // On success, you would typically store the auth token and user data
        // For now, we'll just redirect to the host page
        localStorage.setItem("loggedin", true); // Example of setting a flag
        return redirect(pathname);
    } catch (err) {
        // On failure, return the error message to the component
        return err.message;
    }
}


const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  
  // Get messages from both the loader (URL) and the action (form submission)
  const message = useLoaderData();
  const errorMessage = useActionData();
  const navigation = useNavigation();

  const togglePassword = () => setShowPassword((prev) => !prev);

  return (

    
    <div className="p-6 bg-[#FFF7ED]">
      <div className="font-bold text-4xl text-center">
        Sign in to your account
      </div>
      
      <div className="flex flex-col justify-center items-center mt-10">
        {message && <div className="text-red-500 text-center mb-4">{message}</div>}
        {errorMessage && <div className="text-red-500 text-center mb-4">{errorMessage}</div>}

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
                aria-label={showPassword ? "Hide password" : "Show password"}
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
              {navigation.state === "submitting" ? "Signing in..." : "Sign In"}
            </button>
          </Form>
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

export default Login;
