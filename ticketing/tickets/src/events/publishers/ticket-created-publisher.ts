import { TicketCreatedEvent, Publisher, Subjects } from "@tickets_io/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
