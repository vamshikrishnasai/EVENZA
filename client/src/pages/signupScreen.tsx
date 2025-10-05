import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignupScreen = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const role = "user"; // You can change this to dynamic role selection if required

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePassword = (password: string) => {
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return minLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    const { userName, email, password } = formState;

    if (!userName || !email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!validatePassword(password)) {
      toast.error("Password must contain at least 8 characters, including uppercase, lowercase, number, and special character");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, email, password, role }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Registration successful!");
        setTimeout(() => navigate("/loginScreen"), 1500); // Redirect to login
      } else {
        throw new Error(data.message || "Registration failed");
      }
    } catch (error: Error | unknown) {
      console.error("Signup error:", error);
      toast.error(error instanceof Error ? error.message : "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-row-reverse bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-50">
      <div className="hidden lg:flex w-1/2 flex-col items-center justify-center p-16 bg-[#800000]/5">
        <img src="/fullLogo.png" alt="Logo" className="w-96 h-64 object-contain mb-12" />
        <h2 className="text-4xl font-bold text-[#800000] mb-8">Join EVENZA Today</h2>
        <div className="max-w-xl space-y-4">
          <p className="text-center text-gray-700 text-xl font-medium">Start Your Event Planning Journey</p>
          <p className="text-center text-gray-600 text-lg leading-relaxed">
            Create unforgettable experiences with our powerful event management platform. Get started with EVENZA and transform your event planning process.
          </p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm shadow-xl rounded-2xl p-8">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center text-gray-800">Create Account</CardTitle>
            <CardDescription className="text-center text-gray-600">Enter your details to get started</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 mt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Username</label>
              <Input
                className="w-full h-11 px-4 rounded-lg border border-gray-300"
                placeholder="Enter the username"
                name="userName"
                value={formState.userName}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <Input
                className="w-full h-11 px-4 rounded-lg border border-gray-300"
                placeholder="Enter your email"
                type="email"
                name="email"
                value={formState.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <Input
                className="w-full h-11 px-4 rounded-lg border border-gray-300"
                placeholder="Create a password"
                type="password"
                name="password"
                value={formState.password}
                onChange={handleInputChange}
              />
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4 mt-6">
            <Button
              disabled={loading}
              className={`w-full h-11 text-base font-semibold ${loading ? "bg-gray-400" : "bg-[#800000] hover:bg-[#800000]/90"} text-white`}
              onClick={submitHandler}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </Button>

            <p className="text-sm text-center text-gray-600">
              Already have an account?{" "}
              <span onClick={() => navigate("/loginScreen")} className="text-[#800000] hover:underline cursor-pointer">
                Sign in
              </span>
            </p>
          </CardFooter>
        </Card>
      </div>

      <ToastContainer position="top-center" autoClose={2500} hideProgressBar />
    </div>
  );
};

export default SignupScreen;
