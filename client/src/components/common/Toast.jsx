
import React from "react";
import "./Toast.css";

export default function Toast({ message, type = "info", onClose, action, onAction }) {
  React.useEffect(() => {
    if (!action) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [onClose, action]);

  return (
    <div className={`toast toast-${type}`}>
      <div className="toast-icon">
        {type === "success" && (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        )}
        {type === "error" && (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="15" y1="9" x2="9" y2="15"/>
            <line x1="9" y1="9" x2="15" y2="15"/>
          </svg>
        )}
        {type === "warning" && (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
        )}
        {type === "confirm" && (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
        )}
      </div>

      <div className="toast-content">
        <p className="toast-message">{message}</p>
        {action && (
          <div className="toast-actions">
            <button className="toast-btn toast-cancel" onClick={onClose}>
              Cancel
            </button>
            <button className="toast-btn toast-confirm" onClick={onAction}>
              {action}
            </button>
          </div>
        )}
      </div>

      {!action && (
        <button className="toast-close" onClick={onClose}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      )}
    </div>
  );
}

// Toast Container Component
export function ToastContainer({ toasts, removeToast }) {
  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          action={toast.action}
          onClose={() => removeToast(toast.id)}
          onAction={() => {
            toast.onAction?.();
            removeToast(toast.id);
          }}
        />
      ))}
    </div>
  );
}

// Custom Hook for Toast
export function useToast() {
  const [toasts, setToasts] = React.useState([]);

  const addToast = React.useCallback((message, type = "info", options = {}) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type, ...options }]);
    return id;
  }, []);

  const removeToast = React.useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const confirm = React.useCallback((message, onConfirm) => {
    addToast(message, "confirm", {
      action: "Confirm",
      onAction: onConfirm,
    });
  }, [addToast]);

  return {
    toasts,
    addToast,
    removeToast,
    confirm,
    success: (msg) => addToast(msg, "success"),
    error: (msg) => addToast(msg, "error"),
    warning: (msg) => addToast(msg, "warning"),
  };
}












