export function GetFormattedDate(date) {
    return date.toISOString().slice(0, 10);
  }
  export function GetDateAddDays(date, days) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
  }
  