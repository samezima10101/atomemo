export const getWeekDays = (baseDate = new Date()) => {
  const days = ["日", "月", "火", "水", "木", "金", "土"];

  const currentDay = baseDate.getDay();
  const diffToMonday = currentDay === 0 ? -6 : 1 - currentDay;

  const startDate = new Date(baseDate);
  startDate.setDate(baseDate.getDate() + diffToMonday);

  return Array.from({ length: 7 }).map((_, index) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + index);

    const fullDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

    return {
      date: date.getDate().toString(),
      content: days[date.getDay()],
      fullDate: fullDate,
      isToday: date.toDateString() === new Date().toDateString(),
    };
  });
};
