import { calculateEventHeight } from "@/utils/calculateEventHeight ";
import { formatTime } from "@/utils/formatTime";
import React from "react";

const EventCard = ({ event, onClick, onEdit, onDelete }) => {
  const start = new Date(event.start_date);
  const end = new Date(event.end_date);
  const height = calculateEventHeight(start, end);
  const top = ((start.getHours() * 60 + start.getMinutes()) / 1440) * 100 + "%";

  return (
    <div
      className="relative bg-white shadow-md rounded-lg border border-gray-200 p-4 flex flex-col space-y-3 cursor-pointer hover:shadow-lg transition-shadow duration-300  w-1/2"
      style={{ top, marginTop: "10px" }}
      onClick={() => onClick(event)}
    >
      <div className="flex justify-between items-start">
        <h4 className="font-semibold text-lg text-gray-800">
          {event.title || "Untitled Event"}
        </h4>
        <div className="flex space-x-2">
          <button
            className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-full text-xs transition-colors duration-200"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(event.id);
            }}
          >
            Edit
          </button>
          <button
            className="bg-red-400 hover:bg-red-500 text-white px-3 py-1 rounded-full text-xs transition-colors duration-200"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(event.id);
            }}
          >
            Delete
          </button>
        </div>
      </div>

      <div className="flex items-center text-sm text-gray-600 space-x-1">
        <p>{formatTime(start.getHours(), start.getMinutes())}</p>
        <span>–</span>
        <p>{formatTime(end.getHours(), end.getMinutes())}</p>
      </div>

      <p className="text-xs text-gray-500">
        {event.note || "No additional notes"}
      </p>

      <div
        className="absolute inset-0 bg-blue-50 opacity-20 pointer-events-none rounded-lg"
        style={{ height: `${height}px` }}
      ></div>
    </div>
  );
};

export default EventCard;
