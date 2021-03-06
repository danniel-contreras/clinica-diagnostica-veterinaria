import { API_HOST } from "../utils/constants";
import { getToken } from "./token";

export const addNewQuoteType = async (data) => {
  const response = await fetch(`${API_HOST}/quotesType`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: getToken(),
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const getAllQuoteTypes = async () => {
  const response = await fetch(`${API_HOST}/quotesType`, {
    headers: { token: getToken() },
  });
  return response.json();
};

export const putQuoteType = async (data, id) => {
  const response = await fetch(`${API_HOST}/quotesType/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      token: getToken(),
    },
    body: JSON.stringify(data),
  });
  return response.json();
};
