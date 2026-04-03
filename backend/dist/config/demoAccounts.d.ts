export declare const DEMO_ACCOUNTS: {
    buyer: {
        email: string;
        password: string;
        role: string;
        displayName: string;
    };
    artisan: {
        email: string;
        password: string;
        role: string;
        displayName: string;
    };
    ngo: {
        email: string;
        password: string;
        role: string;
        displayName: string;
    };
};
export declare const IS_DEMO_MODE: boolean;
export declare const getDemoAccount: (role: "buyer" | "artisan" | "ngo") => {
    email: string;
    password: string;
    role: string;
    displayName: string;
} | {
    email: string;
    password: string;
    role: string;
    displayName: string;
} | {
    email: string;
    password: string;
    role: string;
    displayName: string;
};
export declare const isDemoEmail: (email: string) => boolean;
export declare const getDemoAccountByEmail: (email: string) => {
    email: string;
    password: string;
    role: string;
    displayName: string;
} | null;
//# sourceMappingURL=demoAccounts.d.ts.map