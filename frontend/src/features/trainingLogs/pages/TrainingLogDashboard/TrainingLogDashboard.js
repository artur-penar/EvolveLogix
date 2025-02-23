// React related imports
import React, { useCallback, useState } from "react";

// Redux related imports
import { useSelector } from "react-redux";

// Component imports
import Layout from "shared/components/Layout";
import PageHeader from "shared/components/PageHeader";
import FullCalendar from "@fullcalendar/react";
import TrainingLogDashboardModal from "./Modals/TrainingLogDashboardModal";
import DeleteInfoModal from "./Modals/DeleteInfoModal";

// Plugin imports
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

// Hook imports
import useEventsData from "../../hooks/TrainingLogDashboard/useEventsData";
import useGetTrainingLogs from "../../hooks/TrainingLogDashboard/useGetTrainingLogs";
import useDeleteModalState from "../../hooks/TrainingLogDashboard/useDeleteModalState";
import useNavigateToAddTrainingSession from "../../hooks/TrainingLogDashboard/useNavigateToAddTrainingSession";
import useNavigateToEditTrainingSession from "../../hooks/TrainingLogDashboard/useNavigateToEditTrainingSession";
import useHandleDeleteTrainingSession from "../../hooks/TrainingLogDashboard/useHandleDeleteTrainingSession";

// Handler imports
import handleEventClick from "../../handlers/handleEventClick";

// Styles
import "./TrainingLogDashboard.css";
import LoadingState from "shared/components/LoadingState";
import useAuth from "shared/hooks/useAuth";

const TrainingLogDashboardPage = () => {
  // Redux hooks
  const {
    loading,
    selectedTrainingLog,
    trainingLogs: trainingLogsData,
  } = useSelector((state) => state.log);

  // State hooks
  const [clickedEventData, setClickedEventData] = useState();
  const [isMainModalOpen, setIsMainModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState("");

  // Custom hooks
  useAuth();
  useGetTrainingLogs(trainingLogsData);
  useDeleteModalState(deleteMessage, setIsDeleteModalOpen);

  const eventsData = useEventsData(trainingLogsData, selectedTrainingLog);

  // Event handlers
  const handleModalAddClick = useNavigateToAddTrainingSession();
  const handleModalEditClick =
    useNavigateToEditTrainingSession(clickedEventData);
  const eventClick = useCallback((e) => {
    handleEventClick(e, setClickedEventData, setIsMainModalOpen);
  }, []);

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
          <div className="calendar-component bg-containers">
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
