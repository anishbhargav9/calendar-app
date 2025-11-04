import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

// Adding plugins to compare dates properly
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

/**
 * This function returns all the days shown in a monthly calendar grid.
 * It includes previous and next month's days to fill the calendar layout.
 */
export const getCalendarDays = (year, month) => {
  // Getting the first day of the month
  const firstDay = dayjs(new Date(year, month, 1));
  // Last day of the same month
  const lastDay = firstDay.endOf('month');
  // Last day of the previous month
  const prevMonthLastDay = firstDay.subtract(1, 'day');
  
  const daysInMonth = lastDay.date();
  const startingDayOfWeek = firstDay.day();
  const daysInPrevMonth = prevMonthLastDay.date();
  
  const days = [];
  
  // Filling days from the previous month if the first day isn't Sunday
  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    days.push({
      date: daysInPrevMonth - i,
      isCurrentMonth: false,
      fullDate: dayjs(new Date(year, month - 1, daysInPrevMonth - i))
    });
  }
  
  // Adding actual days of the current month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({
      date: i,
      isCurrentMonth: true,
      fullDate: dayjs(new Date(year, month, i))
    });
  }
  
  // Whatever empty cells remain, fill them using next month's days
  const remainingDays = 42 - days.length; // 6 rows * 7 columns
  for (let i = 1; i <= remainingDays; i++) {
    days.push({
      date: i,
      isCurrentMonth: false,
      fullDate: dayjs(new Date(year, month + 1, i))
    });
  }
  
  return days;
};

/**
 * Simple helper to check if a given date matches today's date
 */
export const isToday = (date) => {
  return date.isSame(dayjs(), 'day');
};

/**
 * Filters and returns events that match the selected date
 */
export const getEventsForDate = (events, date) => {
  return events.filter(event => 
    dayjs(event.date).isSame(date, 'day')
  );
};

/**
 * Checks if two events overlap in time
 * Helpful to detect schedule clashes
 */
export const doEventsOverlap = (event1, event2) => {
  const start1 = dayjs(`${event1.date} ${event1.time}`);
  const end1 = start1.add(event1.duration, 'minute');
  const start2 = dayjs(`${event2.date} ${event2.time}`);
  const end2 = start2.add(event2.duration, 'minute');
  
  return (
    (start1.isSameOrBefore(start2) && end1.isAfter(start2)) ||
    (start2.isSameOrBefore(start1) && end2.isAfter(start1))
  );
};

/**
 * Converts 24-hour format time to 12-hour format for better readability
 */
export const formatTime = (time) => {
  return dayjs(`2000-01-01 ${time}`).format('h:mm A');
};

/**
 * Returns the full month name based on month index (0-11)
 */
export const getMonthName = (month) => {
  return dayjs(new Date(2000, month, 1)).format('MMMM');
};

/**
 * Goes through all events of a single day and finds conflicts
 * Useful when multiple events overlap
 */
export const detectConflicts = (events) => {
  const conflicts = [];
  
  // Comparing each event with all others
  for (let i = 0; i < events.length; i++) {
    for (let j = i + 1; j < events.length; j++) {
      if (doEventsOverlap(events[i], events[j])) {
        conflicts.push([events[i], events[j]]);
      }
    }
  }
  
  return conflicts;
};
