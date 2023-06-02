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
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntegrationCreatedListener = void 0;
const base_listener_1 = require("@cloud10lms/shared/build/events/base-listener");
const subjects_1 = require("@cloud10lms/shared/build/events/subjects");
const integrations_db_1 = require("../../services/integrations.db");
class IntegrationCreatedListener extends base_listener_1.Listener {
    constructor() {
        super(...arguments);
        this.subject = subjects_1.Subjects.IntegrationCreated;
        this.queueGroupName = "integration-service";
    }
    onMessage(data, msg) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Event data!", data);
            yield integrations_db_1.integrationService.createIntegration({
                _id: data.id,
                name: data.name,
            });
            msg.ack();
        });
    }
}
exports.IntegrationCreatedListener = IntegrationCreatedListener;
