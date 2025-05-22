import axios from "axios";

export const updateClockInStatus = async (
  employeeID: string,
  isClockedIn: boolean
) => {
  try {
    const { data } = await axios.put(`/api/employee/${employeeID}`, {
      isClockedIn,
    });

    return data.updatedEmployee;
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
