export const calculateEventHeight = (start, end) => {
  const startTime = new Date(start);
  const endTime = new Date(end);
  const diffMinutes = (endTime - startTime) / 1000 / 60;
  return Math.max((diffMinutes / 60) * 50, 40); // Minimum height for short tasks
};
