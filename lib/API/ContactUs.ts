/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchApi } from "./API";

export const contactUs = async (data:any) => {
    return await fetchApi(`/contact-us`, 'POST', data);
}