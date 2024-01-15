// React related imports
import React, { useEffect, useMemo, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

// Redux related imports
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTrainingSession,
  getTrainingLogs,
} from "features/trainingLogs/log";
import { selectIsUserAuthenticated } from "features/users/user";
import { getExercises } from "features/trainingLogs/exercises";

// Component imports
import Layout from "components/shared/Layout";
import FullCalendar from "@fullcalendar/react";
import TrainingLogDashboardModal from "./TrainingLogDashboardModal";
import DeleteInfoModal from "./DeleteInfoModal";

// Plugin imports
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

// Styles
import "./TrainingLogDashboard.css";

const TrainingLogDashboardPage = () => {
  // Redux hooks
  const dispatch = useDispatch();
  const trainingLogsData = useSelector((state) => state.log.trainingLogs);
  const loading = useSelector((state) => state.log.loading);
  const selectedTrainingLog = useSelector(
    (state) => state.log.selectedTrainingLog
  );
  const isAuthenticated = useSelector(selectIsUserAuthenticated);

  // Navigation hooks
  const navigate = useNavigate();

  // State hooks
  // const [eventsData, setEventsData] = useState();
  const [clickedEventData, setClickedEventData] = useState();
  const [mainModalIsOpen, setMainModalIsOpen] = useState(false);
  const [deleteInfoModalIsOpen, setDeleteInfoModalIsOpen] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }

    if (deleteMessage !== "") {
      setDeleteInfoModalIsOpen(true);
    } else {
      setDeleteInfoModalIsOpen(false);
    }

    if (!trainingLogsData) {
      dispatch(getTrainingLogs());
      console.log("Training logs data is null, dispatching getTrainingLogs()");
    }
    console.log("Training logs data is not null, dispatching getExercises()");
    dispatch(getExercises());
  }, [selectedTrainingLog, deleteMessage]);

  const eventsData = useMemo(() => {
    if (Array.isArray(trainingLogsData) && trainingLogsData.length > 0) {
      const selectedLogData = trainingLogsData.find(
        (log) => log.name === selectedTrainingLog.name
      );
      if (selectedLogData) {
        return selectedLogData.training_sessions.map((session) => ({
          title: session.comment,
          date: session.date,
          color: session.is_completed ? "green" : "grey",
          extendedProps: {
            ...session,
          },
        }));
      }
    }
  }, [trainingLogsData, selectedTrainingLog]);

  const handleDateClick = (date) => {
    alert("Clicked on: " + date.dateStr);
    navigate("/add-log", { state: { selectedDate: date.dateStr } });
  };

  const handleEventClick = (e) => {
    setMainModalIsOpen(true);
    const { id, date, comment, exercises, is_completed } =
      e.event.extendedProps;
    console.log("Data from handleEventClick");
    console.log(e.event.extendedProps);
    console.log({ id, date, comment, exercises, is_completed });
    setClickedEventData({ id, date, comment, exercises, is_completed });
  };

  const handleModalEditClick = () => {
    console.log(clickedEventData);
    const { id } = clickedEventData;
    const trainingData = clickedEventData;

    navigate(`/edit-training-session/${id}`, { state: { trainingData } });
  };

  const handleModalDeleteClick = async () => {
    console.log("ID TO DLETE: " + clickedEventData.id);
    console.log("Delete item comment: " + clickedEventData.comment);
    console.log("Delete item date: " + clickedEventData.date);
    const trainingSessionIdToDelete = clickedEventData.id;
    try {
      const resultAction = await dispatch(
        deleteTrainingSession(trainingSessionIdToDelete)
      );
      console.log("Delete Result action");
      console.log(resultAction.payload);

      if (deleteTrainingSession.fulfilled.match(resultAction)) {
        setDeleteMessage(
          `${clickedEventData.comment} on ${clickedEventData.date} was deleted`
        );
      } else {
        if (resultAction.payload) {
          setDeleteMessage(
            "Info from payload.message\n" + resultAction.payload.error
          );
        } else {
          setDeleteMessage(
            "Info from resultAction.error.message\n" +
              resultAction.error.message
          );
        }
      }
    } catch (err) {
      console.log(err);
      setDeleteMessage("Info from catch(err)\n" + err.message);
    }
    console.log(deleteMessage);
    setMainModalIsOpen(false);
  };

  console.log("TrainingLogDashboardPage");
  console.log(trainingLogsData);

  if (!isAuthenticated) return <Navigate to="/login" />;

  return (
    <Layout title="PerformanceTracker| Training Log">
      {/* <h1>Training Log Dashboard</h1> */}
      <h1 className="log-name">Current log: {selectedTrainingLog.name}</h1>
      {loading || !trainingLogsData ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div className="spinner-border" role="status">
            <span className="sr-only"></span>
          </div>
          <h2>Loading...</h2>
        </div>
      ) : (
        <div style={{ width: "800px", height: "600px" }}>
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]} // include the interactionPlugin
            initialView="dayGridMonth"
            dateClick={handleDateClick}
            eventClick={handleEventClick}
            firstDay={1}
            events={eventsData}
          />
          <TrainingLogDashboardModal
            isOpen={mainModalIsOpen}
            handleEdit={handleModalEditClick}
            handleDelete={handleModalDeleteClick}
            trainingSessionData={clickedEventData}
            setMainModalIsOpen={setMainModalIsOpen}
          />
          <DeleteInfoModal
            isOpen={deleteInfoModalIsOpen}
            deleteMessage={deleteMessage}
            setDeleteMessage={setDeleteMessage}
          />
        </div>
      )}
    </Layout>
  );
};

export default TrainingLogDashboardPage;
