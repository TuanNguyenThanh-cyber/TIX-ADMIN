export function formatDay(value) {
  let formatDay = new Date(value).toLocaleString("en-GB").split(",");
  return formatDay[0];
}
