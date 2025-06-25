/* eslint-disable @typescript-eslint/no-explicit-any */
export const fetchApi = async <T>(endpoint: string, method: string, data?: any): Promise<T | { error?: string; status?: number }> => {
    try {
        const headers: HeadersInit = {
            'Content-Type': 'application/json',

        };

        const requestOptions: RequestInit = {
            method,
            credentials: 'include',
            headers,
        };
        console.log("This is data object ");
        console.log(data);


        if (data) {
           
            if (data instanceof FormData) {
                delete headers['Content-Type'];
                // headers['Content-Type']='multipart/form-data';
                requestOptions.body = data;
                console.log(`Memon`);

            } else {
                requestOptions.body = JSON.stringify(data);
            }
        }

        console.log("This is database");



        console.log(requestOptions);


        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}${endpoint}`, requestOptions);

        console.log("THis is response");
        console.log(response);



        let responseData: T | { error?: string };
        try {


            responseData = await response.json();
        } catch (e:any) {
            responseData = { error: ` Failed to parse response ${e}` };
        }


        if (!response.ok) {
            const errorMessage = (responseData as { error?: string }).error || `Request failed with status ${response.status}`;
            return {
                error: errorMessage,
                status: response.status,
            };
        }

        return responseData as T;

    } catch (e: any) {
        console.error(e);

        if (e.name === 'TypeError' && e.message.includes('NetworkError')) {
            return {
                error: 'Network error occurred. Please check your connection.',
            };
        }

        return {
            error: e.message || 'An unknown error occurred.',
        };
    }
};
