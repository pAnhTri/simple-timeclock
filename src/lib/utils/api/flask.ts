import axios from "axios";
import { getAxiosError } from "../getAxiosError";

export const openExcelApi = async (path?: string): Promise<string> => {
  try {
    const payload: { path?: string | null } = { path: path ?? null };

    const { data: response } = await axios.post(
      "http://localhost:5000/excel/open",
      payload
    );
    return response.message;
  } catch (error) {
    return getAxiosError(error);
  }
};
