import { API_HOST } from "../utils/constants";
import { getToken } from "./token";

export const addNewProduct = async (data) => {
  const response = await fetch(`${API_HOST}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: getToken(),
    },
    body: JSON.stringify(data),
  });
  return response.json();
};
export const putProduct = async (data, id) => {
  const response = await fetch(`${API_HOST}/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      token: getToken(),
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const getAllProducts = async (
  page,
  name = "",
  category = "",
  species = "",
  vendors = ""
) => {
  const response = await fetch(
    `${API_HOST}/products/list?page=${page}&name=${name}&category=${category}&species=${species}&vendors=${vendors}&limit=${25}`,
    {
      headers: { token: getToken() },
    }
  );
  return response.json();
};

export const uploadProductPhoto = async (id, file) => {
  const formData = new FormData();
  formData.append("foto", file);
  const response = await fetch(`${API_HOST}/products/image/${id}`, {
    method: "POST",
    headers: { token: getToken() },
    body: formData,
  });
  return response.json();
};

export const showImage = (name) => {
  return `${API_HOST}/products/view-image?name=${name}`;
};

export const getProductById = async (id) => {
  const response = await fetch(`${API_HOST}/products/${id}`, {
    headers: { token: getToken() },
  });
  return response.json();
};
