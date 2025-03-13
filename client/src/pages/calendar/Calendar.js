import React, { useEffect, useState } from "react";
import "./Calendar.scss";
import DayCard from "../../components/day-card/DayCard";
import { getDaysInMonth, getDay } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { fetchEventData } from "../../redux/slices/eventsDataSlice";

function Calendar() {
  const dispatch = useDispatch();
  const selectedYear = useSelector(
    (state) => state.calendarDataReducer.calendarYear
  );
  const selectedMonth = useSelector(
    (state) => state.calendarDataReducer.calendarMonth
  );
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
  const daysInWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const daysInSelectedMonth = getDaysInMonth(
    new Date(selectedYear, months.indexOf(selectedMonth))
  );
  const numberOfDays = [];
  for (let i = 1; i <= daysInSelectedMonth; i++) {
    numberOfDays.push(i);
  }

  const getStartingDayOfMonth = new Date(
    selectedYear,
    months.indexOf(selectedMonth),
    1
  ).getDay();

  function emptyDivs() {
    const divs = [];
    for (let i = 0; i < getStartingDayOfMonth; i++) {
      divs.push(<div key={i}></div>);
    }
    return divs;
  }

  useEffect(() => {
    try {
      console.log(selectedYear, selectedMonth);
      dispatch(fetchEventData({ year: selectedYear, month: selectedMonth }));
    } catch (e) {
      console.log("error", e);
    }
  }, [selectedMonth, selectedYear]);

  const events = useSelector((state) => state.eventsDataReducer.events);
  return (
    <div className="Calendar">
      <div className="container">
        <div className="day-names">
          {daysInWeek.map((day) => (
            <p key={day} className="single-day">
              {day.substring(0, 3)}
            </p>
          ))}
        </div>
        <div className="days">
          {emptyDivs()}
          {numberOfDays.map((date) => (
            <DayCard
              key={date}
              date={date}
              day={
                daysInWeek[
                  getDay(
                    new Date(selectedYear, months.indexOf(selectedMonth), date)
                  )
                ]
              }
              month={selectedMonth}
              year={selectedYear}
              events={events?.filter((event) => event.date === date)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Calendar;
