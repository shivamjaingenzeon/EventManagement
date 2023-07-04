import React, { useEffect, useState } from "react";
import Navbar from "./NavBar";
import eventService from "../Service/event.service";
import { useNavigate } from "react-router-dom";
import participationService from "../Service/participation.service";
import { useSelector } from "react-redux";

const EventCard = ({ event, onUpdate }) => {
  const [accepted, setAccepted] = useState(false);
  const history = useNavigate();
  const currentUser = useSelector((state) => state.user);
  const [isParticipated, setIsParticipated] = useState(false);

  useEffect(() => {
    const checkParticipationStatus = async () => {
      try {
        const participationStatus =
          await participationService.checkParticipationStatus(
            currentUser.employeeId,
            event.eventId
          );
        setIsParticipated(participationStatus);
      } catch (error) {
        console.log(error);
      }
    };

    checkParticipationStatus();
  }, [currentUser.employeeId, event.eventId]);

  function formateDate(datestring) {
    const date = new Date(datestring);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  }

  const participateEvent = () => {
    participationService
      .participateEvent(currentUser.employeeId, event.eventId)
      .then(() => {
        setIsParticipated(true);
        history("/home");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteEvent = () => {
    setAccepted(true);
    eventService
      .delteRejectedEvents(event.eventId)
      .then(() => {
        history("/unAuthorizedEvents");
        if (typeof onUpdate === "function") {
          onUpdate();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const acceptEvent = () => {
    setAccepted(true);
    event.eventAuthorizationStatus = true;
    eventService
      .acceptEvent(event.eventId, event)
      .then(() => {
        history("/unAuthorizedEvents");
        if (typeof onUpdate === "function") {
          onUpdate();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="m-auto max-w-sm rounded place-items-center overflow-hidden shadow-lg">
        <div className="px-4 py-8">
          <div className="text-gray-900 text-xl mb-2">
            Event Name: {event.eventName}
          </div>
          <p className="text-gray-700 text-[14px] mb-2">
            <h2>Event Description: </h2> {event.eventDescription}
          </p>
          <p className="text-gray-600 text-sm mb-2">
            Event Start Date: {formateDate(event.eventStartDate)}
          </p>
          <p className="text-gray-600 text-sm mb-2">
            Event End Date: {formateDate(event.eventEndDate)}
          </p>
          <p className="text-gray-600 text-sm mb-2">
            Event Start Time: {event.eventStartTime}
          </p>
          <p className="text-gray-600 text-sm mb-2">
            Event End Time: {event.eventEndTime}
          </p>
          <p className="text-gray-600 text-sm mb-2">
            Event Venue: {event.eventVenue}
          </p>
        </div>

        {event.eventAuthorizationStatus === true && !isParticipated && (
          <div className="px-6 py-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded"
              onClick={participateEvent}
            >
              Enroll Event
            </button>
          </div>
        )}

        {event.eventAuthorizationStatus === false && (
          <div className="px-6 py-4">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={acceptEvent}
            >
              Accept Event
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
              onClick={deleteEvent}
            >
              Reject Event
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCard;
