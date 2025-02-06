import React from 'react';
import { useStreamPlayback } from '../contexts/StreamPlaybackContenxt';
import PlaybackTile from './PlaybackTile';

const PlaybackGrid = () => {
    const { selectedStreams, removeStream } = useStreamPlayback();

    return (
        <div className="playback-grid">
            {selectedStreams.map((stream) => (
                <PlaybackTile key={stream.key} stream={stream} onRemove={removeStream} />
            ))}
        </div>
    );
};

export default PlaybackGrid;
