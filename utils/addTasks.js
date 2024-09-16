"use client";
import React from "react";
import { createClient } from "@/utils/supabase/client";
import createSchedule from "./createSchedule";
import { NextResponse } from "next/server";
const tasks = [
  {
    id: 1,
    title: "Wake Up and Morning Routine",
    category: "Personal",
    startDate: "2024-09-16T05:30:00",
    endDate: "2024-09-16T06:00:00",
    desc: "Start your day with a morning routine, including hydration, stretching, and breakfast.",
    note: "Prepare for the day and get energized.",
    color: "#FFB74D",
  },
  {
    id: 2,
    title: "Fill Water Tank",
    category: "Personal",
    startDate: "2024-09-16T06:00:00",
    endDate: "2024-09-16T06:20:00",
    desc: "Complete the task of filling the water tank.",
    color: "#4DB6AC",
  },
  {
    id: 3,
    title: "Work",
    category: "Professional",
    startDate: "2024-09-16T06:30:00",
    endDate: "2024-09-16T14:00:00",
    desc: "Focused work period with breaks as needed.",
    note: "Keep hydrated and take short breaks to stay productive.",
    color: "#64B5F6",
  },
  {
    id: 4,
    title: "Lunch Break",
    category: "Personal",
    startDate: "2024-09-16T14:00:00",
    endDate: "2024-09-16T14:30:00",
    desc: "Enjoy a healthy lunch and take a short break.",
    color: "#FFD54F",
  },
  {
    id: 5,
    title: "Learn SaaS Development",
    category: "Learning",
    startDate: "2024-09-16T14:30:00",
    endDate: "2024-09-16T16:00:00",
    difficultyLevel: 4,
    resources: [
      {
        title: "SaaS Development Guide",
        url: "https://example.com/saas-guide",
      },
    ],
    desc: "Study SaaS development concepts and practice coding.",
    note: "Focus on understanding architecture and best practices.",
    todos: [
      { title: "Read Chapter 2", is_done: false },
      { title: "Build a simple app prototype", is_done: false },
    ],
    color: "#81C784",
  },
  {
    id: 6,
    title: "Create Content for YouTube Channel",
    category: "Personal Projects",
    startDate: "2024-09-16T16:00:00",
    endDate: "2024-09-16T18:00:00",
    desc: "Work on creating and editing content for your YouTube channel.",
    note: "Plan and script new video ideas.",
    todos: [
      { title: "Script new video", is_done: false },
      { title: "Record footage", is_done: false },
    ],
    color: "#FF7043",
  },
  {
    id: 7,
    title: "Relax and Unwind",
    category: "Personal",
    startDate: "2024-09-16T18:00:00",
    endDate: "2024-09-16T19:00:00",
    desc: "Relax with hobbies or leisure activities.",
    note: "Read a book, take a walk, or enjoy a hobby.",
    color: "#CE93D8",
  },
  {
    id: 8,
    title: "Dinner",
    category: "Personal",
    startDate: "2024-09-16T19:00:00",
    endDate: "2024-09-16T19:30:00",
    desc: "Have a balanced dinner.",
    color: "#F06292",
  },
  {
    id: 9,
    title: "Plan Next Day",
    category: "Personal",
    startDate: "2024-09-16T19:30:00",
    endDate: "2024-09-16T20:00:00",
    desc: "Review tasks and schedule for the next day.",
    note: "Prepare any items or notes needed for tomorrow.",
    color: "#FFAB91",
  },
  {
    id: 10,
    title: "Relaxation or Leisure",
    category: "Personal",
    startDate: "2024-09-16T20:00:00",
    endDate: "2024-09-16T23:00:00",
    desc: "Time for relaxation or leisure activities before bed.",
    note: "Enjoy some downtime, such as watching TV or reading.",
    color: "#90CAF9",
  },
  {
    id: 11,
    title: "Prepare for Bed",
    category: "Personal",
    startDate: "2024-09-16T23:00:00",
    endDate: "2024-09-16T23:30:00",
    desc: "Get ready for bed and wind down.",
    note: "Establish a calming pre-sleep routine.",
    color: "#B39DDB",
  },
];
export default async function addTasks(schedule_id) {
  const supabase = createClient();

  console.log(schedule_id);
  if (!schedule_id) {
    return new NextResponse("error");
  }
  // Using Promise.all to insert tasks asynchronously
  const results = await Promise.all(
    tasks.map(async (task) => {
      const { data, error } = await supabase
        .from("tasks")
        .insert([
          {
            title: task.title,
            schedule_id: schedule_id,
            desc: task.desc,
            category: task?.category,
            start_date: task.startDate,
            end_date: task.endDate,
            note: task?.note || null, // Optional field
            color: task?.color || "#FFFFFF", // Default color if not provided
          },
        ])
        .select();

      if (error) {
        console.error("Error inserting task:", error);
        return null;
      }

      return data;
    })
  );

  console.log("Inserted tasks:", results);
  return results;
}
