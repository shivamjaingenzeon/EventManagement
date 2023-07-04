import axios from "axios";
import {
  REGISTER_PROFILE_URL,
  USER_PROFILE_URL,
} from "../Components/constants";
import { authHeader } from "./base.service";

class UserService {
  getprofile(userid) {
    return axios.get(USER_PROFILE_URL + userid, { headers: authHeader() });
  }
  register(user) {
    return axios.post(REGISTER_PROFILE_URL, user, { headers: authHeader() });
  }
}
const userService = new UserService();

export default userService;
