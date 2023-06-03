"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const integrationSchema = new mongoose_1.Schema({
    _id: {
        type: mongoose_1.Schema.Types.ObjectId,
        auto: false,
    },
    name: {
        type: String,
        required: [true, "Integration name is required"],
    },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
});
const Integration = (0, mongoose_1.model)("Integration", integrationSchema);
exports.default = Integration;
