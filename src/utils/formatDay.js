export function formatDay(value) {
  let formatDay = new Date(value).toLocaleString("en-GB").split(",");
  return formatDay[0];
}

export function formatDayAndTime(value) {
  let formatDay = new Date(value).toLocaleString("en-GB").split(",");
  return formatDay[0].concat(formatDay[1]);
}