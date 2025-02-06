import React, { useState, useEffect } from 'react';
import EventItem from './EventItem';
import { getEventsWithStreams } from '../services/api';
import DateTimePicker from "./DateTimePicker";

const formatForInput = (date) => {
    const pad = (num) => String(num).padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

const EventList = ({ onStreamSelect, onFinishEvent }) => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    const now = new Date();
    const oneWeekAgo = new Date(now);
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const [fromDate, setFromDate] = useState(formatForInput(oneWeekAgo));
    const [toDate, setToDate] = useState(formatForInput(now));
    const [showActive, setShowActive] = useState(true);
    const [showFinished, setShowFinished] = useState(true);

    useEffect(() => {
        setLoading(true);
        const fromUnix = Math.floor(new Date(fromDate).getTime() / 1000);
        const toUnix = Math.floor(new Date(toDate).getTime() / 1000);

        getEventsWithStreams(fromUnix, toUnix)
            .then(data => {
                setEvents(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching events', error);
                setLoading(false);
            });
    }, [fromDate, toDate]);

    const handleFromDateChange = (e) => setFromDate(e.target.value);
    const handleToDateChange = (e) => setToDate(e.target.value);
    const handleActiveChange = (e) => setShowActive(e.target.checked);
    const handleFinishedChange = (e) => setShowFinished(e.target.checked);

    const filteredEvents = events?.filter(event =>
        (event.status === 'active' && showActive) ||
        (event.status === 'finished' && showFinished)
    ) || [];

    return (
        <div className="event-list">
            <div className="filter-bar" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div className="date-picker-container">
                    <label>
                        Start Date
                            <DateTimePicker value={fromDate} onChange={date => setFromDate(new Date(date))} />
                    </label>
                    <label>
                        End Date
                            <DateTimePicker value={toDate} onChange={date => setToDate(new Date(date))} />
                    </label>
                </div>
                <div>
                    <label>
                        <input type="checkbox" checked={showActive} onChange={handleActiveChange} />
                        Active
                    </label>
                    <label style={{ marginLeft: '1rem' }}>
                        <input type="checkbox" checked={showFinished} onChange={handleFinishedChange} />
                        Finished
                    </label>
                </div>
            </div>
            {loading ? (
                <div className="empty-message">Loading events...</div>
            ) : filteredEvents.length === 0 ? (
                <div className="empty-message">No events available.</div>
            ) : (
                filteredEvents.map(event => (
                    <EventItem
                        key={event.id}
                        event={event}
                        onStreamSelect={onStreamSelect}
                        onFinishEvent={onFinishEvent}
                    />
                ))
            )}
        </div>
    );
};

export default EventList;
