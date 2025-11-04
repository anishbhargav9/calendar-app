import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import CalendarHeader from './CalendarHeader';
import CalendarGrid from './CalendarGrid';
import EventModal from './EventModal';
import { getCalendarDays } from '../utils/dateUtils';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [events, setEvents] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load events from JSON file
    fetch('/events.json')
      .then((response) => response.json())
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error loading events:', error);
        setLoading(false);
      });
  }, []);

  const year = currentDate.year();
  const month = currentDate.month();

  const days = getCalendarDays(year, month);

  const handlePrevMonth = () => {
    setCurrentDate(currentDate.subtract(1, 'month'));
  };

  const handleNextMonth = () => {
    setCurrentDate(currentDate.add(1, 'month'));
  };

  const handleToday = () => {
    setCurrentDate(dayjs());
  };

  const handleDateClick = (day, dayEvents) => {
    setSelectedDay(day.fullDate);
    setSelectedEvents(dayEvents);
  };

  const handleCloseModal = () => {
    setSelectedDay(null);
    setSelectedEvents([]);
  };

  if (loading) {
    return (
      <div className="calendar-container">
        <div className="loading">Loading calendar...</div>
      </div>
    );
  }

  return (
    <div className="calendar-container">
      <CalendarHeader
        year={year}
        month={month}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
        onToday={handleToday}
      />
      <CalendarGrid
        days={days}
        events={events}
        onDateClick={handleDateClick}
      />
      {selectedDay && (
        <EventModal
          events={selectedEvents}
          date={selectedDay}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Calendar;