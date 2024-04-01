export const getFormattedTime = (time) => {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const date = new Date(time.seconds * 1000 + time.nanoseconds / 1000000);

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const monthIndex = date.getMonth();
  const month = months[monthIndex];

  return `${hours}:${minutes}, ${day} ${month}`;
};
