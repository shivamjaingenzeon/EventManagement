export default class SignInDto {
  constructor(
    employeeName = null,
    employeeContact = null,
    employeeEmail = null,
    employeeDesignation = null,
    password = null,
    employeeId = null,
    roleId = null,
    companyId = null,
    imageSrc = "./images/1.jpg",
    imageFile = null
  ) {
    this.employeeName = employeeName;
    this.employeeContact = employeeContact;
    this.employeeEmail = employeeEmail;
    this.employeeDesignation = employeeDesignation;
    this.password = password;
    this.employeeId = employeeId;
    this.roleId = roleId;
    this.companyId = companyId;
    this.imageSrc = imageSrc;
    this.imageFile = imageFile;
  }
}
