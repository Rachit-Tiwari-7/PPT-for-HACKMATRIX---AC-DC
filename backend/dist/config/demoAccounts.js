"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDemoAccountByEmail = exports.isDemoEmail = exports.getDemoAccount = exports.IS_DEMO_MODE = exports.DEMO_ACCOUNTS = void 0;
exports.DEMO_ACCOUNTS = {
    buyer: {
        email: 'demo.buyer@rangmanch.in',
        password: 'demo123456',
        role: 'buyer',
        displayName: 'Demo Buyer'
    },
    artisan: {
        email: 'demo.artisan@rangmanch.in',
        password: 'demo123456',
        role: 'artisan',
        displayName: 'Demo Artisan'
    },
    ngo: {
        email: 'demo.ngo@rangmanch.in',
        password: 'demo123456',
        role: 'ngo',
        displayName: 'Demo NGO'
    }
};
exports.IS_DEMO_MODE = process.env.SUPABASE_URL === undefined ||
    process.env.SUPABASE_URL === 'https://xkucnoazudwushcdiubi.supabase.co' ||
    !process.env.SUPABASE_SERVICE_ROLE_KEY;
const getDemoAccount = (role) => {
    return exports.DEMO_ACCOUNTS[role];
};
exports.getDemoAccount = getDemoAccount;
const isDemoEmail = (email) => {
    return Object.values(exports.DEMO_ACCOUNTS).some(account => account.email === email);
};
exports.isDemoEmail = isDemoEmail;
const getDemoAccountByEmail = (email) => {
    const account = Object.values(exports.DEMO_ACCOUNTS).find(acc => acc.email === email);
    return account || null;
};
exports.getDemoAccountByEmail = getDemoAccountByEmail;
//# sourceMappingURL=demoAccounts.js.map