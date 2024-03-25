import { useWindowListener } from "@/hooks/useWindowListener";
import React from "react";

function ConfirmLogout({
  show,
  onCancel,
  onConfirm,
}: {
  show: boolean;
  onCancel: Function;
  onConfirm: Function;
}) {
  if (!show) return null;
  useWindowListener("scroll", (e) => {
    e.stopPropagation();
    e.preventDefault();
  });
  useWindowListener("contextmenu", (e) => {
    e.stopPropagation();
    e.preventDefault();
  });
  return (
    <div className="absolute flex justify-center items-center w-[300px] h-[200px] bg-white shadow-2xl rounded-lg top-[50vh] left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="text-center">
        <p>Are you sure you want to logout?</p>
        <div className="mt-8 flex justify-between">
          <button
            className="bg-rose-900  hover:bg-rose-600 text-white font-bold py-2 ml-3 px-4 rounded w-24"
            onClick={() => onCancel()}
          >
            Cancel
          </button>
          <button
            className="bg-teal-900 hover:bg-green-600 text-white font-bold py-2 mr-3 px-4 rounded w-24"
            onClick={() => onConfirm()}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmLogout;
