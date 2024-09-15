export const getLatestRecords = (records) => {
    return records.reduce((latest, record) => {
      if (
        !latest[record.exercise] ||
        record.record_date > latest[record.exercise][0].record_date
      ) {
        latest[record.exercise] = [];
        latest[record.exercise].push(record);
      }
      return latest;
    }, {});
  };