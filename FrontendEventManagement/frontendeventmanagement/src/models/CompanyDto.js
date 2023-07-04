export default class CompanyDto {
  constructor(
    companyName = null,
    companyEmail = null,
    companyContact1 = null,
    companyContact2 = null,
    companyLocation = null
  ) {
    this.companyName = companyName;
    this.companyEmail = companyEmail;
    this.companyContact1 = companyContact1;
    this.companyContact2 = companyContact2;
    this.companyLocation = companyLocation;
  }
}
