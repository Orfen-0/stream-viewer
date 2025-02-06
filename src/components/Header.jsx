import React, { useState } from 'react';
import '../Header.css'; // We'll add the styles here

const Header = () => {
    const [showModal, setShowModal] = useState(false);
    const [eventData, setEventData] = useState(`{
  "TriggeredBy": "test",
  "Longitude": -0.1952757,
  "Latitude": 51.5415787
}`);

    const handleSend = async () => {
        try {
            const response = await fetch("http://localhost:8080/events", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: eventData, // assuming eventData is a valid JSON string
            });

            if (!response.ok) {
                console.error("Error posting event data:", response.statusText);
                // Optionally display an error message to the user.
            } else {
                console.log("Event posted successfully");
                // Optionally do something with the response data.
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
            <button className="post-event-button" onClick={() => setShowModal(true)}>
                Post Event
            </button>

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
