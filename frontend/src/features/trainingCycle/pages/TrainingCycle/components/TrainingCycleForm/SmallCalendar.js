import React, { useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import PropTypes from "prop-types";

const calculateTotalPhasesDuration = (phasesData) => {
  return phasesData.reduce((total, phase) => total + phase.duration, 0);
};

const calculateRemainingDuration = (mesocycleDuration, phasesData) => {
  const existingDuration = calculateTotalPhasesDuration(phasesData);
  return mesocycleDuration - existingDuration;
};

const addDays = (dateString, numberOfDays) => {
  let date = new Date(dateString);
  date.setDate(date.getDate() + numberOfDays);
  return date.toISOString().split("T")[0];
};

const addRemainingPhase = (remainingDuration, phasesData) => {
  return [...phasesData, { type: "remaining", duration: remainingDuration }];
};

const colorMapping = {
  remaining: "blue",
  Hypertrophy: "green",
  Strength: "yellow",
  Peak: "red",
};

const getPhaseDates = (
  phase,
  mesocycleStartDate,
  mesocycleEndDate,
  lastPhaseEndDate
) => {
  let startDate = null;
  let endDate = null;
  if (phase.type === "remaining") {
    startDate = lastPhaseEndDate ? lastPhaseEndDate : mesocycleStartDate;
    endDate = addDays(mesocycleEndDate, 1);
  } else {
    startDate = phase.start_date;
    endDate = addDays(phase.end_date, 1);
  }
  return { startDate, endDate };
};

const renderEventContent = (eventInfo) => {
  return (
    <div style={{ textAlign: "center", color: "black" }}>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </div>
  );
};

const SmallCalendarComponent = ({
  mesocycleStartDate,
  mesocycleEndDate,
  mesocycleDuration,
  phasesData,
}) => {
  const calendarRef = useRef(null);

  const remainingDuration = calculateRemainingDuration(
    mesocycleDuration,
    phasesData
  );

  if (remainingDuration > 0) {
    phasesData = addRemainingPhase(remainingDuration, phasesData);
  }

  let lastPhaseEndDate = null;

  const events = phasesData.map((phase) => {
    const { startDate, endDate } = getPhaseDates(
      phase,
      mesocycleStartDate,
      mesocycleEndDate,
      lastPhaseEndDate
    );
    const color = colorMapping[phase.type];
    if (phase.type !== "remaining") {
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
    <div>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        initialDate={phasesData[0].start_date}
        headerToolbar={{
          right: "prev,next",
        }}
        height="auto"
        events={events}
        eventContent={renderEventContent}
        firstDay={1}
      />
    </div>
  );
};

SmallCalendarComponent.propTypes = {
  mesocycleStartDate: PropTypes.string.isRequired,
  mesocycleEndDate: PropTypes.string.isRequired,
  mesocycleDuration: PropTypes.number.isRequired,
  phasesData: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      duration: PropTypes.number.isRequired,
      start_date: PropTypes.string,
      end_date: PropTypes.string,
    })
  ),
};

export default SmallCalendarComponent;
