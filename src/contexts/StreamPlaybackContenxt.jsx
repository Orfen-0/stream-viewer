import React, { createContext, useContext, useState } from 'react';

const StreamPlaybackContext = createContext();

export const StreamPlaybackProvider = ({ children }) => {
    const [selectedStreams, setSelectedStreams] = useState([]);

    const addStream = (stream) => {
        const streamKey = `${stream.deviceId}-${stream.startTime}`;
        setSelectedStreams((prev) => {
            if (prev.find(s => s.key === streamKey)) return prev;
            return [...prev, { ...stream, key: streamKey }];
        });
    };

    const removeStream = (key) => {
        console.log('Removing stream with key:', key);
        setSelectedStreams((prev) => prev.filter((s) => s.key !== key));
    };

    return (
        <StreamPlaybackContext.Provider value={{ selectedStreams, addStream, removeStream }}>
            {children}
        </StreamPlaybackContext.Provider>
    );
};

export const useStreamPlayback = () => useContext(StreamPlaybackContext);
