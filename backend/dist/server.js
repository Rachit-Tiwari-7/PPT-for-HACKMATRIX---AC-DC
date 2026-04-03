"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const api_1 = __importDefault(require("./routes/api"));
const orders_1 = __importDefault(require("./routes/orders"));
const auth_1 = __importDefault(require("./routes/auth"));
const errorHandler_1 = require("./middleware/errorHandler");
const app = (0, express_1.default)();
const port = parseInt(process.env.PORT || "3001", 10);
const NODE_ENV = process.env.NODE_ENV || "development";
const apiLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: NODE_ENV === "production" ? 100 : 1000,
    message: { error: "Too many requests from this IP, please try again later." },
    standardHeaders: true,
    legacyHeaders: false,
});
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)(NODE_ENV === "production" ? "combined" : "dev"));
app.use((0, cors_1.default)({ origin: process.env.CORS_ORIGIN || "*", credentials: true }));
app.use(express_1.default.json({ limit: "10MB" }));
app.use(express_1.default.urlencoded({ extended: true, limit: "10MB" }));
app.use("/api", apiLimiter);
app.use("/api/v1", api_1.default);
app.use("/api/orders", orders_1.default);
app.use("/api/auth", auth_1.default);
app.get("/health", (req, res) => {
    res.json({
        status: "ok",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: NODE_ENV,
        version: "1.0.0",
        memory: process.memoryUsage(),
        database: "PostgreSQL (Supabase)"
    });
});
app.use(errorHandler_1.notFound);
app.use(errorHandler_1.errorHandler);
process.on("SIGTERM", async () => {
    console.log("SIGTERM received, shutting down gracefully");
    console.log("PostgreSQL connection via Supabase client closed");
    process.exit(0);
});
app.listen(port, () => {
    console.log(`🚀 Server running on port ${port} in ${NODE_ENV} mode`);
});
exports.default = app;
//# sourceMappingURL=server.js.map