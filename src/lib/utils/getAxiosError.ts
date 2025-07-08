import axios from "axios";

export const getAxiosError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      return error.response.data.message;
    } else if (error.request) {
      return "No response from server";
    } else {
      return error.message;
    }
  } else {
    return "An unknown error occurred";
  }
};
