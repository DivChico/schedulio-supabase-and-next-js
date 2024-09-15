"use client";

import StyledTimeAxisCalendar from "@/components/DailySchedule";
import React from "react";

const page = () => {
  const events = [
    {
      id: 1,
      title: "Morning Exercise",
      startDate: "2024-09-15T06:00:00",
      endDate: "2024-09-15T07:00:00",
    },
    {
      id: 2,
      title: "Work on SaaS App",
      startDate: "2024-09-15T08:00:00",
      endDate: "2024-09-15T10:30:00",
    },
    {
      id: 3,
      title: "All-day Conference",
      startDate: "2024-09-15T11:00:00",
      endDate: "2024-09-15T11:30:00",
    },
    {
      id: 4,
      title: "Lunch Break",
      startDate: "2024-09-15T14:00:00",
      endDate: "2024-09-15T14:30:00",
    },
  ];
  const currentDate = new Date().toISOString().split("T")[0];
  // Handler Functions
  const handleEdit = (id) => {
    console.log(`Edit event with ID: ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Delete event with ID: ${id}`);
  };
  return (
    <div>
      <StyledTimeAxisCalendar
        events={events}
        date={currentDate}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />{" "}
    </div>
  );
};

export default page;
