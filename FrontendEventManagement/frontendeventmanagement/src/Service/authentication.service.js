import { LOGIN_URL } from "../Components/constants";
import axios from "axios";

class AuthenticationService {
  login(user) {
    return axios.post(LOGIN_URL, user);
  }
}

const authenticationService = new AuthenticationService();
export default authenticationService;
