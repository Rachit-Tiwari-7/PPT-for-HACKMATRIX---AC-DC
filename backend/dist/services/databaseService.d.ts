import { Db } from 'mongodb';
declare class DatabaseService {
    private static instance;
    private client;
    private db;
    private mongoUri;
    private constructor();
    static getInstance(): DatabaseService;
    connect(): Promise<Db>;
    disconnect(): Promise<void>;
    getDatabase(): Db | null;
}
export default DatabaseService;
//# sourceMappingURL=databaseService.d.ts.map