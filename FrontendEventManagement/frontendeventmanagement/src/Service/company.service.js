import axios from "axios";
import {
  REGISTER_COMPANY_URL,
  USER_PROFILE_URL,
} from "../Components/constants";
import { authHeader } from "./base.service";

class CompanyService {
  getprofile(userid) {
    return axios.get(USER_PROFILE_URL + userid, { headers: authHeader() });
  }
  register(company) {
    return axios.post(REGISTER_COMPANY_URL, company, { headers: authHeader() });
  }
}
const companyService = new CompanyService();

export default companyService;
