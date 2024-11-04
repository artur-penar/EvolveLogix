// React related imports
import React, { useState } from "react";

// Redux related imports
import { useSelector } from "react-redux";
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

// Hook imports
import useEventsData from "./hooks/useEventsData";
import useAuthRedirect from "../../../../hooks/useAuthRedirect";
import useGetTrainingLogs from "./hooks/useGetTrainingLogs";
import useDeleteModalState from "./hooks/useDeleteModalState";
import useNavigateToAddTrainingSession from "./hooks/useNavigateToAddTrainingSession";
import useNavigateToEditTrainingSession from "./hooks/useNavigateToEditTrainingSession";
import useHandleDeleteTrainingSession from "./hooks/useHandleDeleteTrainingSession";

// Handler imports
import handleEventClick from "./handlers/handleEventClick";

// Styles
import "./TrainingLogDashboard.css";
import LoadingState from "components/shared/LoadingState";

const TrainingLogDashboardPage = () => {
  // Redux hooks
  const loading = useSelector((state) => state.log.loading);
  const trainingLogsData = useSelector((state) => state.log.trainingLogs);
  const isAuthenticated = useSelector(selectIsUserAuthenticated);
  const selectedTrainingLog = useSelector(
    (state) => state.log.selectedTrainingLog
  );

  // State hooks
  const [clickedEventData, setClickedEventData] = useState();
  const [isMainModalOpen, setIsMainModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState("");

  // Custom hooks
  useAuthRedirect(isAuthenticated);
  useGetTrainingLogs(trainingLogsData);
  useDeleteModalState(deleteMessage, setIsDeleteModalOpen);

  const eventsData = useEventsData(trainingLogsData, selectedTrainingLog);

  // Event handlers
  const handleModalAddClick = useNavigateToAddTrainingSession();
  const handleModalEditClick =
    useNavigateToEditTrainingSession(clickedEventData);
  const eventClick = (e) => {
    handleEventClick(e, setClickedEventData, setIsMainModalOpen);
  };

  const handleModalDeleteClick = useHandleDeleteTrainingSession(
    clickedEventData,
    setDeleteMessage,
    setIsMainModalOpen
  );

  return (
    <Layout title="EvolveLogix | Training Log">
      <div className="dashboard-content">
        <PageHeader headerContent={"Training Log"} />
        {loading || !trainingLogsData ? (
          <LoadingState />
        ) : (
          <div className="calendar-component">
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]} // include the interactionPlugin
              initialView="dayGridMonth"
              dateClick={handleModalAddClick}
              eventClick={eventClick}
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
