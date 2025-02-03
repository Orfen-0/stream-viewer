import React, { useEffect, useRef } from 'react';
import mpegts from 'mpegts.js';

const VideoPlayer = ({ streamUrl, isLive = true }) => {
    const videoRef = useRef(null);
    const playerRef = useRef(null);

    useEffect(() => {
        // Clean up any existing player instance.
        if (playerRef.current) {
            playerRef.current.destroy();
            playerRef.current = null;
        }

        // Only proceed if the browser supports MSE and mpegts.js is supported.
        if (mpegts.getFeatureList().mse && mpegts.isSupported() && videoRef.current) {
            const player = mpegts.createPlayer({
                type: 'mpegts', // stream type
                url: streamUrl,
                isLive: isLive, // set to true if it's a live stream
            });
            player.attachMediaElement(videoRef.current);
            player.load();
            player.play().catch((error) => {
                console.error('Error playing MPEG-TS stream:', error);
            });
            playerRef.current = player;
        }

        return () => {
            if (playerRef.current) {
                playerRef.current.destroy();
                playerRef.current = null;
            }
        };
    }, [streamUrl, isLive]);

    // Force remount when streamUrl changes by keying the video element
    return <video key={streamUrl} ref={videoRef} controls style={{ width: '100%', height: '100%' }} />;
};

export default VideoPlayer;
