"use client";
// TODO : get user id (from clerk)

// TODO : create schedule
// TODO : link schedule with day
// TODO : get schedule id
// TODO : get tasks
// TODO : loop on tasks and insert then in table

import React from "react";
import { createClient } from "@/utils/supabase/client";
import addTasks from "./addTasks";

export default async function createSchedule() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log(user);

  const { data, error } = await supabase
    .from("schedules")
    .insert([{ user_id: user?.id, schedule_type: "daily" }])
    .select()
    .single();

  return data;
}
