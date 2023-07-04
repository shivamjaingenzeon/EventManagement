import React, { useState } from "react";
import EventDto from "../models/EventDto";
import eventService from "../Service/event.service";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./NavBar";

const EventCreationForm = () => {
  const [event, setEvent] = useState(new EventDto());
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const currentUser = useSelector((state) => state.user);

  const history = useNavigate();

  const dispatch = useDispatch();

  const formateDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  };
  const formatTime = (time) => {
    const [hours, minutes] = time.split(":");
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(0); // Set seconds to zero

    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    setEvent((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentUser.roleId === 1) event.eventAuthorizationStatus = false;
    else event.eventAuthorizationStatus = true;
    event.eventStartDate = formateDate(event.eventStartDate);
    event.eventEndDate = formateDate(event.eventEndDate);
    event.eventEndTime = formatTime(event.eventEndTime);
    event.eventStartTime = formatTime(event.eventStartTime);
    console.log(event);
    event.employeeId = currentUser.employeeId;
    eventService
      .registerEvent(currentUser.employeeId, event)
      .then((response) => {
        console.log("event register success ");
        history("/home");
      })
      .catch((error) => {
        console.log("not correct");
        console.log(error);
        setErrorMessage("email or password is not valid.");
        setLoading(false);
      });
  };

  return (
    <div>
      {" "}
      <Navbar />
      <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Create Event</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              For="eventName"
              className="block text-gray-700 font-bold mb-2"
            >
              Event Name:
            </label>
            <input
              type="text"
              id="eventName"
              name="eventName"
              className="w-full border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
              // value={eventName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              For="eventStartDate"
              className="block text-gray-700 font-bold mb-2"
            >
              Event Start Date:
            </label>
            <input
              type="date"
              id="eventStartDate"
              name="eventStartDate"
              className="w-full border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
              // value={eventStartDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              For="eventEndDate"
              className="block text-gray-700 font-bold mb-2"
            >
              Event End Date:
            </label>
            <input
              type="date"
              id="eventEndDate"
              name="eventEndDate"
              className="w-full border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
              //value={eventEndDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              For="eventStartTime"
              className="block text-gray-700 font-bold mb-2"
            >
              Event Start Time:
            </label>
            <input
              type="time"
              id="eventStartTime"
              name="eventStartTime"
              className="w-full border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
              //value={eventStartTime}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              For="eventEndTime"
              className="block text-gray-700 font-bold mb-2"
            >
              Event End Time:
            </label>
            <input
              type="time"
              id="eventEndTime"
              name="eventEndTime"
              className="w-full border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
              // value={eventEndTime}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              For="eventVenue"
              className="block text-gray-700 font-bold mb-2"
            >
              Event Venue:
            </label>
            <input
              type="text"
              id="eventVenue"
              name="eventVenue"
              className="w-full border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
              // value={eventVenue}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              For="eventDescription"
              className="block text-gray-700 font-bold mb-2"
            >
              Event Description:
            </label>
            <textarea
              id="eventDescription"
              name="eventDescription"
              className="w-full border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
              // value={eventDescription}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default EventCreationForm;
