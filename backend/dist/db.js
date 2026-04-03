"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const supabase_js_1 = require("@supabase/supabase-js");
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
if (!supabaseUrl || !supabaseKey) {
    console.error("❌ Missing Supabase credentials. Please set SUPABASE_URL and SUPABASE_ANON_KEY in your environment variables.");
    process.exit(1);
}
console.log("📋 Connecting to Supabase...");
const supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseKey);
const checkConnection = async () => {
    try {
        await supabase.from('products').select('count', { count: 'exact', head: true });
        console.log("✅ PostgreSQL (Supabase) connected successfully via Supabase client");
    }
    catch (error) {
        console.error("❌ Supabase connection error:", error.message);
    }
};
checkConnection();
exports.default = supabase;
//# sourceMappingURL=db.js.map