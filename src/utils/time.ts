const formatDateTime = (dateStr: string) => {
  const date = new Date(dateStr);
  const formatDate = date.toISOString().replace('T', ' ').slice(0, 19);
  const [dateLocal, hour] = formatDate.split(' ');
  const [year, month, day] = dateLocal.split('-');
  return `${day}-${month}-${year} ${hour}`;
};
export { formatDateTime };
