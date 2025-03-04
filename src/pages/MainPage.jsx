import React, { useState } from 'react';
import Header from '../components/Header';
import EventList from '../components/EventList';
import PlaybackGrid from '../components/PlaybackGrid';
import {StreamPlaybackProvider} from "../contexts/StreamPlaybackContenxt";

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
        // TODO add event finish api call
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
