import React, { useEffect, useState } from "react";
import "./DayCard.scss";
import DayEvents from "../day-events/DayEvents";

function DayCard({ date, day, month, year, events }) {
  const [openDayEvents, setOpenDayEvents] = useState(false);

  const isTodayDate = date === new Date().getDate();
  const isTodayMonth =
    month === new Date().toLocaleString("default", { month: "long" });
  const isTodayYear = year == new Date().getFullYear();

  return (
    <div
      className="DayCard"
      style={{
        backgroundColor:
          isTodayDate && isTodayMonth && isTodayYear && "#ffffb1",
      }}
      onClick={() => setOpenDayEvents(!openDayEvents)}
    >
      <div
        className="date"
        style={{
          backgroundColor:
            isTodayDate && isTodayMonth && isTodayYear && "#ffaa3a",
        }}
      >
        <div className="day-number">{date}</div>
        <div className="month">{month.substring(0, 3)}</div>
      </div>
      <ul className="task-list">
        {events?.map((event) => (
          <li key={event._id} className="task">
            {event.desc}
          </li>
        ))}
      </ul>
      {openDayEvents && (
        <DayEvents
          date={date}
          day={day}
          month={month.substring(0, 3)}
          events={events}
          closeDayEvents={() => setOpenDayEvents(!openDayEvents)}
        />
      )}
    </div>
  );
}

export default DayCard;
