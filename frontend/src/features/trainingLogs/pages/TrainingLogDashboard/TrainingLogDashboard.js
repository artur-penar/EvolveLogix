// React related imports
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Redux related imports
import { useDispatch, useSelector } from "react-redux";
import { deleteTrainingSession } from "features/trainingLogs/log";
import { selectIsUserAuthenticated } from "features/users/user";

// Component imports
import Layout from "components/shared/Layout";
import PageHeader from "components/shared/PageHeader";
import FullCalendar from "@fullcalendar/react";
import TrainingLogDashboardModal from "./Modals/TrainingLogDashboardModal";
import DeleteInfoModal from "./Modals/DeleteInfoModal";

// Plugin imports
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

// Styles
import "./TrainingLogDashboard.css";
import useEventsData from "./hooks/useEventsData";
import useAuthRedirect from "../../../../hooks/useAuthRedirect";
import useGetTrainingLogs from "./hooks/useGetTrainingLogs";
import useDeleteModalState from "./hooks/useDeleteModalState";
import useNavigateToAddTrainingSession from "./hooks/useNavigateToAddTrainingSession";

const TrainingLogDashboardPage = () => {
  // Redux hooks
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.log.loading);
  const trainingLogsData = useSelector((state) => state.log.trainingLogs);
  const isAuthenticated = useSelector(selectIsUserAuthenticated);
  const selectedTrainingLog = useSelector(
    (state) => state.log.selectedTrainingLog
  );

  // Navigation hooks
  const navigate = useNavigate();

  // State hooks
  // const [eventsData, setEventsData] = useState();
  const [clickedEventData, setClickedEventData] = useState();
  const [isMainModalOpen, setIsMainModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState("");

  useAuthRedirect(isAuthenticated);
  useGetTrainingLogs(trainingLogsData);
  useDeleteModalState(deleteMessage, setIsDeleteModalOpen);

  const eventsData = useEventsData(trainingLogsData, selectedTrainingLog);

  const navigateToAddTrainingSession = useNavigateToAddTrainingSession();

  const handleEventClick = (e) => {
    setIsMainModalOpen(true);
    const { id, description, date, comment, exercises, is_completed } =
      e.event.extendedProps;
    setClickedEventData({
      id,
      description,
      date,
      comment,
      exercises,
      is_completed,
    });
  };

  const handleModalEditClick = () => {
    const { id } = clickedEventData;
    const trainingData = clickedEventData;

    navigate(`/edit-training-session/${id}`, { state: { trainingData } });
  };

  const handleModalDeleteClick = async () => {
    const trainingSessionIdToDelete = clickedEventData.id;
    try {
      const resultAction = await dispatch(
        deleteTrainingSession(trainingSessionIdToDelete)
      );

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
      setDeleteMessage("Info from catch(err)\n" + err.message);
    }
    setIsMainModalOpen(false);
  };

  return (
    <Layout title="EvolveLogix | Training Log">
      <div className="dashboard-content">
        <PageHeader headerContent={"Training Log"} />
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
          <div className="calendar-component">
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]} // include the interactionPlugin
              initialView="dayGridMonth"
              dateClick={navigateToAddTrainingSession}
              eventClick={handleEventClick}
              firstDay={1}
              events={eventsData}
            />
            <TrainingLogDashboardModal
              isOpen={isMainModalOpen}
              handleEdit={handleModalEditClick}
              handleDelete={handleModalDeleteClick}
              trainingSessionData={clickedEventData}
              setMainModalIsOpen={setIsMainModalOpen}
            />
            <DeleteInfoModal
              isOpen={isDeleteModalOpen}
              deleteMessage={deleteMessage}
              setDeleteMessage={setDeleteMessage}
            />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default TrainingLogDashboardPage;
