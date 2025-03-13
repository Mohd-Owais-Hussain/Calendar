import React, { useEffect, useState } from "react";
import "./Home.scss";
import Login from "../../components/login/Login";
import Signup from "../../components/signup/Signup";
import { KEY_ACCESS_TOKEN, getItem } from "../../utils/localStorageManager";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setCalendarMonth,
  setCalendarYear,
} from "../../redux/slices/calendarDataSlice";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openSignupModal, setOpenSignupModal] = useState(false);

  useEffect(() => {
    dispatch(setCalendarYear(new Date().getFullYear()));
    dispatch(setCalendarMonth(new Date().getMonth()));
  }, []);

  function toggleLoginModal() {
    const user = getItem(KEY_ACCESS_TOKEN);
    if (user) {
      navigate("/calendar");
    } else {
      setOpenLoginModal(!openLoginModal);
    }
  }

  function toggleSignupModal() {
    setOpenSignupModal(!openSignupModal);
  }

  function goToSignUp() {
    setOpenLoginModal(!openLoginModal);
    setOpenSignupModal(!openSignupModal);
  }

  function goToLogin() {
    setOpenSignupModal(!openSignupModal);
    setOpenLoginModal(!openLoginModal);
  }

  return (
    <div className="Home">
      <div className="hero">
        <div className="hero-content">
          <div className="tagline">
            <h1>Plan. Schedule. Simplify.</h1>
            <h2>Schedule events with ease and never miss a moment.</h2>
          </div>
          <button onClick={toggleLoginModal} className="get-started-btn">
            Get Started
          </button>
        </div>
      </div>
      {openLoginModal && (
        <Login signupClicked={goToSignUp} closeModal={toggleLoginModal} />
      )}
      {openSignupModal && (
        <Signup loginClicked={goToLogin} closeModal={toggleSignupModal} />
      )}
    </div>
  );
}

export default Home;
