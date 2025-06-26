"use client";
import { useAuth } from "@/context/AuthContext";
import Teacher from "./Teacher";
import Student from "./Student";
import Admin from "./Admin";

const Dashboard = ()=>{
    const {role} = useAuth();
    return (
        <>
        {role === "teacher" && <Teacher />}
        {role === "student" && <Student />}
        {role === "admin" && <Admin />}
        </>
    );
}

export default Dashboard;