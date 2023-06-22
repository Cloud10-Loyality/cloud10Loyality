import Booking from "../models/booking.model";
import { BookingType } from "../../types";
import { Types } from "mongoose";

class BookingService {
    private model = Booking;

    public async getAllBookings(
        queryObj?: Record<string, any>,
        options?: {
            limit?: string;
            sort?: string;
            fields?: string;
        }
    ): Promise<BookingType[]> {
        const { limit, fields, sort } = options ?? {};

        let queryStr;

        const excludedFields = ["sort", "limit", "fields"];

        queryStr = excludedFields.forEach((el) => delete queryObj![el]);

        let query = this.model.find((queryStr as any) ?? queryObj);

        if (sort) {
            const sortBy = sort.split(",").join(" ");
            query = query.sort(sortBy);
        }
        if (limit) query = query.limit(parseInt(limit));
        if (fields) query = query.select(fields);

        const bookings = await query;

        return bookings;
    }

    public async getBookingId(id: Types.ObjectId): Promise<BookingType | null> {
        const booking = await this.model.findById(id);

        return booking;
    }

    public async getBookingByEmail(email: string): Promise<BookingType[] | null>{
        const bookings = this.model.find().byUserEmail(email);

        return bookings;
    }

    public async createBooking(body: BookingType): Promise<BookingType> {
        const booking = await this.model.create({ ...body });

        return booking;
    }

    public async updateBooking(
        email: string,
        body: BookingType
    ): Promise<BookingType | null> {
        const booking = await this.model.findOneAndUpdate({ userEmail: email }, { ...body })
        
        return booking;
    }

    public async deleteBooking(id: Types.ObjectId): Promise<BookingType | null> {
        const booking = await this.model.findByIdAndDelete(id);

        return booking;
    }

}

export const bookingService = new BookingService()