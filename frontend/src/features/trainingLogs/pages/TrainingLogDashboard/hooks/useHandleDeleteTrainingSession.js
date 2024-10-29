import { useDispatch } from "react-redux";
import { deleteTrainingSession } from "features/trainingLogs/log";

/**
 * Custom hook to handle the deletion of a training session.
 *
 * @param {Object} clickedEventData - The data of the clicked event.
 * @param {Function} setDeleteMessage - Function to set the delete message.
 * @param {Function} setIsMainModalOpen - Function to set the state of the main modal.
 * @returns {Function} - Function to handle the delete click event.
 */

const useHandleDeleteTrainingSession = (
  clickedEventData,
  setDeleteMessage,
  setIsMainModalOpen
) => {
  const dispatch = useDispatch();
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
  return handleModalDeleteClick;
};

export default useHandleDeleteTrainingSession;
