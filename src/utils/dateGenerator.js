const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const dateGenerator = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const monthName = MONTH_NAMES[date.getMonth()];
  const day = date.getDate();

  return `${day} ${monthName} ${year}`;
};
