import React, { useEffect, useState } from "react";
import "./SingleEvent.scss";
import { FaCheck, FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { axiosClient } from "../../utils/axiosClient";
import { useDispatch } from "react-redux";
import {
  deleteSingleEvent,
  editSingleEvent,
} from "../../redux/slices/eventsDataSlice";

function SingleEvent({ event }) {
  const dispatch = useDispatch();
  const [showEditInput, setShowEditInput] = useState(false);
  const [editedEvent, setEditedEvent] = useState(event.desc);

  async function editEvent(e) {
    e.preventDefault();
    try {
      const response = await axiosClient.post("/calendar/editEvent", {
        _id: event._id,
        desc: editedEvent,
      });
      dispatch(editSingleEvent(response.result));
      setShowEditInput(!showEditInput);
    } catch (e) {
      console.log("error ->", e);
    }
  }

  async function deleteEvent() {
    try {
      const response = await axiosClient.delete(
        `/calendar/deleteEvent?_id=${event._id}`
      );
      dispatch(deleteSingleEvent(event._id));
    } catch (e) {
      console.log("error ->", e);
    }
  }

  return (
    <div className="SingleEvent">
      <div className="event-options">
        <div
          className="edit-event-btn"
          onClick={() => setShowEditInput(!showEditInput)}
        >
          <FaRegEdit />
        </div>
        <div className="delete-event-btn" onClick={deleteEvent}>
          <RiDeleteBinLine />
        </div>
      </div>
      {!showEditInput && <p className="event-desc">{event.desc}</p>}

      {showEditInput && (
        <form className="edit-event-form" onSubmit={editEvent}>
          <input
            className="edit-event-input"
            type="text"
            value={editedEvent}
            onChange={(e) => setEditedEvent(e.target.value)}
          />

          <label className="submit-edit-event-btn" htmlFor="submitBtn">
            <FaCheck />
          </label>

          <input className="submit-edit-event" id="submitBtn" type="submit" />
        </form>
      )}
    </div>
  );
}

export default SingleEvent;
