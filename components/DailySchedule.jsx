"use client";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

// Helper function to convert time to 12-hour format with AM/PM
const formatTime12Hour = (dateTime) => {
  const date = new Date(dateTime);
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Convert 0 hours to 12 AM
  return `${hours}:${minutes} ${ampm}`;
};

// Helper function to calculate percentage position on the time axis
const timeToPercentage = (dateTime) => {
  const date = new Date(dateTime);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return ((hours + minutes / 60) * 100) / 24;
};

// Generate time labels for the full day in 30-minute intervals
const generateTimeLabels = () => {
  const times = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const date = new Date();
      date.setHours(hour, minute, 0);
      times.push(formatTime12Hour(date));
    }
  }
  return times;
};

// Function to calculate card height based on event time
const getCardHeight = (start, end) => {
  const startTime = new Date(start);
  const endTime = new Date(end);
  const duration = (endTime - startTime) / 60000; // Duration in minutes
  return Math.max(duration, 30); // Minimum height of 30px
};

// Find free time intervals between events
const calculateFreeTimeIntervals = (events) => {
  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.startDate) - new Date(b.startDate)
  );
  const freeIntervals = [];

  let startOfDay = new Date(sortedEvents[0]?.startDate);
  startOfDay.setHours(0, 0, 0, 0);

  if (sortedEvents.length > 0) {
    const endOfDay = new Date(sortedEvents[sortedEvents.length - 1].endDate);
    endOfDay.setHours(23, 59, 59, 999);

    // Handle free time before the first event
    if (startOfDay < new Date(sortedEvents[0].startDate)) {
      freeIntervals.push({
        startDate: startOfDay.toISOString(),
        endDate: new Date(sortedEvents[0].startDate).toISOString(),
        title: "Free Time",
      });
    }

    // Handle gaps between events
    for (let i = 0; i < sortedEvents.length - 1; i++) {
      const end = new Date(sortedEvents[i].endDate);
      const start = new Date(sortedEvents[i + 1].startDate);
      if (end < start) {
        freeIntervals.push({
          startDate: end.toISOString(),
          endDate: start.toISOString(),
          title: "Free Time",
        });
      }
    }

    // Handle free time after the last event
    if (new Date(sortedEvents[sortedEvents.length - 1].endDate) < endOfDay) {
      freeIntervals.push({
        startDate: new Date(
          sortedEvents[sortedEvents.length - 1].endDate
        ).toISOString(),
        endDate: endOfDay.toISOString(),
        title: "Free Time",
      });
    }
  }

  return freeIntervals;
};

const StyledTimeAxisCalendar = ({ events, date, onEdit, onDelete }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update the current time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  // Filter events for the current day
  const dayEvents = events.filter(
    (event) =>
      new Date(event.startDate).toDateString() === new Date(date).toDateString()
  );

  // Calculate free time intervals
  const freeTimeIntervals = calculateFreeTimeIntervals(dayEvents);

  // Combine events and free time intervals
  const combinedEvents = [...dayEvents, ...freeTimeIntervals].sort(
    (a, b) => new Date(a.startDate) - new Date(b.startDate)
  );

  // Generate time labels
  const times = generateTimeLabels();

  // Red line position for current time
  const currentLinePosition = timeToPercentage(currentTime);

  return (
    <div className="relative w-full h-screen bg-gray-100 overflow-y-auto">
      {/* Red line for current time */}
      <div
        className="absolute w-full h-1 bg-red-600"
        style={{ top: `${currentLinePosition}%`, zIndex: 10 }}
      ></div>

      {/* Render Time Axis */}
      <div className="absolute left-0 top-0 w-24 bg-gray-200 border-r border-gray-300 h-full">
        {times.map((time, index) => {
          const timePercentage = timeToPercentage(
            `1970-01-01T${time.split(" ")[0]}:00`
          );
          return (
            <div
              key={index}
              className="w-full text-xs border-b border-gray-300"
              style={{
                position: "absolute",
                top: `${timePercentage}%`,
                height: "30px", // Fixed height for each interval
                backgroundColor: "transparent",
              }}
            >
              <span className="block text-gray-500 px-2">{time}</span>
            </div>
          );
        })}
      </div>

      {/* Render Combined Events and Free Time */}
      {combinedEvents.map((event) => {
        const startPercent = timeToPercentage(event.startDate);
        const endPercent = event.endDate
          ? timeToPercentage(event.endDate)
          : startPercent + 2; // Ensure at least 1 hour duration
        const eventHeight = getCardHeight(event.startDate, event.endDate) + 10; // Padding and margin

        return (
          <div
            key={event.startDate}
            className="relative ml-24 mb-5"
            style={{ top: `${startPercent}%`, height: `${eventHeight}px` }}
          >
            {/* Time label */}
            <div className="absolute -left-24 top-0 w-20 text-gray-600 text-xs flex items-center justify-end pr-2">
              {formatTime12Hour(event.startDate)}
            </div>

            {/* Event Block */}
            <div
              className={`bg-${
                event.title === "Free Time" ? "blue-100" : "white"
              } text-gray-800 rounded-lg p-4 shadow-lg border border-gray-300 relative flex flex-col`}
              style={{
                height: `${eventHeight}px`,
                padding: "10px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              {/* Event Title */}
              <div className="flex justify-between items-center mb-2">
                <p className="font-semibold text-lg">
                  {event.title || "Untitled Event"}
                </p>
                {event.title !== "Free Time" && (
                  <div className="flex space-x-2">
                    {/* Edit Button */}
                    <button
                      onClick={() => onEdit(event.id)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-xs transition duration-300"
                    >
                      Edit
                    </button>
                    {/* Delete Button */}
                    <button
                      onClick={() => onDelete(event.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs transition duration-300"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>

              {/* Event Details */}
              <p className="text-sm mb-1">
                <strong>Time:</strong> {formatTime12Hour(event.startDate)} -{" "}
                {event.endDate ? formatTime12Hour(event.endDate) : "Ongoing"}
              </p>
              {event.allDay && (
                <p className="text-sm mb-1">
                  <strong>All Day Event</strong>
                </p>
              )}
              {event.rRule && (
                <p className="text-sm mb-1">
                  <strong>Recurrence:</strong> {event.rRule}
                </p>
              )}
              {event.exDate && (
                <p className="text-sm mb-1">
                  <strong>Excluded Dates:</strong> {event.exDate}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

StyledTimeAxisCalendar.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      startDate: PropTypes.string.isRequired, // ISO 8601 date string
      endDate: PropTypes.string, // Optional ISO 8601 date string
      title: PropTypes.string, // Optional title for the event
      allDay: PropTypes.bool, // Optional flag for all-day events
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Optional ID
      rRule: PropTypes.string, // Optional recurrence rule
      exDate: PropTypes.string, // Optional excluded dates
    })
  ).isRequired,
  date: PropTypes.string.isRequired, // ISO date string for the day being viewed
  onEdit: PropTypes.func.isRequired, // Function to handle editing an event
  onDelete: PropTypes.func.isRequired, // Function to handle deleting an event
};

export default StyledTimeAxisCalendar;
