/**
 * Handles the event click by logging the event's extended properties,
 * opening the main modal, and setting the clicked event data.
 *
 * @param {Object} e - The event object.
 * @param {Function} setClickedEventData - Function to set the clicked event data.
 * @param {Function} setIsMainModalOpen - Function to set the state of the main modal.
 */
const handleEventClick = (e, setClickedEventData, setIsMainModalOpen) => {
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

export default handleEventClick;
