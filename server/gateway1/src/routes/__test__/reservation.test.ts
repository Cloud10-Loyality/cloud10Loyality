import request, { Request } from "supertest";

import app from "../..";

it("Returns all the reservations", async () => {
  return request(app).get("/api/v1/reservation").expect(200);
});

it("Returns a 201 on successfull reservation", async () => {
  return request(app)
    .post("/api/v1/reservation")
    .send({
      hotelName: "The Ritz-Carlton, San Francisco",
      checkIn: "2023-06-05",
      checkOut: "2023-06-10",
      city: "Anytown",
      state: "CA",
      pin: "12345",
      amount: 1000.0,
      user: {
        firstname: "John",
        lastname: "Doe",
        email: "john.doe@example.com",
        gender: "male",
        dob: "10-09-2000",
        phone: 8917558378,
      },
    })
    .expect(201);
});

it("Returns input can't be empty", async () => {
  return request(app)
    .post("/api/v1/reservation")
    .send({
      hotelName: "The Ritz-Carlton, San Francisco",
      checkIn: "2023-06-05",
      checkOut: "2023-06-10",
      city: "Anytown",
      state: "CA",
      pin: "12345",
      amount: 1000.0,
    })
    .expect(201);
});
