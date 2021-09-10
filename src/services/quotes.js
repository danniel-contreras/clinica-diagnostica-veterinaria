import { API_HOST } from "../utils/constants";
import { getToken } from "./token";

export const addNewQuote = async (data) => {
  const response = await fetch(`${API_HOST}/quotes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: getToken(),
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const getAllQuotes = async (page, patient) => {
  const response = await fetch(
    `${API_HOST}/quotes/list?page=${page}&namePatients=${patient}&limit=${10}`,
    { headers: { token: getToken() } }
  );
  return response.json();
};
