import React, { useState } from "react";
import "./Login.scss";
import { IoClose } from "react-icons/io5";
import { axiosClient } from "../../utils/axiosClient";
import { KEY_ACCESS_TOKEN, setItem } from "../../utils/localStorageManager";
import { useNavigate } from "react-router-dom";

function Login({ signupClicked, closeModal }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await axiosClient.post("/auth/login", {
      email,
      password,
    });
    setItem(KEY_ACCESS_TOKEN, response.result.accessToken);
    navigate("/calendar");
  }

  return (
    <div className="Login">
      <div onClick={closeModal} className="overlay">
        <div onClick={(e) => e.stopPropagation()} className="login-box">
          <div onClick={closeModal} className="close-btn">
            <IoClose />
          </div>
          <div className="heading">Log In</div>
          <form onSubmit={handleSubmit}>
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
            Don't have an account yet?{" "}
            <span onClick={signupClicked} className="signup-link">
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
