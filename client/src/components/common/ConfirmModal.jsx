import "./ConfirmModal.css"

export default function ConfirmModal({
  title,
  message,
  onConfirm,
  onCancel
}) {
  return (
    <div className="confirm-overlay">

      <div className="confirm-modal">

        <h3 className="confirm-title">{title}</h3>

        <p className="confirm-message">{message}</p>

        <div className="confirm-actions">

          <button
            className="confirm-cancel"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            className="confirm-delete"
            onClick={onConfirm}
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  )
}