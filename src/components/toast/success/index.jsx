import { useState } from "react";

const ToastSuccess = ({ text, handleLeave }) => {
  const [show, setShow] = useState(true);

  setTimeout(() => {
    setShow(false);
    handleLeave();
  }, 2000);

  return (
    show && (
      <div className="toast toast-top toast-end">
        <div className="alert alert-success">
          <span>{text}</span>
        </div>
      </div>
    )
  );
};

export default ToastSuccess;
