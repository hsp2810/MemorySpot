export const convertToDate = datetime => {
  const date = new Date(datetime);

  //   date.getDate(); //Day of the month
  //   date.getFullYear(); //Year
  //   date.getMonth(); //month
  //   return { day: date.getDay(), year: date.getFullYear(), date: date.getDate() };
  return `Posted on: ${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()}`;
};
