import React from 'react';
import VideoPlayer from './VideoPlayer';

const PlaybackTile = ({ stream, onRemove }) => {
    return (
        <div className="playback-tile">
            <button className="close-button" onClick={() => onRemove(stream.key)}>✖</button>
            <div className="video-container">
                <VideoPlayer streamUrl={stream.playbackUrl} />
            </div>
            <div className="playback-info">
                <h4 className="device-id">Device ID: <span>{stream.deviceId}</span></h4>
                <h4 className="stream-id">Stream ID: <span>{stream.id}</span></h4>
                <h4 className="start-date">Start Date: <span>{new Date(stream.startTime * 1000).toLocaleString()}</span></h4>
            </div>
        </div>
    );
};

export default PlaybackTile;
