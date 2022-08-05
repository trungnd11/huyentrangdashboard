import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Alert(status?: string, title?: string) {
  return (
    <div>
      {!status ? toast(title) : status === "success" ? toast.success(title) : status === "error" ? toast.error(title) : status === "info" && toast.info(title) }
    </div>
  );
}
