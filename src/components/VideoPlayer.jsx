import React, { useEffect, useRef } from 'react';
import mpegts from 'mpegts.js';

const VideoPlayer = ({ streamUrl, isLive = true }) => {
    const videoRef = useRef(null);
    const playerRef = useRef(null);

    useEffect(() => {
        console.log("Initializing player with URL:", streamUrl);
        console.log("MSE Feature List:", mpegts.getFeatureList());
        console.log("mpegts isSupported:", mpegts.isSupported());
        console.log("videoRef.current:", videoRef.current);
        // Destroy any existing player instance.
        if (playerRef.current) {
            playerRef.current.destroy();
            playerRef.current = null;
        }

        if (mpegts.getFeatureList().msePlayback && mpegts.isSupported() && videoRef.current) {
            const player = mpegts.createPlayer({
                type: 'mpegts',
                url: streamUrl,
                isLive: isLive,
            });

            // Attach event listeners for debugging.
            player.on(mpegts.Events.ERROR, (err) => {
                console.error("mpegts error:", err);
            });
            player.on(mpegts.Events.MEDIA_INFO, (info) => {
                console.log("mpegts media info:", info);
            });

            player.attachMediaElement(videoRef.current);
            player.load();
            player.play()
                .then(() => {
                    console.log("Player started playing.");
                })
                .catch(err => {
                    console.error("Error playing stream:", err);
                });
            playerRef.current = player;
        }

        console.log('something not supported')

        return () => {
            if (playerRef.current) {
                playerRef.current.destroy();
                playerRef.current = null;
            }
        };
    }, [streamUrl, isLive]);

    return (
        <video
            key={streamUrl}
            ref={videoRef}
            controls
            autoPlay
            muted
            style={{
                width: '100%',
                height: '100%',
                backgroundColor: 'black' // helps visualize the element
            }}
        />
    );
};

export default VideoPlayer;
