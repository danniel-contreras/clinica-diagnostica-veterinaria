import { API_HOST } from "../utils/constants";
import { getToken } from "./token";

export const addNewCustomer = async (data) => {
  const response = await fetch(`${API_HOST}/customers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: getToken(),
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const getAllCustomers = async () => {
  const response = await fetch(`${API_HOST}/customers`, {
    headers: { token: getToken() },
  });
  return response.json();
};

export const searchCustomer = async (name, last, page, limit = 25, state) => {
  const response = await fetch(
    `${API_HOST}/customers/search?name=${name}&last=${last}&page=${page}&limit=${limit}&state=${state}`,
    { headers: { token: getToken() } }
  );
  return response.json();
};

export const putCustomer = async (id, data) => {
  const response = await fetch(`${API_HOST}/customers/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      token: getToken(),
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const changeState = async (id, state) => {
  const data = { id, state: !state };
  const response = await fetch(`${API_HOST}/customers/delete`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      token: getToken(),
    },
    body: JSON.stringify(data),
  });
  return response.json();
};
