import React from 'react';
import PlaybackTile from './PlaybackTile';

const PlaybackGrid = ({ streams, onRemove }) => {
    return (
        <div className="playback-grid">
            {streams.map((stream, index) => (
                <PlaybackTile   key={`${stream.deviceId}-${stream.startTime}`} stream={stream} onRemove={onRemove} />
            ))}
        </div>
    );
};

export default PlaybackGrid;
