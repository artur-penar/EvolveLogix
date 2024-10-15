import { startOfWeek, endOfWeek, addWeeks, startOfYear, format } from "date-fns";

function getWeekStartAndEndDates(year, weekNumber) {
  // Get the start of the year
  const startOfYearDate = startOfYear(new Date(year, 0, 1));

  // Calculate the start date of the given week
  const startDate = addWeeks(startOfYearDate, weekNumber - 1);

  // Get the start and end dates of the week
  const startOfWeekDate = startOfWeek(startDate, { weekStartsOn: 1 }); // weekStartsOn: 1 means Monday
  const endOfWeekDate = endOfWeek(startDate, { weekStartsOn: 1 });

  // Format the dates to dd-MM-yyyy
  const formattedStartOfWeek = format(startOfWeekDate, "dd-MM-yyyy");
  const formattedEndOfWeek = format(endOfWeekDate, "dd-MM-yyyy");

  return {
    startOfWeek: formattedStartOfWeek,
    endOfWeek: formattedEndOfWeek,
  };
}

export default getWeekStartAndEndDates;
