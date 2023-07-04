import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import eventService from "../Service/event.service";
import EventCard from "./EventCard";
import Navbar from "./NavBar";
import participationService from "../Service/participation.service";

const MyEvent = () => {
  var number = 0;
  const user = useSelector((state) => state.user);
  const [eventArray, setEventArray] = useState([]);
  const [participatedArray, setParticipatedArray] = useState([]);
  const [showParticipation, setShowParticipation] = useState(false);

  const handleShowParticipation = () => {
    console.log("handle service get participations");
    setShowParticipation(!showParticipation);
  };
  function formateDate(datestring) {
    const date = new Date(datestring);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  }

  useEffect(() => {
    eventService
      .getEventByEmployeeId(user.employeeId)
      .then((response) => {
        setEventArray(response.data);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });

    participationService
      .getParticipatedEvents(user.employeeId)
      .then((response) => {
        console.log("participation service get participations");
        console.log(response.data);
        setParticipatedArray(response.data);
      })
      .catch((error) => {
        console.error("Error fetching participated events:", error);
      });
  }, [user.employeeId]);

  return (
    <div class="dark:text-white">
      <Navbar />
      <div>
        <h1 className="text-2xl font-bold text-black text-center">
          {" "}
          My Hosted Events
        </h1>
      </div>
      {eventArray.length === 0 ? ( // Conditional rendering based on the length of eventArray
        <div className="flex flex-col items-center justify-center p-10">
          <h1 className="text-3xl font-bold text-black"> My Hosted Events</h1>
        </div>
      ) : (
        eventArray.map((event) => (
          <EventCard key={event.eventId} event={event} user={user} />
        ))
      )}
      <div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 "
          onClick={handleShowParticipation}
        >
          Show Participation
        </button>
        {showParticipation && (
          <>
            {participatedArray.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-10">
                <h1 className="text-3xl font-bold text-black">
                  No Participations
                </h1>
              </div>
            ) : (
              <div>
                <h1 className="min-w-full bg-white text-black text-center text-xl md:font-bold">
                  My Participations
                </h1>
                <table className="min-w-full bg-white border-2 border-gray-300">
                  <thead>
                    <tr className="bg-blue text-black border-2">
                      <th className="py-2 px-4">Sr. No</th>
                      <th className="py-2 px-4">Event Name</th>
                      <th className="py-2 px-4">Event Date</th>
                      <th className="py-2 px-4">Event Venue</th>
                      <th className="py-2 px-4">Event Start Time</th>
                      <th className="py-2 px-4">Event End Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {participatedArray.map((event, index) => (
                      <tr
                        key={event.eventId}
                        className="text-center border-b border-gray-300 text-black"
                      >
                        <td className="py-2 px-4">{index + 1}</td>
                        <td className="py-2 px-4">{event.eventName}</td>
                        <td className="py-2 px-4">
                          {formateDate(event.eventStartDate)}
                        </td>
                        <td className="py-2 px-4">{event.eventVenue}</td>
                        <td className="py-2 px-4">{event.eventStartTime}</td>
                        <td className="py-2 px-4">{event.eventEndTime}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MyEvent;
