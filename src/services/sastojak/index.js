import axios from "axios";

import { apiBaseUrl, axiosRequestConfig } from "../../config/axios";

export const getSastojci = async ({ perPage, page, sort, direction }) => {
  const { data } = await axios.get(
    `${apiBaseUrl}/sastojak/all?perPage=${perPage}&page=${page}&sort=${sort}&direction=${direction}`,
    axiosRequestConfig
  );

  return data;
};

export const getSastojak = async (id) => {
  const { data } = await axios.get(
    `${apiBaseUrl}/sastojak/${id}`,
    axiosRequestConfig
  );

  return data;
};

export const dodajSastojak = async (request) => {
  const { data } = await axios.post(
    `${apiBaseUrl}/sastojak`,
    request,
    axiosRequestConfig
  );

  return data;
};

export const izmjeniSastojak = async (request) => {
  const { data } = await axios.put(
    `${apiBaseUrl}/sastojak/${request?.id}`,
    request,
    axiosRequestConfig
  );

  return data;
};

export const izbrisiSastojak = async (id) => {
  const { data } = await axios.delete(
    `${apiBaseUrl}/sastojak/${id}`,
    axiosRequestConfig
  );

  return data;
};
