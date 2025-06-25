import { fetchApi } from "./API";

export const getRole = async () => {
    return await fetchApi('/get-role', 'GET');
}
