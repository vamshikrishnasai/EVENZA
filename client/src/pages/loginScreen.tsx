import { useAuth } from "../context/AuthContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const LoginScreen = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Check if user is already logged in by checking if the cookies exist in the backend
  useEffect(() => {
    // You might call your `checkAuth` API here to verify if the user is authenticated
    const checkIfAuthenticated = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/auth/verify', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
          },
        });
        
        const data = await res.json();

        if (res.ok && data.user) {
          navigate("/home");
        }
      } catch (error) {
        console.error('Failed to verify auth:', error);
      }
    };
    
    checkIfAuthenticated();
  }, [navigate]);

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password: string) => password.length >= 6 && /[a-z]/i.test(password) && /\d/.test(password);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!validatePassword(password)) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      if (!data.success || !data.user) {
        throw new Error("Invalid response format");
      }

      // Login with user data (client-side state)
      login(data.user);
      
      // Navigate based on user role
      if (data.user.role === "admin") {
        toast.success("Welcome back, Admin!");
        navigate("/admin");
      } else {
        toast.success("Welcome back!");
        navigate("/home");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error instanceof Error ? error.message : "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-row-reverse bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-50">
      <div className="hidden lg:flex w-1/2 flex-col items-center justify-center p-16 bg-[#800000]/5">
        <img src="/fullLogo.png" alt="Logo" className="w-96 h-64 object-contain mb-12" />
        <h2 className="text-4xl font-bold text-[#800000] mb-8">Welcome to EVENZA</h2>
        <div className="max-w-xl space-y-4">
          <p className="text-center text-gray-700 text-xl font-medium">Your Complete Event Management Solution</p>
          <p className="text-center text-gray-600 text-lg leading-relaxed">
            Plan, organize, and execute events with ease. Join thousands of event planners who trust EVENZA for their event management needs.
          </p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm shadow-xl rounded-2xl p-8">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center text-gray-800">Sign In</CardTitle>
            <CardDescription className="text-center text-gray-600">Enter your credentials to access your account</CardDescription>
          </CardHeader>

          <form onSubmit={submitHandler}>
            <CardContent className="space-y-4 mt-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Email</label>
                <Input
                  className="w-full h-11 px-4 rounded-lg border border-gray-300"
                  placeholder="Enter your email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading} // Disable input when loading
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Password</label>
                <Input
                  className="w-full h-11 px-4 rounded-lg border border-gray-300"
                  placeholder="Enter your password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading} // Disable input when loading
                />
              </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4 mt-6">
              <Button
                type="submit"
                disabled={loading}
                className={`w-full h-11 text-base font-semibold ${loading ? "bg-gray-400" : "bg-[#800000] hover:bg-[#800000]/90"} text-white`}
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>

              <p className="text-sm text-center text-gray-600">
                Don't have an account?{" "}
                <a href="/signup" className="text-[#800000] hover:text-[#800000]/80 font-medium">Sign up</a>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>

      <ToastContainer position="top-center" autoClose={2500} hideProgressBar />
    </div>
  );
};

export default LoginScreen;
