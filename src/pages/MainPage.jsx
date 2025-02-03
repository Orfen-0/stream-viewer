// src/pages/MainPage.jsx (only the change)
import React, { useState } from 'react';
import Header from '../components/Header';
import EventList from '../components/EventList';
import PlaybackGrid from '../components/PlaybackGrid';

const MainPage = () => {
    const [selectedStreams, setSelectedStreams] = useState([]);

    const handleStreamSelect = (stream) => {
        setSelectedStreams((prev) => {
            if (prev.find(s => s.id === stream.id)) return prev;
            return [...prev, stream];
        });
    };

    const handleRemoveStream = (streamId) => {
        setSelectedStreams((prev) => prev.filter(s => s.id !== streamId));
    };

    const handleFinishEvent = (eventId) => {
        console.log(`Event ${eventId} marked as finished`);
        // Here you would call your API to mark the event finished and update the UI accordingly.
    };

    return (
        <div className="main-page">
            <Header />
            <div className="content">
                <div className="sidebar">
                    <EventList onStreamSelect={handleStreamSelect} onFinishEvent={handleFinishEvent} />
                </div>
                <div className="playback-area">
                    <   PlaybackGrid streams={selectedStreams} onRemove={handleRemoveStream} />
                </div>
            </div>
        </div>
    );
};

export default MainPage;
