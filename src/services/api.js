const API_BASE_URL = 'http://192.168.1.77:8080';

const checkResponse = async (response) => {
    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || 'API request failed');
    }
    return response.json();
};

export const getEventsWithStreams = async (fromUnix, toUnix) => {
    const url = new URL(`${API_BASE_URL}/events-streams`);
    if (fromUnix) url.searchParams.append('from', fromUnix);
    if (toUnix) url.searchParams.append('to', toUnix);
    const response = await fetch(url.toString());
    return checkResponse(response);
};
