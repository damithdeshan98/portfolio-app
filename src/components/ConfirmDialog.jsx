import { useEffect, useRef } from "react";

// Styled replacement for window.confirm. Rendered by ConfirmProvider.
export default function ConfirmDialog({
  title = "Are you sure?",
  message,
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  tone = "danger", // "danger" | "primary"
  onConfirm,
  onCancel,
}) {
  const confirmRef = useRef(null);

  useEffect(() => {
    confirmRef.current?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") onCancel();
      if (e.key === "Enter") onConfirm();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onConfirm, onCancel]);

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div
        className="modal-card"
        role="alertdialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`modal-icon ${tone}`}>
          <i className={tone === "danger" ? "fas fa-triangle-exclamation" : "fas fa-circle-question"} />
        </div>
        <div className="modal-title">{title}</div>
        {message && <p className="modal-message">{message}</p>}
        <div className="modal-actions">
          <button type="button" className="btn-ghost" onClick={onCancel}>{cancelLabel}</button>
          <button
            ref={confirmRef}
            type="button"
            className={tone === "danger" ? "btn-danger" : "btn-primary btn-sm"}
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
