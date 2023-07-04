export default class LoginDto {
  constructor(employeeEmail = null, password = null) {
    this.employeeEmail = employeeEmail;
    this.password = password;
  }
}
