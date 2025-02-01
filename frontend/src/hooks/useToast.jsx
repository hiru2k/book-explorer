import { toast } from "react-toastify";

const useToast = () => {
  const showToast = (
    message,
    type = "success",
    navigate = null,
    path = "",
    delay = 1000
  ) => {
    switch (type) {
      case "success":
        toast.success(message, { autoClose: delay });
        break;
      case "error":
        toast.error(message, { autoClose: delay });
        break;
      case "info":
        toast.info(message, { autoClose: delay });
        break;
      case "warning":
        toast.warning(message, { autoClose: delay });
        break;
      default:
        toast(message, { autoClose: delay });
    }

    // Navigate after the specified delay, if a navigation function and path are provided
    if (navigate && path) {
      setTimeout(() => {
        navigate(path);
      }, delay);
    }
  };

  return { showToast };
};

export default useToast;
