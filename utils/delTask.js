"use client";
import { createClient } from "@/utils/supabase/client";

export default async function deleteTask(taskId) {
  const supabase = createClient();

  // Get the current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.error("User is not authenticated.");
    return;
  }

  // Fetch schedule ID associated with the user
  let { data: scheduleData, error: scheduleiderror } = await supabase
    .from("schedules")
    .select("id")
    .eq("user_id", user.id)
    .single();

  if (scheduleiderror) {
    console.error("Error fetching schedule_id:", scheduleiderror);
    return;
  }

  const schedule_id = scheduleData?.id;

  if (!schedule_id) {
    console.error("Schedule ID not found.");
    return;
  }

  // Delete the task based on the task ID
  const { error } = await supabase
    .from("tasks")
    .delete()
    .eq("id", taskId)
    .eq("schedule_id", schedule_id);

  if (error) {
    console.error("Error deleting task:", error);
    return;
  }

  console.log(`Task with ID ${taskId} deleted successfully.`);
}
