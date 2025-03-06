import React, { createContext, useContext, useState } from 'react';

const StreamPlaybackContext = createContext();

export const StreamPlaybackProvider = ({ children }) => {
    const [selectedStreams, setSelectedStreams] = useState([]);

    const addStream = (stream) => {
        const streamKey = `${stream.deviceId}-${stream.id}`;

        setSelectedStreams((prev) => {
            if (prev.some(s => s.key === streamKey)) {
                console.log(`Stream ${streamKey} is already playing. Skipping.`);
                return prev; // ✅ Prevent duplicate
            }

            const newStreams = [...prev, { ...stream, key: streamKey }];
            console.log("Updated stream list:", newStreams);
            return newStreams;
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
