import { useMemo } from "react";
import { parseISO, startOfDay, isBefore } from "date-fns";

/**
 * Custom hook to process training logs data and return events data.
 *
 * @param {Array} trainingLogsData - Array of training logs data.
 * @param {Object} selectedTrainingLog - The selected training log object.
 * @param {string} selectedTrainingLog.name - The name of the selected training log.
 * @returns {Array} Array of event objects with title, date, color, and extendedProps.
 *
 * @example
 * const events = useEventsData(trainingLogsData, selectedTrainingLog);
 * // events = [
 * //   {
 * //     title: "Session 1",
 * //     date: "2023-10-01",
 * //     color: "green",
 * //     extendedProps: { ... }
 * //   },
 * //   ...
 * // ]
 */
const useEventsData = (trainingLogsData, selectedTrainingLog) => {
  return useMemo(() => {
    if (Array.isArray(trainingLogsData) && trainingLogsData.length > 0) {
      const selectedLogData = trainingLogsData.find(
        (log) => log.name === selectedTrainingLog.name
      );

      if (selectedLogData) {
        const today = startOfDay(new Date());

        return selectedLogData.training_sessions.map((session) => {
          const sessionDate = parseISO(session.date);

          let color;
          if (session.is_completed) {
            color = "green";
          } else if (isBefore(sessionDate, today)) {
            color = "red";
          } else {
            color = "grey";
          }

          return {
            title: session.description,
            date: session.date,
            color: color,
            extendedProps: {
              ...session,
            },
          };
        });
      }
    }
    return [];
  }, [trainingLogsData, selectedTrainingLog]);
};

export default useEventsData;