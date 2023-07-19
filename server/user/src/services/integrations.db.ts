import { IntegrationType } from "../../types";
import Integrations from "../models/integrations.model";
import { Types } from "mongoose";

export class IntegrationsService {
  private model = Integrations;

  public async getIntegration(id?: Types.ObjectId): Promise<IntegrationType> {
    const integration = await this.model.findById(id);

    return integration!;
  }

  public async createIntegration(
    body: IntegrationType
  ): Promise<IntegrationType> {
    const integration = await this.model.create(body);

    return integration;
  }
}

export const integrationsService = new IntegrationsService();
