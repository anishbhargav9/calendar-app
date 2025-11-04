import React from 'react';
import { isToday, getEventsForDate, detectConflicts } from '../utils/dateUtils';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const CalendarGrid = ({ days, events, onDateClick }) => {
  const getDayEvents = (day) => {
    return getEventsForDate(events, day.fullDate);
  };

  const hasConflicts = (dayEvents) => {
    return detectConflicts(dayEvents).length > 0;
  };

  return (
    <div className="calendar-grid">
      {/* Weekday headers */}
      <div className="weekday-headers">
        {WEEKDAYS.map((day) => (
          <div key={day} className="weekday-header">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar days */}
      <div className="calendar-days">
        {days.map((day, index) => {
          const dayEvents = getDayEvents(day);
          const hasConflict = hasConflicts(dayEvents);
          const today = isToday(day.fullDate);

          return (
            <div
              key={index}
              className={`calendar-day ${!day.isCurrentMonth ? 'other-month' : ''} ${
                today ? 'today' : ''
              }`}
              onClick={() => onDateClick(day, dayEvents)}
            >
              <div className="day-number">{day.date}</div>
              
              {dayEvents.length > 0 && (
                <div className="day-events">
                  {dayEvents.slice(0, 3).map((event) => (
                    <div
                      key={event.id}
                      className={`event-indicator ${hasConflict ? 'conflict' : ''}`}
                      style={{ backgroundColor: event.color }}
                      title={event.title}
                    >
                      <span className="event-title-short">{event.title}</span>
                    </div>
                  ))}
                  {dayEvents.length > 3 && (
                    <div className="more-events">
                      +{dayEvents.length - 3} more
                    </div>
                  )}
                  {hasConflict && (
                    <div className="conflict-indicator" title="Time conflicts detected">
                      <svg 
                        width="14" 
                        height="14" 
                        viewBox="0 0 24 24" 
                        fill="currentColor"
                      >
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                      </svg>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarGrid;