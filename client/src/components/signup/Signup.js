import React, { useState } from "react";
import "./Signup.scss";
import { IoClose } from "react-icons/io5";
import { axiosClient } from "../../utils/axiosClient";

function Signup({ loginClicked, closeModal }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await axiosClient.post("/auth/signup", {
      name,
      email,
      password,
    });
  }

  return (
    <div className="Signup">
      <div onClick={closeModal} className="overlay">
        <div onClick={(e) => e.stopPropagation()} className="signup-box">
          <div onClick={closeModal} className="close-btn">
            <IoClose />
          </div>
          <div className="heading">Sign Up</div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              className="name"
              type="text"
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="email">Email</label>
            <input
              id="email"
              className="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password">Password</label>
            <input
              id="password"
              className="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input type="submit" className="submit" />
          </form>
          <p className="subheading">
            Already have an account?{" "}
            <span onClick={loginClicked} className="login-link">
              Log In
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
