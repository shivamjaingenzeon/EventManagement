import React from "react";
import store from "../store";
import { clearCurrentUser } from "../store/actions/user";
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const signOutHandler = () => {
    store.dispatch(clearCurrentUser());
  };
  return (
    <nav className="bg-blue-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <a href="/" className="text-white text-xl  font-bold">
              Event Managment
            </a>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <ul className="ml-10 flex items-baseline space-x-4">
                <li className={`${user != null ? "" : "hidden"}`}>
                  <a
                    href="/home"
                    className="text-white hover:bg-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Home
                  </a>
                </li>
                <li className={`${user != null ? "" : "hidden"}`}>
                  <a
                    href="/myevent"
                    className="text-white hover:bg-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    My Events
                  </a>
                </li>
                <li
                  className={`${
                    user?.roleId === 2 || user?.roleId === 3 ? "" : "hidden"
                  }`}
                >
                  <a
                    href="/unAuthorizedEvents"
                    className="text-white hover:bg-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Pending Event
                  </a>
                </li>
                <li className={`${user != null ? "" : "hidden"}`}>
                  <a
                    href="createevent"
                    className="text-white hover:bg-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Create Event
                  </a>
                </li>
                <li className={`${user != null ? "" : "hidden"}`}>
                  <a
                    href="/profile"
                    className="text-white hover:bg-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    View Profiles
                  </a>
                </li>

                <a
                  href="/aboutus"
                  className="text-white hover:bg-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  About Us
                </a>
                <li className={`${user != null ? "" : "hidden"}`}>
                  <a
                    href="/header"
                    className="text-white hover:bg-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                    onClick={signOutHandler}
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
