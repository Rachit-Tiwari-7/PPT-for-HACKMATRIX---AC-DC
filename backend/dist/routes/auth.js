"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = __importDefault(require("../db"));
const demoAccounts_1 = require("../config/demoAccounts");
const router = (0, express_1.Router)();
router.post("/signup", async (req, res) => {
    try {
        const { email, password, userData } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, error: "Email and password are required" });
        }
        if (demoAccounts_1.IS_DEMO_MODE) {
            const existingDemo = (0, demoAccounts_1.getDemoAccountByEmail)(email);
            if (existingDemo) {
                return res.status(400).json({
                    success: false,
                    error: "This is a demo account and cannot be modified"
                });
            }
            return res.status(201).json({
                success: true,
                isDemoMode: true,
                user: {
                    email,
                    role: userData?.role || "buyer",
                    displayName: userData?.name || email.split("@")[0],
                    isDemoAccount: false
                },
                message: "Demo mode: Account created (not persisted)"
            });
        }
        const { data, error } = await db_1.default.auth.signUp({
            email,
            password,
            options: {
                data: {
                    role: userData?.role || "buyer",
                    display_name: userData?.name || email.split("@")[0]
                }
            }
        });
        if (error)
            throw error;
        res.status(201).json({
            success: true,
            user: data.user,
            session: data.session
        });
    }
    catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, error: "Email and password are required" });
        }
        if (demoAccounts_1.IS_DEMO_MODE) {
            const demoAccount = (0, demoAccounts_1.getDemoAccountByEmail)(email);
            if (demoAccount && demoAccount.password === password) {
                return res.json({
                    success: true,
                    isDemoMode: true,
                    user: {
                        email: demoAccount.email,
                        role: demoAccount.role,
                        displayName: demoAccount.displayName,
                        isDemoAccount: true
                    },
                    message: "Logged in with demo account"
                });
            }
            return res.status(401).json({
                success: false,
                error: "Invalid demo credentials. Use the demo buttons below."
            });
        }
        const { data, error } = await db_1.default.auth.signInWithPassword({
            email,
            password
        });
        if (error)
            throw error;
        res.json({
            success: true,
            user: data.user,
            session: data.session
        });
    }
    catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});
router.post("/logout", async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (demoAccounts_1.IS_DEMO_MODE) {
            return res.json({ success: true, message: "Demo mode: Logged out" });
        }
        if (authHeader) {
            const token = authHeader.split(" ")[1];
            const { error } = await db_1.default.auth.signOut();
            if (error)
                throw error;
        }
        res.json({ success: true });
    }
    catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});
router.get("/session", async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ success: false, error: "No authorization header" });
        }
        const token = authHeader.split(" ")[1];
        if (demoAccounts_1.IS_DEMO_MODE) {
            return res.json({
                success: true,
                isDemoMode: true,
                user: null,
                message: "Demo mode: No session validation"
            });
        }
        const { data, error } = await db_1.default.auth.getUser(token);
        if (error)
            throw error;
        res.json({
            success: true,
            user: data.user
        });
    }
    catch (error) {
        console.error("Session error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});
router.get("/demo-accounts", (req, res) => {
    res.json({
        success: true,
        demoAccounts: Object.entries(demoAccounts_1.DEMO_ACCOUNTS).map(([role, account]) => ({
            role,
            email: account.email,
            displayName: account.displayName
        }))
    });
});
exports.default = router;
//# sourceMappingURL=auth.js.map