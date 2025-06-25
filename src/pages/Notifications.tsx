/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import {
  clearNotifications,
  removeNotification,
} from "../redux/notificationsSlice";
import type { RootState } from "../redux/store";
import type { Notification } from "../types";

function Notifications() {
  const dispatch = useDispatch();
  const notifications = useSelector(
    (state: RootState) => state.notifications.notifications
  );

  function handleRemoveNotification(note: Notification) {
    console.log(note);
    dispatch(removeNotification(note));
  }

  function handleRemoveAll() {
    dispatch(clearNotifications());
  }
  return (
    <>
      <div className="notifications-page">
        <h2>Notifications</h2>
        {notifications.map((note: Notification, idx: number) => (
          <div key={idx} className={`notification ${note.type}`}>
            <p>
              <strong>{note.type.toUpperCase()}:</strong> {note.message}
            </p>
            <small>{new Date(note.timestamp).toLocaleString()}</small>
            <button
              onClick={() => handleRemoveNotification(note)}
              className="btn-reject mt-3"
            >
              Remove
            </button>
          </div>
        ))}
        {notifications.length < 1 ? (
          ""
        ) : (
          <button onClick={handleRemoveAll} className="btn-reject">
            Remove ALL
          </button>
        )}
      </div>
    </>
  );
}

export default Notifications;
