import Integration, { IntegrationType } from "../models/integration.model";

export class IntegrationService {
  private model = Integration;

  public async createIntegration(data: {
    _id: IntegrationType["_id"];
    name: IntegrationType["name"];
  }): Promise<IntegrationType> {
    const newIntegration = await this.model.create(data);
    return newIntegration;
  }

  public async getIntegrationById(id: string[]): Promise<IntegrationType> {
    const integration = await this.model.findById(id);
    return integration!;
  }
}

export const integrationService = new IntegrationService();
