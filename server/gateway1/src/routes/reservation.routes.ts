import {
  createReservation,
  deleteReservation,
  getReservations,
  updateReservation,
} from "../controllers/reservation.controller";

import { Router } from "express";

const router = Router();

/**
 * @openapi
 *   /:
 *     get:
 *       tags:
 *        - Reservation
 *       summary: Get all reservations
 *       description: It allows to retrieve all the reservations.
 *       responses:
 *         200:
 *           description: Returns a mysterious string.
 *       parameters:
 *         - in: query
 *           name: fields
 *           description: fields to show or retrieve in the response
 *           schema:
 *            type: string
 *            format: int32
 *         - in: query
 *           name: limit
 *           description: max number of records to return
 *           schema:
 *            type: integer
 *            format: int32
 *     post:
 *       tags:
 *         - Reservation
 *       summary: Create a new reservation
 *       description: It creates a new reservation.
 *       responses:
 *         201:
 *           description: Returns a mysterious string.
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 hotelName:
 *                   type: string
 *                   description: The hotel name.
 *                   example: Swain Heritage
 *                   required: true
 *                 checkIn:
 *                   type: string
 *                   format: date
 *                   description: Check-in date.
 *                   example: "06-25-2023"
 *                   required: true
 *                 checkOut:
 *                   type: string
 *                   format: date
 *                   description: Check-out date.
 *                   example: "06-30-2023"
 *                   required: true
 *                 managerId:
 *                   type: string
 *                   description: Id of the channel manager or hotel.
 *                   example: "64917df523f0bfb66c484387"
 *                   required: true
 *                 city:
 *                   type: string
 *                   description: The city of the hotel.
 *                   example: Anytown
 *                 state:
 *                   type: string
 *                   description: The state of the hotel.
 *                   example: CA
 *                 pin:
 *                   type: string
 *                   description: Pin of the hotel location.
 *                   example: "12345"
 *                 amount:
 *                   type: number
 *                   format: float
 *                   description: The net amount of the reservation.
 *                   example: 5000.00
 *                   required: true
 *                 user:
 *                   type: object
 *                   description: User data of the reservation.
 *                   properties:
 *                     firstname:
 *                       type: string
 *                       description: Firstname of the user.
 *                       example: Shyam
 *                       required: true
 *                     lastname:
 *                       type: string
 *                       description: Lastname of the user.
 *                       example: Sundar
 *                       required: true
 *                     email:
 *                       type: string
 *                       description: Email of the user.
 *                       example: shyamsundar@gmail.com
 *                       required: true
 *                     gender:
 *                       type: string
 *                       description: Gender of the user.
 *                       enum: ["male", "female", "other"]
 *                       example: male
 *                     age:
 *                       type: integer
 *                       description: Age of the user.
 *                       example: 23
 *                     uid:
 *                       type: string
 *                       description: User ID.
 *                       example: "589658962232"
 *                     dob:
 *                       type: string
 *                       format: date
 *                       description: Date of birth of the user.
 *                       example: "10-09-2000"
 *                     phone:
 *                       type: integer
 *                       description: Phone number of the user.
 *                       example: 8917552365
 *                     country:
 *                       type: string
 *                       description: Country of the user.
 *                       example: India
 *                     state:
 *                       type: string
 *                       description: State of the user.
 *                       example: Odisha
 *                     city:
 *                       type: string
 *                       description: City of the user.
 *                       example: Bhubaneswar
 *                     zipCode:
 *                       type: integer
 *                       description: Zip code of the user.
 *                       example: 751003
 */

router
  .route("/")
  .get(getReservations as any)
  .post(createReservation as any);

/**
 * @openapi
 *   /{reservationId}:
 *     patch:
 *       tags:
 *         - Reservation
 *       summary: Update a reservation
 *       description: It updates a reservation.
 *       parameters:
 *         - in: path
 *           name: reservationId
 *           description: Id of the reservation.
 *           schema:
 *             type: string
 *             format: uuid
 *           required: true
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 hotelName:
 *                   type: string
 *                   description: The hotel name.
 *                   example: Swain Heritage
 *                   required: true
 *                 checkIn:
 *                   type: string
 *                   format: date
 *                   description: Check-in date.
 *                   example: "06-25-2023"
 *                   required: true
 *                 checkOut:
 *                   type: string
 *                   format: date
 *                   description: Check-out date.
 *                   example: "06-30-2023"
 *                   required: true
 *                 managerId:
 *                   type: string
 *                   description: Id of the channel manager or hotel.
 *                   example: "64917df523f0bfb66c484387"
 *                   required: true
 *                 city:
 *                   type: string
 *                   description: The city of the hotel.
 *                   example: Anytown
 *                 state:
 *                   type: string
 *                   description: The state of the hotel.
 *                   example: CA
 *                 pin:
 *                   type: string
 *                   description: Pin of the hotel location.
 *                   example: "12345"
 *                 amount:
 *                   type: number
 *                   format: float
 *                   description: The net amount of the reservation.
 *                   example: 5000.00
 *                   required: true
 *                 user:
 *                   type: object
 *                   description: User data of the reservation.
 *                   properties:
 *                     firstname:
 *                       type: string
 *                       description: Firstname of the user.
 *                       example: Shyam
 *                       required: true
 *                     lastname:
 *                       type: string
 *                       description: Lastname of the user.
 *                       example: Sundar
 *                       required: true
 *                     email:
 *                       type: string
 *                       description: Email of the user.
 *                       example: shyamsundar@gmail.com
 *                       required: true
 *                     gender:
 *                       type: string
 *                       description: Gender of the user.
 *                       enum: ["male", "female", "other"]
 *                       example: male
 *                     age:
 *                       type: integer
 *                       description: Age of the user.
 *                       example: 23
 *                     uid:
 *                       type: string
 *                       description: User ID.
 *                       example: "589658962232"
 *                     dob:
 *                       type: string
 *                       format: date
 *                       description: Date of birth of the user.
 *                       example: "10-09-2000"
 *                     phone:
 *                       type: integer
 *                       description: Phone number of the user.
 *                       example: 8917552365
 *                     country:
 *                       type: string
 *                       description: Country of the user.
 *                       example: India
 *                     state:
 *                       type: string
 *                       description: State of the user.
 *                       example: Odisha
 *                     city:
 *                       type: string
 *                       description: City of the user.
 *                       example: Bhubaneswar
 *                     zipCode:
 *                       type: integer
 *                       description: Zip code of the user.
 *                       example: 751003
 *     delete:
 *       tags:
 *         - Reservation
 *       summary: Update a reservation
 *       description: It updates a reservation.
 *       parameters:
 *         - in: path
 *           name: reservationId
 *           description: Id of the reservation.
 *           schema:
 *             type: string
 *             format: uuid
 *           required: true
 *       responses:
 *         200:
 *         description: Reservation deleted successfully.
 */

router
  .route("/:id")
  .patch(updateReservation as any)
  .delete(deleteReservation as any);

export default router;
