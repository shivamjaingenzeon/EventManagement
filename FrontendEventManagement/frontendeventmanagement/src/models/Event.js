export default class Event {
  constructor(
    eventId = null,
    eventName = null,
    description = null,
    startDate = null,
    endDate = null,
    eventStartTime = null,
    eventEndTime = null,
    eventVenue = null
  ) {
    this.eventId = eventId;
    this.eventName = eventName;
    this.description = description;
    this.startDate = startDate;
    this.endDate = endDate;
    this.eventStartTime = eventStartTime;
    this.eventEndTime = eventEndTime;
    this.eventVenue = eventVenue;
  }
}
