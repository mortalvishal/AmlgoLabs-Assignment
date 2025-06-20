import React, { useState } from "react";
import AuthLayout from "../components/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { validateEmail } from "../utils/helper";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Submit Handler for the login form submission
  const OnSubmitHandler = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!password) {
      setError("Please enter the password");
      return;
    }
    setError("");
    // Login API Call
  };

  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Please enter your details to log in
        </p>
        <form onSubmit={OnSubmitHandler}>
          <Input
            type="email"
            placeholder="abc@gmail.com"
            value={email}
            label="Email Address"
            onChange={({ target }) => setEmail(target.value)}
          />
          <Input
            type="password"
            placeholder="********"
            value={password}
            label="Password"
            onChange={({ target }) => setPassword(target.value)}
          />

          {error && <p className="text-red-500 text-xs pb-2.5">(error)</p>}

          <button className="btn-primary" type="submit">
            Log In
          </button>
          <p className="text-[13xl]">
            Don't have an account?{" "}
            <Link className="font-medium text-primary underline" to="/signup">
              SignUp
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
