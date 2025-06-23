import { toast } from "sonner";

export const useToast = () => {
  const showErrorToast = (error: any) => {
    let msg = "Unknown error";
    if (typeof error === "string") {
      msg = error;
    } else if (error.message) {
      msg = error.message;
    }

    let description: string | undefined;
    if (error.code) {
      description = error.code;
      if (error.status) {
        description = `${description} (status code ${error.status})`;
      }
    } else if (error.status) {
      description = `Status code ${error.status}`;
    }

    toast.error(msg, { description });
  };

  return { showErrorToast };
};
