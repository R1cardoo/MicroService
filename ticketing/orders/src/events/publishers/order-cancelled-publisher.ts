import { Publisher, OrderCancelledEvent, Subjects } from "@tickets_io/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
