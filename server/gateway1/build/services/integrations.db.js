"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.integrationService = exports.IntegrationService = void 0;
const integration_model_1 = __importDefault(require("../models/integration.model"));
class IntegrationService {
    constructor() {
        this.model = integration_model_1.default;
    }
    createIntegration(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newIntegration = yield this.model.create(data);
            return newIntegration;
        });
    }
    getIntegrationById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const integration = yield this.model.findById(id);
            return integration;
        });
    }
}
exports.IntegrationService = IntegrationService;
exports.integrationService = new IntegrationService();
