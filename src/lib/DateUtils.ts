export function getDaysInMonth(year: number, month: number): number[] {
  const daysInMonth = new Date(year, month, 0).getDate();
  const daysArray: number[] = [];

  for (let day = 1; day <= daysInMonth; day++) {
    daysArray.push(day);
  }

  return daysArray;
}

export function filterDatesByMonth(dates: Date[], desiredMonth: number): Date[] {
  return dates.filter((date) => date.getMonth() + 1 === desiredMonth);
}

export function getMonthsInYear(dateArray: Date[], year: number): number[] {
  const monthsInYear: number[] = [];

  for (const date of dateArray) {
    if (date.getFullYear() === year && !monthsInYear.includes(date.getMonth())) {
      monthsInYear.push(date.getMonth());
    }
  }

  return monthsInYear;
}

export function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear());

  return `${day}/${month}/${year}`;
}

export const monthAbbreviation: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const daysOfWeek: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function compareDate(date1: Date, date2: Date): boolean {
  return date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear();
}

export function isDateInRange(date: Date, startDate: Date, endDate: Date): boolean {
  return date >= startDate && date <= endDate;
}

export function getNext7Days(date: Date): Date {
  date.setDate(date.getDate() + 7);
  return date;
}

export function getSundayOfCurrentWeek(): Date {
  const today = new Date();
  const currentDayOfWeek = today.getDay();
  const sundayOffset = (currentDayOfWeek + 7 - 0) % 7;
  const sunday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - sundayOffset);
  return sunday;
}
export function getSundayOfThisWeek(displayDate:string):Date{
  const today = new Date(displayDate);
  const currentDayOfWeek = today.getDay();
  const sundayOffset = (currentDayOfWeek + 7 - 0) % 7;
  const sunday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - sundayOffset);
  return sunday;
}
