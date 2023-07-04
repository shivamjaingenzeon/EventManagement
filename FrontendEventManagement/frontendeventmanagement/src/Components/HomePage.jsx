import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import eventService from "../Service/event.service";
import EventCard from "./EventCard";
import Navbar from "./NavBar";

const HomePage = (props) => {
  const user = useSelector((state) => state.user);
  const [eventArray, setEventArray] = useState([]);

  useEffect(() => {
    eventService.getAllEvents().then((Response) => {
      setEventArray(Response.data);
    });
  }, []);

  return (
    <div class="dark:text-white">
      <Navbar />
      {eventArray.map((event) => (
        <EventCard key={event.eventId} event={event} user={user} />
      ))}
    </div>
  );
};
export default HomePage;
