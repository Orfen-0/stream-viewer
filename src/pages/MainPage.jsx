import React, { useState } from 'react';
import Header from '../components/Header';
import EventList from '../components/EventList';
import PlaybackGrid from '../components/PlaybackGrid';
import {StreamPlaybackProvider} from "../contexts/StreamPlaybackContenxt";
import {finishEvent} from "../services/api";

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

    const handleFinishEvent = async (eventId) => {
        try {
            const res = await finishEvent(eventId);
            console.log(`Event ${eventId} marked as finished:`, res.message);
            // You might want to refresh the events list here or remove it from the UI.
        } catch (err) {
            console.error("Failed to mark event as finished:", err.message);
        }
    };

    return (
        <StreamPlaybackProvider>

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
            </StreamPlaybackProvider>

            );
};

export default MainPage;
