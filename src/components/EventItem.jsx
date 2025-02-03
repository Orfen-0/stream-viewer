import React, { useState } from 'react';
import StreamList from './StreamList';
import { format } from 'date-fns';

const EventItem = ({ event, onStreamSelect, onFinishEvent }) => {
    const [expanded, setExpanded] = useState(false);

    // Format event.startTime (Unix timestamp in seconds) to dd/MM/yyyy HH:mm
    const formattedDate = format(new Date(event.startTime * 1000), 'dd/MM/yyyy HH:mm');

    // Build a Google Maps search URL using the event's GeoJSON coordinates.
    // Note: GeoJSON uses [longitude, latitude].
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${event.location.Coordinates[1]},${event.location.Coordinates[0]}`;

    // Format location as a string for display, e.g. "51.5074, -0.1278"
    const locationString = event.location && event.location.Coordinates
        ? `${event.location.Coordinates[1].toFixed(4)}, ${event.location.Coordinates[0].toFixed(4)}`
        : 'Unknown';

    return (
        <div className="event-item">
            <div className="event-header" onClick={() => setExpanded(!expanded)}>
                <h3>{event.triggeredBy}</h3>
                <span>{formattedDate}</span>
                {event.status === 'active' && <span className="live-indicator">LIVE</span>}
            </div>
            <div className="event-details">
                <div className="event-info">
                    <a
                        className="location-link"
                        href={googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Location: {locationString}
                    </a>
                    <span className="radius-info">Radius: {event.radius} km</span>
                </div>
                {event.status === 'active' && (
                    <button
                        className="mark-finished-button"
                        onClick={() => onFinishEvent(event.id)}
                    >
                        Mark as Finished
                    </button>
                )}
            </div>
            {expanded && (
                <>
                    <div className="divider"></div>
                    {event.streams && event.streams.length > 0 ? (
                        <StreamList streams={event.streams} onStreamSelect={onStreamSelect} />
                    ) : (
                        <div className="empty-message">No streams available for this event.</div>
                    )}
                </>
            )}
        </div>
    );
};

export default EventItem;
