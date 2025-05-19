import { User } from "@/interfaces/api";
import axios from "axios";

const BASE_URL = "http://localhost:3000/auth";

export const authInstance = axios.create({
  baseURL: BASE_URL,
});
export const login = async (params: { email: string; password: string }) => {
  const { data } = await authInstance.post<{ access_token: string }>(
    `${BASE_URL}/login`,
    params
  );

  return data;
};

export const register = async (params: { email: string; password: string }) => {
  const { data } = await authInstance.post(`${BASE_URL}/register`, params);

  return data;
};

export const getUserList = async () => {
  const { data } = await authInstance.get<User[]>(`${BASE_URL}/users`);

  return data;
};
