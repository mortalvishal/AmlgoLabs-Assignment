import React, { useState } from "react";
import AuthLayout from "../components/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { validateEmail } from "../utils/helper";
import ProfilePhotoSelector from "../components/ProfilePhotoSelector";

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // submit handler for the signup form submission
  const OnSubmitHandler = async (e) => {
    e.preventDefault();

    // if (!profilePic) {
    //   setError("Please select a profile picture");
    //   return;
    // }
    let profileImageUrl = ""
    if (!fullName) {
      setError("Please enter your full name");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!password) {
      setError("Please enter the password");
      return;
    }
    setError("");

    // SignUp API Call
    // On success, navigate to the home page
    navigate("/home");
  };
  return (
    <AuthLayout>
      <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Create an Account</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Join us today by entering your details below
        </p>

        <form onSubmit={OnSubmitHandler}>
          <ProfilePhotoSelector image = {profilePic} setImage = {setProfilePic} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label="Full Name"
              placeholder="Vishal"
              type="text"
            />
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
          </div>
          {error && <p className="text-red-500 text-xs pb-2.5">(error)</p>}
          
                    <button className="btn-primary" type="submit">
                      Sign Up
                    </button>
                    <p className="text-[13xl]">
                      Already have an Account? {" "}
                      <Link className="font-medium text-primary underline" to="/login">
                        LogIn
                      </Link>
                    </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
