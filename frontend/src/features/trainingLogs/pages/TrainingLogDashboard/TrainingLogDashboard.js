import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Layout from "components/shared/Layout";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  deleteTrainingSession,
  getTrainingLogs,
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
    dispatch(getTrainingLogs());
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
    const { id } = clickedEventData;
    const  trainingData  = clickedEventData;

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

  console.log("Training log data!!!!!");
  console.log(trainingLogsData);

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
            deleteMessage={deleteMessage}
            setMainModalIsOpen={setMainModalIsOpen}
            setRefreshKey={setRefreshKey}
          />
        </div>
      )}
    </Layout>
  );
};

export default TrainingLogDashboardPage;
