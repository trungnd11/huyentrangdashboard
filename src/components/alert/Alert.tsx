import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

export default function Alert(status: string, title: string) {
  return (
    <div>
      {!status
        ? toast(title)
        : status === "success"
        ? toast.success(title)
        : status === "error"
        ? toast.error(title)
        : status === "info" && toast.info(title)}
    </div>
  );
}

export const SweetAlertComfirm = (
  alertMessage?: string,
  message?: string,
  callback?: Function,
  callbackCancel?: Function
) => {
  Swal.fire({
    title: alertMessage,
    text: message,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Xoá ngay",
    cancelButtonText: "Không xoá",
  }).then((result) => {
    if (result.isConfirmed) {
      callback && callback();
    } else if (result.isDismissed) {
      callbackCancel && callbackCancel();
    }
  });
};
