import { TicketUpdatedEvent, Publisher, Subjects } from "@tickets_io/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
