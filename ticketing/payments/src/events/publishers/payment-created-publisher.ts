import { Subjects, Publisher, PaymentCreatedEvent } from "@tickets_io/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
