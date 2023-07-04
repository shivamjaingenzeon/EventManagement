import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { setCurrentUser } from "../store/actions/user";
import authenticationService from "../Service/authentication.service";

import LoginDto from "../models/LoginDto";
const Login = (props) => {
  const [user, setUser] = useState(new LoginDto());
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const currentUser = useSelector((state) => state.user);

  const history = useNavigate();

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("dfadfd");
    console.log("email " + user.employeeEmail + " pwd " + user.password);

    if (!user.employeeEmail || !user.password) {
      return;
    }
    console.log("email " + user.employeeEmail + " pwd " + user.password);

    authenticationService
      .login(user)
      .then((response) => {
        console.log("login success " + response.data.username);
        dispatch(setCurrentUser(response.data));
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
    <React.Fragment>
      <div className="m-auto max-w-lg rounded place-items-center overflow-hidden shadow-lg p-10">
        <form onSubmit={submitHandler}>
          <img
            className="mb-6"
            src="https://gumlet.assettype.com/freepressjournal/2023-04/0c3bfd73-efb1-4ccd-9cb2-c3cfc640e32a/1500x500__2_.jfif"
            width={400}
            height={400}
          />
          <p className="dark:text-white text-3xl mb-11">Login</p>

          <div class="relative z-0 w-full mb-6 group">
            <input
              onChange={handleChange}
              type="text"
              name="employeeEmail"
              id="floating_employeeEmail"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              for="floating_employeeEmail"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Username
            </label>
          </div>

          <div class="relative z-0 w-full mb-6 group">
            <input
              onChange={handleChange}
              type="password"
              name="password"
              id="floating_password"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              for="floating_password"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>
          </div>

          <div class="flex justify-between">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Login
            </button>

            {/* <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => { navigate('/register') }}>Sign Up</button>  */}
            <p>
              New User? &nbsp;
              <a
                href="/registerUser"
                class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                Sign up
              </a>
              &nbsp; here.
            </p>
          </div>
        </form>

        <div class="relative z-0 w-full group mt-10">
          <p class="text-gray-500 dark:text-gray-400">
            Lets us simplify the hardwork, register your{" "}
            <a
              href="/registerCompany"
              class="inline-flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
              Organization
              <svg
                aria-hidden="true"
                class="w-5 h-5 ml-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </a>
          </p>
        </div>
      </div>
      ;
    </React.Fragment>
  );
};
export default Login;
