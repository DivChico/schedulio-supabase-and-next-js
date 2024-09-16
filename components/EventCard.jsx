import { calculateEventHeight } from "@/utils/calculateEventHeight ";
import { formatTime } from "@/utils/formatTime";
import React from "react";

const EventCard = ({ event, onClick, onEdit, onDelete }) => {
  const start = new Date(event.startDate);
  const end = new Date(event.endDate);
  const height = calculateEventHeight(start, end);
  const top = ((start.getHours() * 60 + start.getMinutes()) / 1440) * 100 + "%";

  return (
    <div
      className="absolute left-0 w-full md:w-4/5 lg:w-11/12 bg-blue-500 text-white border border-gray-300 shadow-lg rounded-lg p-3 cursor-pointer min-h-[50px] flex flex-col justify-between"
      style={{ top, height: `${height}px`, marginTop: "2px" }}
      onClick={() => onClick(event)}
    >
      <div className="flex justify-between items-center">
        <h4 className="font-semibold text-lg">
          {event.title || "Untitled Event"}
        </h4>
        <div className="space-x-2">
          <button
            className="bg-yellow-500 text-white px-2 py-1 rounded text-xs hover:bg-yellow-600"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(event.id);
            }}
          >
            Edit
          </button>
          <button
            className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(event.id);
            }}
          >
            Delete
          </button>
        </div>
      </div>
      <p className="text-sm mt-2">
        {`${formatTime(start.getHours(), start.getMinutes())} - ${formatTime(
          end.getHours(),
          end.getMinutes()
        )}`}
      </p>
    </div>
  );
};

export default EventCard;
