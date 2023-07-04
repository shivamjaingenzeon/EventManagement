import store from "../store/index";
import axios from "axios";
import { clearCurrentUser } from "../store/actions/user";

export const authHeader = () => {
  const currentUser = store.getState().user;

  return {
    "Content-Type": "application/json",
    authorization: "Bearer " + currentUser?.token,
  };
};

export const authImageHeader = () => {
  const currentUser = store.getState().user;

  return {
    "Content-Type": "multipart/form-data",
    authorization: "Bearer " + currentUser?.token,
  };
};

export const getUserRole = () => {
  const currentUser = store.getState().user;
  return currentUser.role;
};
