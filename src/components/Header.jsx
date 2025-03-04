import React, { useState } from 'react';
import '../Header.css';

const Header = () => {
    const [showModal, setShowModal] = useState(false);
    const [eventData, setEventData] = useState(`{
  "TriggeredBy": "test",
  "Longitude": -0.1952757,
  "Latitude": 51.5415787
}`);

    const handleDownload = async ()  => {
        const apiUrl = process.env.REACT_APP_API_URL;
        if (!apiUrl) {
            console.error("API URL is not set. Check your .env file.");
            return;
        }

        const downloadUrl = `${apiUrl}/download-apk`;

        try {
            const response = await fetch(downloadUrl);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = "app-release.apk"; // Adjust this filename if needed
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Download failed:", error);
        }
    };

    const handleSend = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/events`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: eventData, // assuming eventData is a valid JSON string
            });

            if (!response.ok) {
                console.error("Error posting event data:", response.statusText);
            } else {
                console.log("Event posted successfully");
            }
        } catch (error) {
            console.error("Error posting event data:", error);
        } finally {
            setShowModal(false);
        }
    };


    const handleCancel = () => {
        setShowModal(false);
    };

    return (
        <header className="header">
            <h1>Stream Viewer</h1>
            <div className="header-buttons">
                <button className="download-apk-button" onClick={handleDownload}>
                    Download APK
                </button>
                <button className="post-event-button" onClick={() => setShowModal(true)}>
                    Post Event
                </button>
            </div>
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
            <textarea
                className="event-json-textarea"
                rows="5"
                value={eventData}
                onChange={(e) => setEventData(e.target.value)}
            />
                        <div className="modal-buttons">
                            <button className="send-button" onClick={handleSend}>
                                Send
                            </button>
                            <button className="cancel-button" onClick={handleCancel}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
