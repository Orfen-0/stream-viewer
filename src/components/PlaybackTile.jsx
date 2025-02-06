import React from 'react';
import VideoPlayer from './VideoPlayer';

const PlaybackTile = ({ stream, onRemove }) => {
    return (
        <div className="playback-tile">
            <button className="close-button" onClick={() => onRemove(stream.key)}>X</button>
            <VideoPlayer streamUrl={stream.playbackUrl} />
            <div className="playback-info">
                <h4>{stream.title}</h4>
            </div>
        </div>
    );
};

export default PlaybackTile;
