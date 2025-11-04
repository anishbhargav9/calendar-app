import React from 'react';
import { getMonthName } from '../utils/dateUtils';

const CalendarHeader = ({ year, month, onPrevMonth, onNextMonth, onToday }) => {
  return (
    <div className="calendar-header">
      <div className="header-left">
        <h1 className="calendar-title">
          {getMonthName(month)} {year}
        </h1>
      </div>
      <div className="header-right">
        <button 
          className="nav-button today-button" 
          onClick={onToday}
          title="Go to today"
        >
          Today
        </button>
        <button 
          className="nav-button prev-button" 
          onClick={onPrevMonth}
          title="Previous month"
        >
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <button 
          className="nav-button next-button" 
          onClick={onNextMonth}
          title="Next month"
        >
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CalendarHeader;