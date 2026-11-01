export const displayDate = (commentDate: string) => {
  const currentDate = Date.now();
  const difference = currentDate - Number(commentDate);

  const minutes = difference / 1000 / 60;
  const hours = minutes / 60;
  const days = hours / 24;

  if (minutes <= 1) return "1 минуту назад";
  if (minutes <= 5) return "5 минут назад";
  if (minutes <= 10) return "10 минут назад";
  if (minutes <= 30) return "30 минут назад";

  const publishedDate = new Date(Number(commentDate));

  if (hours < 24) {
    const publishedHours = publishedDate.getHours().toString().padStart(2, "0");
    const publishedMinutes = publishedDate.getMinutes().toString().padStart(2, "0");
    return `${publishedHours}:${publishedMinutes}`;
  }

  const publishedDay = publishedDate.getDate().toString().padStart(2, "0");
  const publishedMonth = (publishedDate.getMonth() + 1).toString().padStart(2, "0");
  const publishedYear = publishedDate.getFullYear().toString();

  if (days < 365) {
    return publishedDay + "." + publishedMonth;
  }

  return publishedDay + "." + publishedMonth + "." + publishedYear;
};
