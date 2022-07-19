export default function formattedDate() {
  const d = new Date();
  const year = d.getFullYear(); // 2022
  const date = d.getDate(); // 23
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthName = months[d.getMonth()];
  const dayName = days[d.getDay()];
  const formattedDate = `${dayName}, ${date} ${monthName} ${year}`;
  return formattedDate;
}
