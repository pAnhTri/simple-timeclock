import axios from "axios";

export const openFile = async (individual: string, file: string) => {
  try {
    const { data } = await axios.post("/api/flask/openfile", {
      individual,
      file,
    });

    return data.response;
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
