import React, { useState } from "react";
import Header from "./Header";
import Navbar from "./NavBar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SignInDto from "../models/SignInDto";
import userService from "../Service/user.service";
const Registration = () => {
  const [user, setUser] = useState(new SignInDto());
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const currentUser = useSelector((state) => state.user);

  const history = useNavigate();

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("handler" + e.target.value);
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const defaultImageSrc = user.ImageSrc;

  const showPreview = (e) => {
    if (e.target.files && e.target.files[0]) {
      let ImageFile = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (x) => {
        setUser({
          ...user,
          ImageFile,
          ImageSrc: x.target.result,
        });
      };
      reader.readAsDataURL(ImageFile);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (user.roleId === "Employee") {
      user.roleId = 1;
    } else if (user.roleId === "Admin") {
      user.roleId = 2;
    } else {
      user.roleId = 3;
    }
    if (user.companyId === "Genzeon Pune") {
      user.companyId = 1;
    } else {
      user.companyId = 2;
    }
    if (user == null) {
      return;
    }

    // const formatData = new FormData();
    // formatData.append("employeeName", user.employeeName);
    // formatData.append("employeeContact", user.employeeContact);
    // formatData.append("employeeEmail", user.employeeEmail);
    // formatData.append("employeeDesignation", user.employeeDesignation);
    // formatData.append("password", user.password);
    // formatData.append("companyId", user.companyId);
    // formatData.append("roleId", user.roleId);
    // formatData.append("ImageFile", user.ImageFile);
    // formatData.append("ImageSrc", user.ImageSrc);
    console.log(user);
    userService
      .register(user)
      .then((response) => {
        console.log("login success " + response.data.username);
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
          encType="multipart/form-data"
        >
          <h2 class="text-3xl font-bold mb-6 text-center">Sign Up</h2>
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="floating_employeeName"
            >
              Employee Name
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="floating_employeeName"
              type="text"
              onChange={handleChange}
              placeholder="Enter your name"
              name="employeeName"
              required
            />
          </div>
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="floating_employeeContact"
            >
              Contact
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="floating_employeeContact"
              type="tel"
              onChange={handleChange}
              placeholder="Enter your contact number"
              name="employeeContact"
              required
            />
          </div>

          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="floating_employeeEmail"
            >
              Email
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="floating_employeeEmail"
              type="email"
              onChange={handleChange}
              placeholder="Enter your email address"
              name="employeeEmail"
              required
            />
          </div>
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="floating_confirmEmail"
            >
              Confirm Email
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="floating_confirmEmail"
              // onChange={handleChange}
              type="email"
              placeholder="Confirm your email address"
              required
            />
          </div>
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="floating_password"
            >
              Password
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="floating_password"
              type="password"
              onChange={handleChange}
              placeholder="Enter your password"
              name="password"
              required
            />
          </div>
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="floating_employeeDesignation"
            >
              Designation
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="floating_employeeDesignation"
              type="text"
              onChange={handleChange}
              placeholder="Enter your Designation"
              name="employeeDesignation"
              required
            />
          </div>
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="floating_companyId"
            >
              Company Name
            </label>
            <select
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="floating_companyId"
              onChange={handleChange}
              name="companyId"
              required
            >
              <option value="">Select a company</option>
              <option value="Genzeon Pune">Genzeon Pune</option>
              <option value="Genzeon Hyderabad">Genzeon Hyderabad</option>
            </select>
          </div>
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="floating_roleId"
            >
              Role
            </label>
            <select
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="floating_roleId"
              onChange={handleChange}
              name="roleId"
              required
            >
              <option value="">Select a role</option>
              <option value="Admin">HR admin</option>
              <option value="HR">HR</option>
              <option value="Employee">Employee</option>
            </select>
          </div>
          <div class="mb-4">
            <img src={user.imageSrc} height={100} width={100} align-center />
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="floating_ImageFile"
            >
              Employee Image
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="floating_ImageFile"
              accept="image/*"
              type="file"
              name="ImageFile"
              onChange={showPreview}
            />
          </div>
          <div class="flex items-center justify-center">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default Registration;
