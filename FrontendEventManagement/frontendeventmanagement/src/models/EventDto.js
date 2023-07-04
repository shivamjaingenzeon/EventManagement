export default class EventDto {
  constructor(
    eventName = null,
    eventStartDate = null,
    eventEndDate = null,
    eventStartTime = null,
    eventEndTime = null,
    eventVenue = null,
    eventDescription = null,
    eventAuthorizationStatus = true,
    employeeId = null
  ) {
    this.eventName = eventName;
    this.eventStartDate = eventStartDate;
    this.eventEndDate = eventEndDate;
    this.eventStartTime = eventStartTime;
    this.eventEndTime = eventEndTime;
    this.eventVenue = eventVenue;
    this.eventDescription = eventDescription;
    this.eventAuthorizationStatus = eventAuthorizationStatus;
    this.employeeId = employeeId;
  }
}
