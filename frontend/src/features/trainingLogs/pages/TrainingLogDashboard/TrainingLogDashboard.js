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
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const isAuthenticated = useSelector(selectIsUserAuthenticated);

  useEffect(() => {
    dispatch(getTrainingLog());
    console.log("First useEffect eventsData");
    console.log(eventsData);
  }, []);

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
    setModalIsOpen(true);
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

  const handleModalDeleteClick = async (id) => {
    try {
      const resultAction = await dispatch(deleteTrainingSession(id));
      if (deleteTrainingSession.fulfilled.match(resultAction)) {
        window.alert(`The id ${id} training session has been deleted`);
        setModalIsOpen(false);
      } else {
        if (resultAction.payload) {
          window.alert(resultAction.payload.error);
        } else {
          window.alert("Something went wrong");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
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
            isOpen={modalIsOpen}
            handleEdit={handleModalEditClick}
            handleDelete={handleModalDeleteClick}
            trainingSessionData={clickedEventData}
            closeModal={closeModal}
          />
        </div>
      )}
    </Layout>
  );
};

export default TrainingLogDashboardPage;
