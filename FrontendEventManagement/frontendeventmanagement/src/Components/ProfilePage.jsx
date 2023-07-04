import React, { useEffect, useState } from "react";
import Navbar from "./NavBar";

const ProfileCard = ({ userDto }) => {
  return (
    <section>
      <Navbar />
      <div class="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div class="flex justify-center">
          <img
            class="h-32 w-32 rounded-full object-cover mt-6"
            src="https://feeds.abplive.com/onecms/images/uploaded-images/2023/04/22/0a785f78ec2738827aea39f6db1ca3971682135534636586_original.jpg?impolicy=abp_cdn&imwidth=650"
            alt="Profile Picture"
          />
        </div>
        <div class="text-center px-6 py-4">
          <h2 class="text-xl font-bold text-gray-800 mt-4">
            <p>{userDto.employeeName}</p>
          </h2>
          <p class="text-gray-600">Email: {userDto.employeeEmail}</p>
          <p class="text-gray-600">Username: {userDto.employeeEmail}</p>
          <p class="text-gray-600">Contact: {userDto.employeeContact}</p>
          <p class="text-gray-600">
            Designation: {userDto.employeeDesignation}
          </p>
          <p class="text-gray-600">
            Company Name:{" "}
            {userDto.companyId == 1 ? "Genzeon Pune" : "Genzeon Hyderabad"}
          </p>
          <div class="flex items-center justify-center mt-6">
            <a
              href="https://www.linkedin.com/in/johndoe"
              target="_blank"
              class="text-blue-500 hover:text-blue-700 mr-4"
            >
              <i class="fab fa-linkedin">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/480px-LinkedIn_logo_initials.png"
                  height="50"
                  width="50"
                />
              </i>
            </a>
            <a
              href="https://github.com/johndoe"
              target="_blank"
              class="text-gray-500 hover:text-gray-700"
            >
              <i class="fab fa-github">
                <img
                  src="https://1000logos.net/wp-content/uploads/2021/05/GitHub-logo.png"
                  height="50"
                  width="50"
                />
              </i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileCard;
