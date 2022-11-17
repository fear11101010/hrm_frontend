import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const success_alert = (msg) => {
  toast.success(msg, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: "colored",
  });
};
export const error_alert = (msg) => {
  toast.error(msg, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: "colored",
  });
};
