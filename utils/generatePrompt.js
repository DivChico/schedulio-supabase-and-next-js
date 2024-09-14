import React from "react";
import { generatePrompts } from "./openai/openai";

export default async function generatePrompt(schedule) {
  // const userQuery = "Tell me a joke!";
  // const chatbotResponse = await generatePrompts("davinci", userQuery);
  // console.log(chatbotResponse);
  const {
    wakeUpTime,
    bedTime,
    workStartTime,
    workEndTime,
    lunchStartTime,
    lunchEndTime,
    commitments,
    goals,
    personType,
  } = schedule;

  // Determine if the user is a morning or night person
  const personTypeText =
    personType === "morning" ? "morning person" : "night person";
  // Construct the commitment details
  const commitmentDetails = commitments
    .filter((c) => c.title && c.start && c.end) // Filter out empty commitments
    .map((c) => `${c.title} from ${c.start} to ${c.end}`)
    .join(", ");
  // Construct the goals
  const goalList = goals.map((g) => g.title).join(", ");
  const prompt = `I am a ${personTypeText}, and I wake up at ${wakeUpTime} and go to bed at ${bedTime}. I work from ${workStartTime} to ${workEndTime}, with a lunch break from ${lunchStartTime} to ${lunchEndTime}. ${
    commitmentDetails ? `I have commitments like ${commitmentDetails}.` : ""
  } I would like to ${goalList}. Please create a daily schedule for me that balances work, personal tasks, and relaxation.`;
  console.log(prompt);
  return prompt;
}
