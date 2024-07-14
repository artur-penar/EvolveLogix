import React, { useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

const SmallCalendarComponent = ({
  mesocycleStartDate,
  mesocycleEndDate,
  phasesData,
}) => {
  const calendarRef = useRef(null);

  // Map phases to events
  let endDate = null;
  // Work on that shit
  // Need to calculate remaining start date and end date if it occurred.
  const colorMapping = {
    remaining: "blue",
    Hypertrophy: "green",
    Strength: "yellow",
    Peak: "red",
  };

  const addDays = (dateString, numberOfDays) => {
    let date = new Date(dateString);
    date.setDate(date.getDate() + numberOfDays);
    return date.toISOString().split("T")[0];
  };

  // Last phase end date in the case when remaining phase occurred.
  let lastPhaseEndDate = null;

  const events = phasesData.map((phase) => {
    // Now if phase type is equal 'remaining' they has no start_date and end_date
    // Need to calculate them based on last phase end date
    // If last phase end date does not  exist, new phase start date will be mesocycle start date
    let startDate = null;
    let endDate = null;
    const color = colorMapping[phase.type];

    if (phase.type === "remaining") {
      // Check if lastPhaseEndDate exist, it mean phase before remaining exist
      startDate = lastPhaseEndDate ? lastPhaseEndDate : mesocycleStartDate;
      endDate = addDays(mesocycleEndDate, 1);
    } else {
      startDate = phase.start_date;
      endDate = addDays(phase.end_date, 1);
      lastPhaseEndDate = endDate;
    }
    return {
      title: phase.type,
      start: startDate,
      end: endDate,
      color: color,
    };
  });

  return (
    <FullCalendar
      ref={calendarRef}
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      initialDate={phasesData[0].start_date}
      headerToolbar={{
        left: "",
        center: "title",
        right: "prev,next",
      }}
      height="auto"
      events={events} // Pass the array of events
      eventContent={renderEventContent}
      firstDay={1}
    />
  );
};

// Custom render function for event content
function renderEventContent(eventInfo) {
  return (
    <div style={{ textAlign: "center", color: "black" }}>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </div>
  );
}

export default SmallCalendarComponent;
