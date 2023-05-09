import Integration from "../models/integration.model";

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
  ): Promise<(typeof Integration)[] | any> {
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
    if (populate) query = query.populate(populate);

    const integration = await query.sort(sort);

    return integration;
  }

  public async getIntegrationById(
    id?: string
  ): Promise<typeof Integration | any> {
    const integration = await this.model.findById(id);
    return integration;
  }

  public async createIntegration(
    data: Record<string, any>
  ): Promise<typeof Integration | any> {
    const newIntegration = await this.model.create(data);
    return newIntegration;
  }

  public async updateIntegration(
    id: string,
    data: Record<string, any>
  ): Promise<typeof Integration | any> {
    const updatedIntegration = await this.model.findByIdAndUpdate(id, data);
    return updatedIntegration;
  }

  public async deleteIntegration(
    id: string
  ): Promise<typeof Integration | any> {
    const deletedIntegration = await this.model.findByIdAndDelete(id);
    return deletedIntegration;
  }
}

export const integrationService = new IntegrationService();
