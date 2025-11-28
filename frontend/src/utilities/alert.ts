import { toast } from "react-toastify";

export const alert = (message: string, type: "success" | "error" | "info" = "info") => {
  switch (type) {
    case "success":
      toast.success(message, { autoClose: 3000, theme: "colored" });
      break;
    case "error":
      toast.error(message, { autoClose: 3000, theme: "colored" });
      break;
    case "info":
    default:
      toast.info(message, { autoClose: 3000, theme: "colored" });
  }
};