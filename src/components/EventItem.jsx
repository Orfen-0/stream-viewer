import React from 'react';
import StreamList from './StreamList';
import { format } from 'date-fns';

const EventItem = ({ event, onStreamSelect, onFinishEvent, expanded, toggleExpand }) => {
    const formattedDate = format(new Date(event.startTime * 1000), 'dd/MM/yyyy HH:mm');
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${event.location.Coordinates[1]},${event.location.Coordinates[0]}`;

    const locationString = event.location?.Coordinates
        ? `${event.location.Coordinates[1].toFixed(4)}, ${event.location.Coordinates[0].toFixed(4)}`
        : 'Unknown';

    const activeLabel = event.status === 'active' ? 'Active' : 'Finished';
    const hasLiveStream = event.streams?.some(stream => stream.status === 'live');
    const streamsCount = event.streams?.length || 0;

    return (
        <div className="event-item">
            <div className="event-header" onClick={toggleExpand}>
                <div>
                    <h3>{event.triggeredBy}</h3>
                    <span className="streams-count">Streams: {streamsCount}</span>
                </div>
                <span>{formattedDate}</span>
            </div>
            <div className="event-info">
                <a className="location-link" href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
                    {locationString}
                </a>
                <span className="radius-info">{event.radius} km</span>
            </div>
            <div className="event-labels">
                <span className="status-label">{activeLabel}</span>
                {hasLiveStream && <span className="live-indicator">LIVE</span>}
            </div>
            {event.status === 'active' && (
                <button className="mark-finished-button" onClick={() => onFinishEvent(event.id)}>
                    Mark as Finished
                </button>
            )}
            {expanded && (
                event.streams?.length > 0 ? (
                    <StreamList streams={event.streams} onStreamSelect={onStreamSelect} />
                ) : (
                    <div className="empty-message">No streams available for this event.</div>
                )
            )}
        </div>
    );
};

export default EventItem;
