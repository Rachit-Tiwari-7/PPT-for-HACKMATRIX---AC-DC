"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = __importDefault(require("../db"));
const router = (0, express_1.Router)();
router.get("/health", async (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString(), service: "RangManch API" });
});
const initTables = async () => {
    try {
        await db_1.default.rpc('exec', {
            query: `
        CREATE TABLE IF NOT EXISTS products (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          description TEXT,
          price DECIMAL(10, 2) NOT NULL,
          category VARCHAR(100),
          craft VARCHAR(100),
          artisan_id VARCHAR(100),
          images TEXT[],
          in_stock BOOLEAN DEFAULT true,
          rating DECIMAL(3, 2),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `
        });
        console.log("Database tables initialized");
    }
    catch (error) {
        console.log("Tables may already exist:", error);
    }
};
initTables();
router.get("/products", async (req, res) => {
    try {
        const { page = 1, limit = 20, category, craft, search } = req.query;
        const offset = (Number(page) - 1) * Number(limit);
        let query = db_1.default.from('products').select('*', { count: 'exact' });
        if (category)
            query = query.eq('category', category);
        if (craft)
            query = query.eq('craft', craft);
        if (search)
            query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`);
        query = query.range(offset, offset + Number(limit) - 1);
        const { data, error } = await query;
        if (error)
            throw error;
        res.json({ success: true, data: data || [], pagination: { page: Number(page), limit: Number(limit), total: data?.length || 0 } });
    }
    catch (error) {
        console.error('Get products error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});
router.post("/products", async (req, res) => {
    try {
        const { name, description, price, category, craft, artisan_id, images, in_stock } = req.body;
        const { data, error } = await db_1.default.from('products').insert([
            { name, description, price, category, craft, artisan_id, images: images || [], in_stock: in_stock ?? true }
        ]).select();
        if (error)
            throw error;
        res.status(201).json({ success: true, data: data[0] });
    }
    catch (error) {
        console.error('Create product error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});
router.get("/products/artisan/:artisanId", async (req, res) => {
    try {
        const { artisanId } = req.params;
        const { data, error } = await db_1.default.from('products').select('*').eq('artisan_id', artisanId);
        if (error)
            throw error;
        res.json({ success: true, data: data || [] });
    }
    catch (error) {
        console.error('Get products by artisan error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});
router.delete("/products/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { error } = await db_1.default.from('products').delete().eq('id', id);
        if (error)
            throw error;
        res.json({ success: true, message: 'Product deleted' });
    }
    catch (error) {
        console.error('Delete product error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});
router.get("/states", async (req, res) => {
    try {
        const { data, error } = await db_1.default.from('states').select('*').order('name');
        if (error)
            throw error;
        res.json({ success: true, data: data || [] });
    }
    catch (error) {
        console.error('Get states error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});
router.post("/states", async (req, res) => {
    try {
        const { name, crafts, description } = req.body;
        const { data, error } = await db_1.default.from('states').upsert({ name, crafts: crafts || [], description }, { onConflict: 'name' }).select();
        if (error)
            throw error;
        res.status(201).json({ success: true, data: data[0] });
    }
    catch (error) {
        console.error('Create state error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});
router.get("/states/:stateName", async (req, res) => {
    try {
        const { stateName } = req.params;
        const { data, error } = await db_1.default.from('states').select('*').ilike('name', stateName);
        if (error)
            throw error;
        if (!data || data.length === 0)
            return res.status(404).json({ success: false, error: 'State not found' });
        res.json({ success: true, data: data[0] });
    }
    catch (error) {
        console.error('Get state error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});
router.get("/artisans", async (req, res) => {
    try {
        const { data, error } = await db_1.default.from('artisans').select('*').order('created_at', { ascending: false });
        if (error)
            throw error;
        res.json({ success: true, data: data || [], count: data?.length || 0 });
    }
    catch (error) {
        console.error('Get artisans error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});
router.get("/artisans/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await db_1.default.from('artisans').select('*').eq('id', id);
        if (error)
            throw error;
        if (!data || data.length === 0)
            return res.status(404).json({ success: false, error: 'Artisan not found' });
        res.json({ success: true, data: data[0] });
    }
    catch (error) {
        console.error('Get artisan error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});
router.post("/artisans", async (req, res) => {
    try {
        const { name, email, craft, location, experience, story, image } = req.body;
        const { data, error } = await db_1.default.from('artisans').insert([
            { name, email, craft, location, experience, story, image }
        ]).select();
        if (error)
            throw error;
        res.status(201).json({ success: true, data: data[0] });
    }
    catch (error) {
        console.error('Create artisan error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});
exports.default = router;
//# sourceMappingURL=api.js.map