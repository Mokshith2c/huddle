import React, { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const Snackbar = ({ time = 4000 }) => {
    const { open, setOpen, message, toastDuration, toastType = "success" } = useContext(AuthContext);

  useEffect(() => {
    if (open) {
      const duration = toastDuration || time;
      const timer = setTimeout(() => {
        setOpen(false);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [open, setOpen, toastDuration, time]);

  if (!open) return null;

  const handleClose = () => {
    setOpen(false);
  };

  const bgColor = toastType === "error" ? "bg-red-600" : "bg-gray-900";
  const borderColor = toastType === "error" ? "border-l-4 border-red-400" : "";

  return (
    <div className={`fixed bottom-6 left-4 z-50 ${bgColor} text-white px-6 py-3 rounded shadow-lg flex items-center gap-6 ${borderColor}`}>
      <p>{message}</p>
      <button
        onClick={handleClose}
        className="px-2 py-1 bg-gray-700 rounded hover:bg-gray-600 "
      >
        
        <i className="fa-solid fa-circle-xmark"></i>
      </button>
    </div>
  );
};

export default Snackbar;