
/* eslint-disable @typescript-eslint/no-explicit-any */

import { fetchApi } from "./API";

export const loginAdmin = async (data: any) => {
    return await fetchApi('/admin/login', 'POST', data);
}

export const logoutAdmin = async () => {
    return await fetchApi('/admin/logout', 'POST');
}
