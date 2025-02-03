// src/components/StreamItem.jsx
import React from 'react';
import { format } from 'date-fns';

const StreamItem = ({ stream, onWatch }) => {
    // Format the stream's startTime (assumed to be Unix timestamp in seconds) to dd/MM/yyyy HH:mm.
    const formattedDate = format(new Date(stream.startTime * 1000), 'dd/MM/yyyy HH:mm');

    return (
        <div className="stream-item">
            <div className="stream-header">
                <span className="stream-device">{stream.deviceId}</span>
                <span className="stream-date">{formattedDate}</span>
                {stream.status === 'live' && (
                    <span className="live-indicator">LIVE</span>
                )}
            </div>
            <button
                className="watch-stream-button"
                onClick={() => onWatch(stream.playbackUrl)}
            >
                Watch Stream
            </button>
        </div>
    );
};

export default StreamItem;
