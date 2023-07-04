import { PointsCreatedEvent, Publisher, Subjects } from "@c10lms/common";

export class PointsCreatedPublisher extends Publisher<PointsCreatedEvent> {
  subject: Subjects.PointsCreated = Subjects.PointsCreated;
}
