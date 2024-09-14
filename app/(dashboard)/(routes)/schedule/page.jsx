"use client";
import React from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";

const Page = () => {
  // Get today's date in YYYY-MM-DD format
  const today = new Date();
  const currentDate = today.toISOString().split("T")[0]; // Format as YYYY-MM-DD

  const dailySchedule = [
    {
      id: "1",
      groupId: "group1",
      allDay: false,
      start: new Date(2024, 8, 14, 5, 30),
      startStr: new Date(2024, 8, 14, 5, 30).toISOString(),
      end: new Date(2024, 8, 14, 6, 0),
      endStr: new Date(2024, 8, 14, 6, 0).toISOString(),
      title: "Wake up and Morning Routine",
      editable: true,
      startEditable: true,
      durationEditable: true,
      resourceEditable: true,
      overlap: true,
      display: "block",
      backgroundColor: "#FFCC00",
      borderColor: "#FFCC00",
      textColor: "#000000",
      extendedProps: {
        recurring: "FREQ=DAILY",
      },
    },
    {
      id: "2",
      groupId: "group1",
      allDay: false,
      start: new Date(2024, 8, 14, 6, 0),
      startStr: new Date(2024, 8, 14, 6, 0).toISOString(),
      end: new Date(2024, 8, 14, 6, 20),
      endStr: new Date(2024, 8, 14, 6, 20).toISOString(),
      title: "Fill Water Tank",
      editable: true,
      startEditable: true,
      durationEditable: true,
      resourceEditable: true,
      overlap: true,
      display: "block",
      backgroundColor: "#00CCFF",
      borderColor: "#00CCFF",
      textColor: "#000000",
      extendedProps: {
        recurring: "FREQ=DAILY",
      },
    },
    {
      id: "3",
      groupId: "group2",
      allDay: false,
      start: new Date(2024, 8, 14, 6, 30),
      startStr: new Date(2024, 8, 14, 6, 30).toISOString(),
      end: new Date(2024, 8, 14, 14, 0),
      endStr: new Date(2024, 8, 14, 14, 0).toISOString(),
      title: "Work",
      editable: false,
      startEditable: false,
      durationEditable: false,
      resourceEditable: false,
      overlap: false,
      display: "block",
      backgroundColor: "#FF5733",
      borderColor: "#FF5733",
      textColor: "#FFFFFF",
      extendedProps: {
        recurring: "FREQ=DAILY",
      },
    },
    {
      id: "4",
      groupId: "group2",
      allDay: false,
      start: new Date(2024, 8, 14, 14, 0),
      startStr: new Date(2024, 8, 14, 14, 0).toISOString(),
      end: new Date(2024, 8, 14, 14, 30),
      endStr: new Date(2024, 8, 14, 14, 30).toISOString(),
      title: "Lunch Break",
      editable: true,
      startEditable: true,
      durationEditable: true,
      resourceEditable: true,
      overlap: true,
      display: "block",
      backgroundColor: "#FFB6C1",
      borderColor: "#FFB6C1",
      textColor: "#000000",
      extendedProps: {
        recurring: "FREQ=DAILY",
      },
    },
    {
      id: "5",
      groupId: "group3",
      allDay: false,
      start: new Date(2024, 8, 14, 15, 0),
      startStr: new Date(2024, 8, 14, 15, 0).toISOString(),
      end: new Date(2024, 8, 14, 17, 0),
      endStr: new Date(2024, 8, 14, 17, 0).toISOString(),
      title: "Work on SaaS App",
      editable: true,
      startEditable: true,
      durationEditable: true,
      resourceEditable: true,
      overlap: true,
      display: "block",
      backgroundColor: "#3CB371",
      borderColor: "#3CB371",
      textColor: "#FFFFFF",
      extendedProps: {
        recurring: "FREQ=DAILY",
      },
    },
    {
      id: "6",
      groupId: "group3",
      allDay: false,
      start: new Date(2024, 8, 14, 17, 30),
      startStr: new Date(2024, 8, 14, 17, 30).toISOString(),
      end: new Date(2024, 8, 14, 19, 0),
      endStr: new Date(2024, 8, 14, 19, 0).toISOString(),
      title: "Work on YouTube Channel",
      editable: true,
      startEditable: true,
      durationEditable: true,
      resourceEditable: true,
      overlap: true,
      display: "block",
      backgroundColor: "#1E90FF",
      borderColor: "#1E90FF",
      textColor: "#FFFFFF",
      extendedProps: {
        recurring: "FREQ=DAILY",
      },
    },
    {
      id: "7",
      groupId: "group4",
      allDay: false,
      start: new Date(2024, 8, 14, 19, 30),
      startStr: new Date(2024, 8, 14, 19, 30).toISOString(),
      end: new Date(2024, 8, 14, 21, 0),
      endStr: new Date(2024, 8, 14, 21, 0).toISOString(),
      title: "Relaxation and Personal Time",
      editable: true,
      startEditable: true,
      durationEditable: true,
      resourceEditable: true,
      overlap: true,
      display: "block",
      backgroundColor: "#FFD700",
      borderColor: "#FFD700",
      textColor: "#000000",
      extendedProps: {
        recurring: "FREQ=DAILY",
      },
    },
    {
      id: "8",
      groupId: "group4",
      allDay: false,
      start: new Date(2024, 8, 14, 21, 30),
      startStr: new Date(2024, 8, 14, 21, 30).toISOString(),
      end: new Date(2024, 8, 14, 23, 0),
      endStr: new Date(2024, 8, 14, 23, 0).toISOString(),
      title: "Dinner and Wind Down",
      editable: true,
      startEditable: true,
      durationEditable: true,
      resourceEditable: true,
      overlap: true,
      display: "block",
      backgroundColor: "#FF4500",
      borderColor: "#FF4500",
      textColor: "#FFFFFF",
      extendedProps: {
        recurring: "FREQ=DAILY",
      },
    },
    {
      id: "9",
      groupId: "group5",
      allDay: true,
      start: new Date(2024, 8, 14, 23, 0),
      startStr: new Date(2024, 8, 14, 23, 0).toISOString(),
      end: new Date(2024, 8, 15, 5, 30),
      endStr: new Date(2024, 8, 15, 5, 30).toISOString(),
      title: "Sleep",
      editable: false,
      startEditable: false,
      durationEditable: false,
      resourceEditable: false,
      overlap: false,
      display: "block",
      backgroundColor: "#000080",
      borderColor: "#000080",
      textColor: "#FFFFFF",
      extendedProps: {
        recurring: "FREQ=DAILY",
      },
    },
  ];

  console.log(dailySchedule);

  return (
    <div>
      <FullCalendar
        allDaySlot={false}
        plugins={[timeGridPlugin]}
        initialView="timeGridDay"
        weekends={true}
        events={dailySchedule}
      />
    </div>
  );
};

export default Page;
