// src/components/StreamList.jsx
import React from 'react';
import StreamItem from './StreamItem';

const StreamList = ({ streams, onStreamSelect, onWatchStream }) => {
    if (!streams || streams.length === 0) {
        return <div className="empty-message">No streams available.</div>;
    }

    return (
        <ul className="stream-list">
            {streams.map(stream => (
                <li key={stream.id}>
                    <StreamItem
                        stream={stream}
                        onWatch={onWatchStream || onStreamSelect}
                    />
                </li>
            ))}
        </ul>
    );
};

export default StreamList;
