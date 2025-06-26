"use client";
import Sidebar from "@/components/Dashboard/Admin/Sidebar";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Layout = ({ children }: Readonly<{ children: React.ReactNode; }>) => {
    const { role, availableRoles } = useAuth();
    const router = useRouter();
    useEffect(() => {
        if (!availableRoles.includes(role)) {
            router.replace('/login');
        }
    }, [role, availableRoles, router]);

    if (role === "admin") {
        return (
            <div className="flex">
                <Sidebar />
                <div className="flex-1">{children}</div>
            </div>
        );
    }

    return (
        <>
            {children}
        </>
    )
}

export default Layout;