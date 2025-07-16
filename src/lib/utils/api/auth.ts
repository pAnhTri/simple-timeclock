import axios from "axios";
import { getAxiosError } from "../getAxiosError";

export const signIn = async (
  email: string,
  password: string
): Promise<{
  accessToken: string;
}> => {
  try {
    const { data } = await axios.post<{
      accessToken: string;
    }>("/api/auth/signin", { email, password });

    return data;
  } catch (error) {
    throw new Error(getAxiosError(error));
  }
};

export const signOut = async (): Promise<void> => {
  try {
    await axios.get<{ message: string }>("/api/auth/signout");
  } catch (error) {
    throw new Error(getAxiosError(error));
  }
};

export const validateToken = async (
  rootUrl: string = "http://localhost:3000",
  jti: string
): Promise<{ isInvalid: boolean }> => {
  try {
    const { data } = await axios.post<{ isInvalid: boolean }>(
      `${rootUrl}/api/auth/validate`,
      { jti }
    );
    return data;
  } catch (error) {
    throw new Error(getAxiosError(error));
  }
};
