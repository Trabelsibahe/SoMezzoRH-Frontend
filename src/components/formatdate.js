
export default function formatDate(dateString) {
  const dateObj = new Date(dateString);
  const day = dateObj.getDate();
  const month = dateObj.getMonth() + 1; // Adding 1 to the month as it is zero-indexed
  const year = dateObj.getFullYear();

  // Formatting the day, month, and year as strings with leading zeros if needed
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedYear = year.toString();

  // Combining the formatted day, month, and year with dashes as the separator
  return `${formattedYear}-${formattedMonth}-${formattedDay}`;

  
}
