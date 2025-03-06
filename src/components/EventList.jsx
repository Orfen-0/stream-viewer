import React, { useState, useEffect, useRef } from 'react';
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
    const [forceRender, setForceRender] = useState(0); // ✅ Used to trigger UI updates
    const expandedEvents = useRef(new Set()); // ✅ Store expanded states without losing them on re-render

    const now = new Date();
    now.setHours(23, 59, 59, 999);

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(now.getDate() - 7);
    oneWeekAgo.setHours(0, 0, 0, 0);

    const [fromDate, setFromDate] = useState(formatForInput(oneWeekAgo));
    const [toDate, setToDate] = useState(formatForInput(now));
    const [showActive, setShowActive] = useState(true);
    const [showFinished, setShowFinished] = useState(true);

    const fetchEvents = () => {
        setLoading(true);
        const fromUnix = Math.floor(new Date(fromDate).getTime() / 1000);
        const toUnix = Math.floor(new Date(toDate).getTime() / 1000);

        getEventsWithStreams(fromUnix, toUnix)
            .then(newEvents => {
                setEvents(prevEvents => {
                    const newIds = new Set(newEvents.map(e => e.id));

                    // ✅ Keep expanded states only for existing events
                    expandedEvents.current = new Set([...expandedEvents.current].filter(id => newIds.has(id)));

                    return newEvents;
                });
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching events', error);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchEvents();
        const intervalId = setInterval(fetchEvents, 15000);
        return () => clearInterval(intervalId);
    }, [fromDate, toDate]);

    const handleFromDateChange = (e) => setFromDate(e.target.value);
    const handleToDateChange = (e) => setToDate(e.target.value);
    const handleActiveChange = (e) => setShowActive(e.target.checked);
    const handleFinishedChange = (e) => setShowFinished(e.target.checked);

    const toggleExpand = (id) => {
        if (expandedEvents.current.has(id)) {
            expandedEvents.current.delete(id);
        } else {
            expandedEvents.current.add(id);
        }
        setForceRender(prev => prev + 1); // ✅ Force re-render to reflect changes in the UI
    };

    const filteredEvents = (events?.filter(event =>
        (event.status === 'active' && showActive) ||
        (event.status === 'finished' && showFinished)
    ) || []).sort((a, b) => new Date(b.startTime) - new Date(a.startTime));

    return (
        <div className="event-list">
            <div className="filter-bar" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div className="date-picker-container">
                    <label>
                        Start Date
                        <DateTimePicker value={fromDate} onChange={date => setFromDate(formatForInput(new Date(date)))} />
                    </label>
                    <label>
                        End Date
                        <DateTimePicker value={toDate} onChange={date => setToDate(formatForInput(new Date(date)))} />
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
                        expanded={expandedEvents.current.has(event.id)} // ✅ Preserve expanded state
                        toggleExpand={() => toggleExpand(event.id)}
                    />
                ))
            )}
        </div>
    );
};

export default EventList;
