"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://rangmanch.netlify.app',
    'https://rangmanch.vercel.app'
];
if (process.env.FRONTEND_URL) {
    allowedOrigins.push(process.env.FRONTEND_URL);
}
const corsOptions = {
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'Authorization',
        'Cache-Control',
        'Pragma'
    ],
    credentials: true,
    optionsSuccessStatus: 200
};
exports.default = (0, cors_1.default)(corsOptions);
//# sourceMappingURL=cors.js.map