import { Integration } from "../models/integration.model";
import { Integration as IntegrationInterface } from "../../types";

export class IntegrationService {
  private model = Integration;

  public async createIntegration(
    data: IntegrationInterface
  ): Promise<typeof Integration | any> {
    const newIntegration = await this.model.create(data);
    return newIntegration;
  }

  public async getAllIntegrationsByIds(
    id: string[]
  ): Promise<(typeof Integration)[] | any> {
    const integrations = await this.model.findById(id);
    return integrations;
  }
}

export const integrationService = new IntegrationService();
