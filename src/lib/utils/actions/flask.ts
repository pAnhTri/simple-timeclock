import axios from "axios";
import { getAxiosError } from "../getAxiosError";

const isFlaskConnected = async () => {
  const returnValues = {
    isConnected: false,
    error: "",
  };

  try {
    const { data: response } = await axios.get("http://localhost:5000/connect");
    returnValues.isConnected = response.message === "CONNECTED";
  } catch (error) {
    returnValues.error = getAxiosError(error);
  }

  return returnValues;
};

const openExcel = async () => {
  try {
    const { data: response } = await axios.post(
      "http://localhost:5000/excel/open"
    );
    return response.message;
  } catch (error) {
    return getAxiosError(error);
  }
};

export { isFlaskConnected, openExcel };
