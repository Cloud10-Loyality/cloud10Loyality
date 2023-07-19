import { z } from "zod";

export const createReservationSchema = z.object({
  body: z.object({
    hotelName: z
      .string({
        required_error: "Hotel name is required",
      })
      .min(3, "Hotel name must be at least 3 characters long")
      .max(55, "Hotel name must be at most 55 characters long"),
    managerId: z.string({
      required_error: "Manager id is required",
    }),
    amount: z
      .number({
        required_error: "Amount is required",
      })
      .min(1, "Amount must be at least 1")
      .max(1000000, "Amount must be at most 1000000"),
    checkIn: z.date({
      required_error: "Check-in date is required",
      invalid_type_error: "Check-in date must be a date",
    }),
    checkOut: z.date({
      required_error: "Check-out date is required",
      invalid_type_error: "Check-out date must be a date",
    }),
    city: z.string(),
    paymentCard: z
      .object({
        cardHolderName: z.string(),
        cardNumber: z.string(),
      })
      .optional(),
    paymentMethod: z.string().optional(),
    pin: z.number({
      required_error: "Pin is required",
    }),
    state: z.string({
      required_error: "State is required",
    }),
    user: z.object({
      firstname: z
        .string({
          required_error: "Name is required",
        })
        .min(3, "Name must be at least 3 characters long")
        .max(55, "Name must be at most 55 characters long"),
      lastname: z
        .string({
          required_error: "Name is required",
        })
        .min(3, "Name must be at least 3 characters long")
        .max(55, "Name must be at most 55 characters long"),
      email: z
        .string({
          required_error: "Email is required",
        })
        .email("Invalid email address"),
      gender: z.string({
        required_error: "Gender is required",
      }),
      age: z.number({
        required_error: "Age is required",
      }),
      uid: z.string(),
      dob: z.date({
        required_error: "Date of birth is required",
      }),
      phone: z
        .string({
          required_error: "Phone number is required",
        })
        .min(10, "Phone number must be at least 10 characters long")
        .max(10, "Phone number must be at most 10 characters long"),
      country: z.string(),
      state: z.string(),
      city: z.string(),
      zipCode: z.number(),
    }),
  }),
});
