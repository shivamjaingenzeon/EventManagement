import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import eventService from "../Service/event.service";
import EventCard from "./EventCard";
import Navbar from "./NavBar";

const PendingEventCard = () => {
  const user = useSelector((state) => state.user);
  const [eventArray, setEventArray] = useState([]);
  const [shouldUpdate, setShouldUpdate] = useState(false); // New state variable

  useEffect(() => {
    eventService.getUnauthorizedEvents().then((Response) => {
      setEventArray(Response.data);
    });
  }, [shouldUpdate]);

  const handleUpdate = () => {
    setShouldUpdate((prevState) => !prevState); // Toggle shouldUpdate value
  };

  return (
    <div class="dark:text-white">
      <Navbar />
      {eventArray.length === 0 ? ( // Conditional rendering based on the length of eventArray
        <div className="flex flex-col items-center justify-center p-10">
          <h1 className="text-3xl font-bold text-black">No Pending Events</h1>
        </div>
      ) : (
        eventArray.map((event) => (
          <EventCard
            key={event.eventId}
            event={event}
            user={user}
            onUpdate={handleUpdate}
          />
        ))
      )}
    </div>
  );
};

export default PendingEventCard;
