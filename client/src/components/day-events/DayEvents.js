import React, { useEffect, useRef, useState } from "react";
import "./DayEvents.scss";
import { IoClose } from "react-icons/io5";
import { IoAdd } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import { axiosClient } from "../../utils/axiosClient";
import { useDispatch, useSelector } from "react-redux";
import { addEvent } from "../../redux/slices/eventsDataSlice";
import { TbCalendarSad } from "react-icons/tb";
import SingleEvent from "../single-event/SingleEvent";

function DayEvents({ closeDayEvents, date, day, month, events }) {
  const dispatch = useDispatch();
  const eventsContainerRef = useRef();
  const [firstRender, setFirstRender] = useState(true);
  const [newEvent, setNewEvent] = useState("");
  const [openAddEvent, setOpenAddEvent] = useState(false);

  const calendarMonth = useSelector(
    (state) => state.calendarDataReducer.calendarMonth
  );
  const calendarYear = useSelector(
    (state) => state.calendarDataReducer.calendarYear
  );

  function onAddEventClick() {
    setOpenAddEvent(!openAddEvent);
  }

  useEffect(() => {
    if (firstRender) {
      setFirstRender(false);
    } else if (openAddEvent === true) {
      eventsContainerRef.current.scrollTop =
        eventsContainerRef.current.scrollHeight;
    }
  }, [openAddEvent]);

  async function addNewEvent(e) {
    e.preventDefault();
    try {
      const response = await axiosClient.post("/calendar/addEvent", {
        desc: newEvent,
        date,
        calendarMonth,
        calendarYear,
      });
      dispatch(addEvent(response.result));
      setNewEvent("");
    } catch (e) {
      console.log("error ->", e);
    }
  }

  return (
    <div className="DayEvents">
      <div className="overlay" onClick={closeDayEvents}>
        <div className="container" onClick={(e) => e.stopPropagation()}>
          <div className="header">
            <div className="date">
              {day}, {date} {month}
            </div>
            <div className="right-side">
              <div className="add-event-btn" onClick={onAddEventClick}>
                <div className="add-icon">
                  <IoAdd />
                </div>
                <div className="add-event-text">Add New Event</div>
              </div>
              <div className="close-btn" onClick={closeDayEvents}>
                <IoClose />
              </div>
            </div>
          </div>

          <div className="events-container" ref={eventsContainerRef}>
            {events?.length === 0 && (
              <div className="no-events-box">
                <div className="no-events-icon">
                  <TbCalendarSad />
                </div>
                <p className="no-events-text">No Events</p>
              </div>
            )}
            {!(events?.length === 0) &&
              events?.map((event) => {
                return <SingleEvent key={event._id} event={event} />;
              })}

            {openAddEvent && (
              <form className="add-event-form" onSubmit={addNewEvent}>
                <input
                  className="input-field"
                  type="text"
                  value={newEvent}
                  onChange={(e) => setNewEvent(e.target.value)}
                />
                <label className="submit-add-event-btn" htmlFor="submitBtn">
                  <FaCheck />
                </label>
                <input
                  className="submit-add-event"
                  id="submitBtn"
                  type="submit"
                />
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DayEvents;
