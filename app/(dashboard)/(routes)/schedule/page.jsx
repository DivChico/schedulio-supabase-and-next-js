"use client";
import React from "react";
import { Paper } from "@mui/material";
import {
  Appointments,
  DayView,
  Scheduler,
  ViewState,
} from "@devexpress/dx-react-scheduler";

const Page = () => {
  // Get today's date in YYYY-MM-DD format
  const today = new Date();
  const currentDate = today.toISOString().split("T")[0]; // Format as YYYY-MM-DD

  const dailySchedule = [
    {
      startDate: new Date(`${currentDate}T05:30:00`),
      endDate: new Date(`${currentDate}T06:00:00`),
      title: "Wake up and Morning Routine",
      allDay: false,
      id: 1,
    },
    {
      startDate: new Date(`${currentDate}T06:00:00`),
      endDate: new Date(`${currentDate}T06:20:00`),
      title: "Fill Water Tank",
      allDay: false,
      id: 2,
    },
    {
      startDate: new Date(`${currentDate}T06:30:00`),
      endDate: new Date(`${currentDate}T14:00:00`),
      title: "Work",
      allDay: false,
      id: 3,
      rRule: "FREQ=DAILY;BYHOUR=6,7,8,9,10,11,12,13",
    },
    {
      startDate: new Date(`${currentDate}T14:00:00`),
      endDate: new Date(`${currentDate}T14:30:00`),
      title: "Lunch Break",
      allDay: false,
      id: 4,
    },
    {
      startDate: new Date(`${currentDate}T15:00:00`),
      endDate: new Date(`${currentDate}T17:00:00`),
      title: "Work on SaaS App",
      allDay: false,
      id: 5,
    },
    {
      startDate: new Date(`${currentDate}T17:30:00`),
      endDate: new Date(`${currentDate}T19:00:00`),
      title: "Work on YouTube Channel",
      allDay: false,
      id: 6,
    },
    {
      startDate: new Date(`${currentDate}T19:30:00`),
      endDate: new Date(`${currentDate}T21:00:00`),
      title: "Relaxation and Personal Time",
      allDay: false,
      id: 7,
    },
    {
      startDate: new Date(`${currentDate}T21:30:00`),
      endDate: new Date(`${currentDate}T23:00:00`),
      title: "Dinner and Wind Down",
      allDay: false,
      id: 8,
    },
    {
      startDate: new Date(`${currentDate}T23:00:00`),
      title: "Sleep",
      allDay: true,
      id: 9,
    },
  ];

  return (
    <Paper>
      <Scheduler data={dailySchedule}>
        <ViewState currentDate={currentDate} />
        <DayView startDayHour={5} endDayHour={23} />
        <Appointments />
      </Scheduler>
    </Paper>
  );
};

export default Page;
