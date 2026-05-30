import React from "react";
import { Modal, Button } from "./ui";

/**
 * Lightweight message dialog.
 * Kept API-compatible with previous callers:
 *   message, showActionButton, actionButtonText, onClose, onAction, title
 */
const Popup = ({
  message,
  showActionButton = false,
  actionButtonText = "Continue",
  onClose,
  onAction,
  title = "Notice",
}) => {
  return (
    <Modal open onClose={onClose} title={title}>
      <p className="text-muted">{message}</p>
      <div className="mt-6 flex justify-end gap-3">
        {showActionButton && (
          <Button onClick={onAction}>{actionButtonText}</Button>
        )}
        <Button variant={showActionButton ? "outline" : "primary"} onClick={onClose}>
          OK
        </Button>
      </div>
    </Modal>
  );
};

export default Popup;
