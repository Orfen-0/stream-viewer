import React from 'react';
import { useStreamPlayback } from '../contexts/StreamPlaybackContenxt';
import PlaybackTile from './PlaybackTile';

const PlaybackGrid = () => {
    const { selectedStreams, removeStream } = useStreamPlayback();

    console.log("Currently playing streams:", selectedStreams); // ✅ Debugging

    return (
        <div className="playback-grid">
            {selectedStreams.length === 0 && <p>No active streams</p>}
            {selectedStreams.map((stream) => (
                <PlaybackTile key={stream.key} stream={stream} onRemove={removeStream} />
            ))}
        </div>
    );
};


export default PlaybackGrid;
