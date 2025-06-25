/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchApi } from "./API";

export const registerParent = async (data:any) => {
    return await fetchApi(`/parent`, 'POST', data);
}