/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { AuthProvider } from "@/context/AuthContext";

const Layout = ({ children }: Readonly<{ children: React.ReactNode; }>) => {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    )
}

export default Layout;