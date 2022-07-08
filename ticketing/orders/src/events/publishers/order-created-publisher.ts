import { Publisher, OrderCreatedEvent, Subjects } from "@tickets_io/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
