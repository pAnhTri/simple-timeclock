import axios from "axios";

export const getTimeLog = async () => {
  try {
    const { data } = await axios.get("/api/timelog");

    return data.timeLogs;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `API Error: ${error.response?.status || "Unknown Status"}; Message: ${
          error.response?.data.error.message || "Unknown Error"
        }`
      );
    }
    throw new Error("Unknown Error");
  }
};
