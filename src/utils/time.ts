const formatDateTime = (dateStr, utcOffsetHours = 0) => {
  const date = new Date(dateStr);
  const adjustedDate = new Date(
    date.getTime() + utcOffsetHours * 60 * 60 * 1000
  );
  const formattedDate = adjustedDate
    .toISOString()
    .replace('T', ' ')
    .slice(0, 19);
  const [dateLocal, hour] = formattedDate.split(' ');
  const [year, month, day] = dateLocal.split('-');
  return `${day}-${month}-${year} ${hour}`;
};

export { formatDateTime };
