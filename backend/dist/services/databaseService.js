"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
class DatabaseService {
    constructor() {
        this.client = null;
        this.db = null;
        this.mongoUri = process.env.MONGODB_URL || 'mongodb://localhost:27017/rangmanch';
    }
    static getInstance() {
        if (!DatabaseService.instance) {
            DatabaseService.instance = new DatabaseService();
        }
        return DatabaseService.instance;
    }
    async connect() {
        if (this.db) {
            return this.db;
        }
        try {
            if (!this.client) {
                this.client = new mongodb_1.MongoClient(this.mongoUri);
            }
            await this.client.connect();
            this.db = this.client.db();
            console.log('✅ Connected to MongoDB');
            return this.db;
        }
        catch (error) {
            console.error('❌ MongoDB connection error:', error);
            throw error;
        }
    }
    async disconnect() {
        if (this.client) {
            await this.client.close();
            this.client = null;
            this.db = null;
            console.log('✅ Disconnected from MongoDB');
        }
    }
    getDatabase() {
        return this.db;
    }
}
exports.default = DatabaseService;
//# sourceMappingURL=databaseService.js.map