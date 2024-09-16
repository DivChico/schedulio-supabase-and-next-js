"use client";
import React from "react";
import { createClient } from "@/utils/supabase/client";

export default async function getTasksByScheduleId() {
  const supabase = createClient();

  // get schedule id
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let { data: scheduleData, error: scheduleiderror } = await supabase
    .from("schedules")
    .select("id")
    .eq("user_id", user.id);

  const schedule_id = scheduleData?.[0]?.id;

  if (scheduleiderror) {
    console.error("Error fetching schedule_id:", scheduleiderror);
    return null;
  }

  // Query to fetch tasks by schedule_id
  const { data: tasks, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("schedule_id", schedule_id); // Filtering tasks by schedule_id
  console.log(tasks);

  if (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }

  console.log("Fetched tasks:", tasks);
  return tasks; // This will be an array of tasks
}
