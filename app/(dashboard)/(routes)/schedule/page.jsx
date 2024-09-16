"use client";

import StyledTimeAxisCalendar from "@/components/MianCalender";
import React from "react";
import { createClient } from "@/utils/supabase/client";
import { useEffect } from "react";
import getTasksByScheduleId from "@/utils/getTasksByScheduleId";
import { useState } from "react";
const user_id = "5488fd07-85cd-4ec1-915f-4c5f01b48ccf";

const page = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const fetchedTasks = await getTasksByScheduleId();
        setEvents(fetchedTasks);
        console.log(events);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

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
      />
    </div>
  );
};

export default page;
