import { HydratedDocument } from "mongoose";
import Integration from "../models/integration.model";
import { ManagerType } from "../../types";

// import IntegrationType from "../models/integration.model";

class IntegrationService {
  private model = Integration;

  public async getAllIntegrations(
    queryObj?: Record<string, any>,
    options?: {
      limit?: number | any;
      sort?: string | any;
      fields?: string[] | any;
      populate?: string[] | any;
    }
  ): Promise<ManagerType[]> {
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

    const integration = await query.sort(sort);

    return integration;
  }

  public async getIntegrationById(id?: string): Promise<ManagerType> {
    const integration = await this.model.findById(id);
    return integration!;
  }

  public async getIntegrationByEmail(email?: string): Promise<ManagerType> {
    const integration = await this.model.findOne({ email }).select("+password");
    return integration!;
  }
  public async createIntegration(
    data: Record<string, any>
  ): Promise<ManagerType> {
    const newIntegration: HydratedDocument<ManagerType> =
      await this.model.create(data);
    return newIntegration;
  }

  public async updateIntegration(
    id: string,
    data: Record<string, any>
  ): Promise<ManagerType> {
    const updatedIntegration = await this.model.findByIdAndUpdate(id, data);
    return updatedIntegration!;
  }

  public async deleteIntegration(id: string): Promise<ManagerType> {
    const deletedIntegration = await this.model.findByIdAndDelete(id);
    return deletedIntegration!;
  }
}

export const integrationService = new IntegrationService();
