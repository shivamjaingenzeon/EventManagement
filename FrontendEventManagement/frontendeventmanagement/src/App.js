import logo from "./logo.svg";
import "./App.css";
import Login from "./Components/Login";
import { Provider } from "react-redux";
import store from "./store";
import LoginForm from "./Components/LoginForm";
import Header from "./Components/Header";
import Registration from "./Components/Registration";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AboutUs from "./Components/AboutUs";
import EventCreationForm from "./Components/EventForm";
import ProfilePage from "./Components/ProfilePage";
import LandingPage from "./Components/LandingPage";
import EventCard from "./Components/EventCard";
import HomePage from "./Components/HomePage";
import UserProfile from "./Components/UserProfile";
import CompanyRegistration from "./Components/ComapnyRegister";
import { useEffect, useState } from "react";
import eventService from "./Service/event.service";
import PendingEventCard from "./Components/PendingEventCard";
import { AuthGuard } from "./guard/auth.guard";
import MyEvent from "./Components/MyEvent";

function App() {
  const [eventArray, setEventArray] = useState([]);

  useEffect(() => {
    eventService.getAllEvents().then((Response) => {
      setEventArray(Response.data);
    });
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        {/* element={
              <AuthGuard>
                <EventPage />
              </AuthGuard>
            } */}
        <Route path="/" element={<LandingPage />}></Route>

        <Route path="/header" element={<Header />}></Route>

        <Route path="/registerUser" element={<Registration />}></Route>
        <Route path="/aboutus" element={<AboutUs />}></Route>
        <Route
          path="/createevent"
          element={
            <AuthGuard>
              <EventCreationForm />{" "}
            </AuthGuard>
          }
        ></Route>
        <Route
          path="/home"
          element={
            <AuthGuard>
              {" "}
              <HomePage />{" "}
            </AuthGuard>
          }
        ></Route>
        <Route
          path="/myevent"
          element={
            <AuthGuard>
              {" "}
              <MyEvent />{" "}
            </AuthGuard>
          }
        ></Route>

        <Route
          path="/profile"
          element={
            <AuthGuard>
              <UserProfile />
            </AuthGuard>
          }
        ></Route>
        <Route
          path="/registerCompany"
          element={<CompanyRegistration />}
        ></Route>

        <Route
          path="/unAuthorizedEvents"
          element={
            <AuthGuard>
              <PendingEventCard />
            </AuthGuard>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
