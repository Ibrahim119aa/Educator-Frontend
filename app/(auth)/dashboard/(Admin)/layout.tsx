"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Layout = ({ children } : { children: React.ReactElement}) => {

    const {role, availableRoles} = useAuth();
    const router = useRouter();
    useEffect(() => {
        if(!availableRoles.includes(role)){
            router.replace('/login');
        }
    }, [role, availableRoles, router]);

    if(role === "admin"){
        return (
            children
        );
    }
    else{
        // redirect to dashboard page
        router.replace('/dashboard');
    }
};

export default Layout;