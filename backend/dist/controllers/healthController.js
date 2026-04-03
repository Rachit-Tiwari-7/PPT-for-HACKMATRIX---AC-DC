"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthCheck = void 0;
const healthCheck = (req, res) => {
    res.json({
        status: "ok",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || "development",
        version: "1.0.0"
    });
};
exports.healthCheck = healthCheck;
//# sourceMappingURL=healthController.js.map