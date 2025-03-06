import React from 'react';
import { format } from 'date-fns';
import { useStreamPlayback } from '../contexts/StreamPlaybackContenxt';

const StreamItem = ({ stream }) => {
    const { addStream } = useStreamPlayback();
    const formattedDate = format(new Date(stream.startTime * 1000), 'dd/MM/yyyy HH:mm');

    return (
        <div className="stream-item">
            <div className="stream-header">
                <span className="stream-device">Device Id:{stream.deviceId} <br />Stream Id:{stream.id}</span>
                <span className="stream-date">{formattedDate}</span>
                {stream.status === 'live' && <span className="live-indicator">LIVE</span>}
            </div>
            <button
                className="watch-stream-button"
                onClick={() => {
                    console.log("Adding stream:", stream);
                    addStream(stream);
                }}
            >
                Watch Stream
            </button>
        </div>
    );
};


export default StreamItem;
