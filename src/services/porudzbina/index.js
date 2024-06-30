import axios from "axios";

import { apiBaseUrl, axiosRequestConfig } from "../../config/axios";

export const getPorudzbine = async ({ perPage, page, sort }) => {
  const { data } = await axios.get(
    `${apiBaseUrl}/porudzbina/all?perPage=${perPage}&page=${page}`,
    axiosRequestConfig
  );

  return data;
};

export const getPorudzbina = async (id) => {
  const { data } = await axios.get(
    `${apiBaseUrl}/porudzbina/${id}`,
    axiosRequestConfig
  );

  return data;
};

export const dodajPorudzbinu = async (request) => {
  const { data } = await axios.post(
    `${apiBaseUrl}/porudzbina`,
    request,
    axiosRequestConfig
  );

  return data;
};

export const izmjeniPorudzbinu = async (request) => {
  const { data } = await axios.put(
    `${apiBaseUrl}/porudzbina/${request?.id}`,
    request,
    axiosRequestConfig
  );

  return data;
};

export const izbrisiPorudzbinu = async (id) => {
  const { data } = await axios.delete(
    `${apiBaseUrl}/porudzbina/${id}`,
    axiosRequestConfig
  );

  return data;
};
