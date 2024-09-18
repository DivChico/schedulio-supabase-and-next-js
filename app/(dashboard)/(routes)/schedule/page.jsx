"use client";

import React, { useState, useEffect } from "react";
import StyledTimeAxisCalendar from "@/components/MianCalender";
import getTasksByScheduleId from "@/utils/getTasksByScheduleId";
import deleteTask from "@/utils/delTask";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import EditEventModal from "@/components/EditModal";

const Page = () => {
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);
  const router = useRouter();
  const supabase = createClient();
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const fetchedTasks = await getTasksByScheduleId();
        setEvents(fetchedTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const handleEdit = (event) => {
    setEditingEvent(event);
  };

  const handleSave = async (updatedEvent) => {
    // Update event in the database
    const { data, error } = await supabase
      .from("tasks")
      .update({
        title: updatedEvent.title,
        start_date: updatedEvent.start_date,
        end_date: updatedEvent.end_date,
      })
      .eq("id", updatedEvent.id);

    if (error) {
      console.error("Error updating event:", error);
    } else {
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === updatedEvent.id ? updatedEvent : event
        )
      );
    }
  };

  const handleDelete = async (id) => {
    console.log(`Delete event with ID: ${id}`);
    await deleteTask(id);
    router.refresh(); // Refresh the page to reflect changes
  };

  return (
    <div>
      <StyledTimeAxisCalendar
        events={events}
        date={new Date().toISOString().split("T")[0]}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      {editingEvent && (
        <EditEventModal
          event={editingEvent}
          onClose={() => setEditingEvent(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default Page;
