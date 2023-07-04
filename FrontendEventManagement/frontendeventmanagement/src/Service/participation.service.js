import {
  PENDING_EVENT_URL,
  PARTICIPATE_EVENT_URL,
  PARTICIPATE_STATUS_URL,
  PARTICIPATED_EVENT_URL,
} from "../Components/constants";
import axios from "axios";
import { authHeader } from "./base.service";
class ParticipationService {
  participateEvent(employeeId, eventId) {
    return axios
      .post(PARTICIPATE_EVENT_URL + employeeId + "/" + eventId, {
        headers: authHeader(),
      })
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }
  checkParticipationStatus = (employeeId, eventId) => {
    return axios
      .get(PARTICIPATE_STATUS_URL + employeeId + "/" + eventId + "/" + "status")
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  };

  getParticipatedEvents(employeeId) {
    return axios.get(PARTICIPATED_EVENT_URL + employeeId, {
      headers: authHeader(),
    });
  }
}
const participationService = new ParticipationService();
export default participationService;
