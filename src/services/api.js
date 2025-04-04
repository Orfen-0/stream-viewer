const API_BASE_URL = process.env.REACT_APP_API_URL;

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


export const finishEvent = async (eventId) => {
    const response = await fetch(`${API_BASE_URL}/finish-event?id=${eventId}`, {
        method: 'POST'
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`Failed to finish event: ${error}`);
    }

    return response.json();
};

