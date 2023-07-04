import React, { useState } from "react";
import Header from "./Header";
import Navbar from "./NavBar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import userService from "../Service/user.service";
import CompanyDto from "../models/CompanyDto";
import companyService from "../Service/company.service";
const CompanyRegistration = () => {
  const [company, setCompany] = useState(new CompanyDto());
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const currentUser = useSelector((state) => state.user);

  const history = useNavigate();

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("handler" + e.target.value);
    setCompany((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    console.log("submit handler");
    console.log(company);
    companyService
      .register(company)
      .then((response) => {
        console.log("register seuccessfull " + response.data.companyName);
        history("/header");
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
      <Navbar />
      <div class="flex items-center justify-center bg-gray-100">
        <form
          onSubmit={submitHandler}
          class="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 w-1/3"
        >
          <h2 class="text-3xl font-bold mb-6 text-center">
            Company Registration
          </h2>
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="floating_companyName"
            >
              Company Name
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="floating_companyName"
              name="companyName"
              type="text"
              onChange={handleChange}
              placeholder="Enter company name"
            />
          </div>
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="floating_companyEmail"
            >
              Email
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="floating_companyEmail"
              name="companyEmail"
              type="email"
              onChange={handleChange}
              placeholder="Enter company email address"
            />
          </div>
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="floating_companyContact1"
            >
              Contact 1
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="floating_companyContact1"
              name="companyContact1"
              type="tel"
              onChange={handleChange}
              placeholder="Enter company contact number"
            />
          </div>
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="floating_companyContact2"
            >
              Contact 2
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="floating_companyContact2"
              name="companyContact2"
              onChange={handleChange}
              type="tel"
              placeholder="Enter additional contact number"
            />
          </div>
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="floating_companyLocation"
            >
              Location
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="floating_companyLocation"
              name="companyLocation"
              type="text"
              onChange={handleChange}
              placeholder="Enter company location"
            />
          </div>
          <div class="flex items-center justify-center">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default CompanyRegistration;
