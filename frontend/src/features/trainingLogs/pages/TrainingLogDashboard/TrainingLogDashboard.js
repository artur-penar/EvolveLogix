import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Layout from "components/shared/Layout";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  deleteTrainingSession,
  getTrainingLog,
} from "features/trainingLogs/log";
import TrainingLogDashboardModal from "./TrainingLogDashboardModal";
import { selectIsUserAuthenticated } from "features/users/user";
import "./TrainingLogDashboard.css";

const TrainingLogDashboardPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const trainingLogsData = useSelector((state) => state.log.trainingLogs);
  const loading = useSelector((state) => state.log.loading);
  const [eventsData, setEventsData] = useState();
  const [clickedEventData, setClickedEventData] = useState();
  const [mainModalIsOpen, setMainModalIsOpen] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState("");
  const [refreshKey, setRefreshKey] = useState(0); // reset key to force rerender on modal close
  const isAuthenticated = useSelector(selectIsUserAuthenticated);

  useEffect(() => {
    dispatch(getTrainingLog());
    console.log("First useEffect eventsData");
    console.log(eventsData);
  }, [refreshKey]);

  useEffect(() => {
    if (Array.isArray(trainingLogsData) && trainingLogsData.length > 0) {
      setEventsData(
        trainingLogsData.flatMap((logData) =>
          logData.training_sessions.map((session) => ({
            title: session.comment,
            date: session.date,
            color: "green",
            extendedProps: {
              ...session,
            },
          }))
        )
      );
    }
    console.log("Second useEffect eventsData");
    console.log(eventsData);
  }, [trainingLogsData]);

  const handleDateClick = (date) => {
    alert("Clicked on: " + date.dateStr);
    navigate("/add-log", { state: { selectedDate: date.dateStr } });
  };

  const handleEventClick = (e) => {
    setMainModalIsOpen(true);
    const { id, date, comment, exercises } = e.event.extendedProps;
    console.log("Data from handleEventClick");
    console.log({ id, date, comment, exercises });
    setClickedEventData({ id, date, comment, exercises });
  };

  const handleModalEditClick = () => {
    console.log(clickedEventData);
    const trainingData = clickedEventData;

    navigate("/add-log", { state: { trainingData } });
  };

  const handleModalDeleteClick = async () => {
    console.log("ID TO DLETE: " + clickedEventData.id);
    const trainingSessionIdToDelete = clickedEventData.id;
    try {
      const resultAction = await dispatch(
        deleteTrainingSession(trainingSessionIdToDelete)
      );
      if (deleteTrainingSession.fulfilled.match(resultAction)) {
        setDeleteMessage(
          `The id ${trainingSessionIdToDelete}training session has been deleted`
        );
        setMainModalIsOpen(false);
        setRefreshKey((oldKey) => oldKey + 1);
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
  };

  const closeModal = () => {
    setMainModalIsOpen(false);
  };

  if (!isAuthenticated) return <Navigate to="/login" />;

  return (
    <Layout title="PerformanceTracker| Training Log">
      <h1>Training Log Dashboard</h1>
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
            closeModal={closeModal}
            deleteMessage={deleteMessage}
            setMainModalIsOpen={setMainModalIsOpen}
          />
        </div>
      )}
    </Layout>
  );
};

export default TrainingLogDashboardPage;
