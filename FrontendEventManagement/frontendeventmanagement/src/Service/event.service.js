import {
  ALL_EVENTS_URL,
  REGISTER_EVENT_URL,
  PENDING_EVENT_URL,
  DELETE_REJECTED_EVENT_URL,
  ACCEPT_EVENT_URL,
  GET_EVENT_BY_EMPLOYEE_ID_URL,
} from "../Components/constants";
import axios from "axios";
import { authHeader } from "./base.service";
class EventService {
  getAllEvents() {
    return axios.get(ALL_EVENTS_URL, {
      headers: authHeader(),
    });
  }
  getEventByEmployeeId(employeeId) {
    return axios.get(GET_EVENT_BY_EMPLOYEE_ID_URL + employeeId, {
      headers: authHeader(),
    });
  }
  registerEvent(employeeId, event) {
    console.log(event);
    console.log("event service");
    return axios.post(REGISTER_EVENT_URL + employeeId, event, {
      headers: authHeader(),
    });
  }

  getUnauthorizedEvents() {
    return axios.get(PENDING_EVENT_URL, {
      headers: authHeader(),
    });
  }
  delteRejectedEvents(eventId) {
    return axios.delete(DELETE_REJECTED_EVENT_URL + eventId, {
      headers: authHeader(),
    });
  }
  acceptEvent(eventId, event) {
    return axios.put(ACCEPT_EVENT_URL + eventId, event, {
      headers: authHeader(),
    });
  }
}
const eventService = new EventService();
export default eventService;
