/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchApi } from "./API";

interface Parent {
    email: string | "",
    role: string | "",
    password: string | ""
}
export const registerParent = async (data: any) => {
    return await fetchApi(`/parent`, 'POST', data);
}
export const loginParent = async (data: Parent) => {
    return await fetchApi("/parent/login", "POST", data);
}