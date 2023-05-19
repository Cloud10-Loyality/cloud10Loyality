import { HydratedDocument } from "mongoose";
import Reservation, { ReservationType } from "../models/reservation.model";

class ReservationService {
  private model = Reservation;

  public async getAllReservations(
    queryObj?: Record<string, any>,
    options?: {
      limit?: number | any;
      sort?: string | any;
      fields?: string[] | any;
      populate?: string[] | any;
    }
  ): Promise<ReservationType[]> {
    const { limit, fields, sort, populate } = options ?? {};

    let queryStr;
    const excludedFields = ["populate", "sort", "limit", "fields"];

    queryStr = excludedFields.forEach((el) => delete queryObj![el]);

    let query = this.model.find((queryStr as any) ?? queryObj);

    if (sort) {
      const sortBy = sort.split(",").join(" ");
      query = query.sort(sortBy);
    }
    if (limit) query = query.limit(limit);
    if (fields) query = query.select(fields);
    // if (populate) query = query.populate(populate);

    const reservations = await query.sort(sort);

    return reservations;
  }

  public async getReservationById(id?: string): Promise<ReservationType> {
    const reservation = await this.model.findById(id);
    return reservation!;
  }

  public async createReservation(
    data: Record<string, any>
  ): Promise<ReservationType> {
    const newReservation: HydratedDocument<ReservationType> =
      await this.model.create(data);
    return newReservation;
  }

  public async updateReservation(
    id: string,
    data: Record<string, any>
  ): Promise<ReservationType> {
    const updatedReservation = await this.model.findByIdAndUpdate(id, data);
    return updatedReservation!;
  }

  public async deleteReservation(id: string): Promise<ReservationType> {
    const deletedReservation = await this.model.findByIdAndDelete(id);
    return deletedReservation!;
  }
}

export const reservationService = new ReservationService();
