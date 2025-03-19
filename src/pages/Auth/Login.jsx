import { useState } from "react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/authService"; // Import the service

const Login = () => {
  const [formData, setFormData] = useState({ email: "", passwordHash: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token } = await authService.login(formData); // Use the service
      localStorage.setItem("token", token);
      navigate("/dashboard");
      setMessage("Login successful!");
    } catch (error) {
      setMessage(error.message || "An error occurred. Please try again.");
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const { token } = await authService.googleLogin(
        credentialResponse.credential
      ); // Use the service
      localStorage.setItem("token", token);
      navigate("/dashboard");
      setMessage("Google login successful!");
    } catch (error) {
      setMessage(error.message || "An error occurred during Google login.");
    }
  };

  const handleGoogleError = () => {
    setMessage("Google login failed. Please try again.");
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen h-screen md:h-auto">
      {/* Left Section - Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-gray-100 relative px-6 py-8 md:py-0 h-full md:min-h-screen">
        {/* Register Button */}
        <div className="absolute top-4 right-6">
          <Button
            variant="link"
            className="text-gray-700"
            onClick={() => navigate("/register")}
          >
            Register
          </Button>
        </div>

        {/* Logo */}
        <div className="md:hidden flex justify-center mb-6">
          <img src="/abc.png" alt="Logo" className="h-20 w-auto" />
        </div>

        <div className="max-w-sm w-full mt-20">
          <h2 className="text-3xl font-semibold mb-6 text-center">
            Login to your account
          </h2>
          {message && (
            <p className="mb-4 text-red-500 text-center">{message}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              className="bg-gray-50 w-full px-4 py-3 rounded-md"
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Input
              className="bg-gray-50 w-full px-4 py-3 rounded-md"
              type="password"
              name="passwordHash"
              placeholder="Password"
              value={formData.passwordHash}
              onChange={handleChange}
              required
            />
            <Button type="submit" className="w-full py-3">
              Login with Email
            </Button>
          </form>

          <div className="relative mt-6 mb-5">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-gray-100 px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <div className="flex justify-center w-full">
            <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_API}>
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                width="100%"
              />
            </GoogleOAuthProvider>
          </div>

          <p className="text-center text-sm text-gray-500 mt-8">
            By clicking continue, you agree to our{" "}
            <a href="#" className="underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>

      {/* Right Section - Image */}
      <div
        className="hidden md:flex md:w-1/2 h-full md:h-auto bg-cover bg-center animate-fadeIn delay-200"
        style={{
          backgroundImage: `url('/abc.png')`, // Replace with the actual path to your image
        }}
      ></div>
    </div>
  );
};

export default Login;
