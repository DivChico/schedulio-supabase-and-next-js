export default function formatDateTime(originalDateTime) {
  const date = new Date(originalDateTime);

  // Extract date-time components
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  // Format the date-time string
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}
