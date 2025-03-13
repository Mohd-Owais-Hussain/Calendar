import React, { useEffect, useState } from "react";
import { FiLogOut } from "react-icons/fi";
import "./Navbar.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setCalendarMonth,
  setCalendarYear,
} from "../../redux/slices/calendarDataSlice";
import { axiosClient } from "../../utils/axiosClient";
import {
  KEY_ACCESS_TOKEN,
  getItem,
  removeItem,
} from "../../utils/localStorageManager";

function Navbar() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const showMonthYearSelect = location.pathname !== "/";
  const isLoggedIn = getItem(KEY_ACCESS_TOKEN);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currYear = useSelector(
    (state) => state.calendarDataReducer.calendarYear
  );
  const currMonth = useSelector(
    (state) => state.calendarDataReducer.calendarMonth
  );
  
  const years = [];
  for (let i = 1925; i <= 2125; i++) {
    years.push(i);
  }

  function changeMonth(e) {
    dispatch(setCalendarMonth(months.indexOf(e.target.value)));
  }

  function changeYear(e) {
    dispatch(setCalendarYear(e.target.value));
  }

  async function handleLogout() {
    try {
      await axiosClient.post("/auth/logout");
      removeItem(KEY_ACCESS_TOKEN);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="Navbar">
      <div className="nav-container">
        <div className="left-side">
          {showMonthYearSelect && (
            <div className="select-container">
              <select
                className="select-month"
                name="select-month"
                id="month"
                value={currMonth}
                onChange={changeMonth}
              >
                {months.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>

              <select
                className="select-year"
                name="select-month"
                id="year"
                value={currYear}
                onChange={changeYear}
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
        <Link to="/">
          <div className="banner">Calendar</div>
        </Link>
        <div className="right-side">
          {!showMonthYearSelect && isLoggedIn && (
            <div className="logout-btn" onClick={handleLogout}>
              <div className="logout-text">Log out</div>
              <div className="logout-icon">
                <FiLogOut />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
