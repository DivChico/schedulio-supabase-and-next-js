// Example response from ChatGPT API

// Function to parse the response and create task objects
export default function parseSchedule(response) {
  const tasks = [];

  const lines = response.trim().split("\n");

  lines.forEach((line) => {
    // Split each line into time range and task description
    const [timeRange, taskDescription] = line.split(": ");
    const [startTime, endTime] = timeRange.split(" - ");

    tasks.push({
      title: taskDescription.split(" (")[0], // Extract title before the first '('
      startTime: convertTo24HourFormat(startTime.trim()),
      endTime: convertTo24HourFormat(endTime.trim()),
      description: taskDescription.trim(),
    });
  });

  return tasks;
}

// Helper function to convert 12-hour format to 24-hour format
function convertTo24HourFormat(timeStr) {
  const [time, modifier] = timeStr.split(" ");

  let [hours, minutes] = time.split(":").map(Number);

  if (modifier === "PM" && hours !== 12) {
    hours += 12;
  } else if (modifier === "AM" && hours === 12) {
    hours = 0;
  }

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
}
