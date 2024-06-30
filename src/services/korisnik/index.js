import axios from "axios";

import { apiBaseUrl, axiosRequestConfig } from "../../config/axios";

export const getTrenutni = async () => {
  const { data } = await axios.get(
    `${apiBaseUrl}/korisnik/current`,
    axiosRequestConfig
  );

  return data;
};

export const getKorisnici = async ({ perPage, page, sort, direction }) => {
  const { data } = await axios.get(
    `${apiBaseUrl}/korisnik/all?perPage=${perPage}&page=${page}&sort=${sort}&direction=${direction}`,
    axiosRequestConfig
  );

  return data;
};

export const getCurrent = async () => {
  const { data } = await axios.get(
    `${apiBaseUrl}/korisnik/current`,
    axiosRequestConfig
  );

  return data;
};

export const getKorisnik = async (id) => {
  const { data } = await axios.get(
    `${apiBaseUrl}/korisnik/${id}`,
    axiosRequestConfig
  );

  return data;
};

export const dodajProdavca = async (request) => {
  const { data } = await axios.post(
    `${apiBaseUrl}/korisnik/addSeller`,
    request,
    axiosRequestConfig
  );

  return data;
};

export const izmjeniKorisnika = async (request) => {
  const { data } = await axios.put(
    `${apiBaseUrl}/korisnik/${request?.id}`,
    request,
    axiosRequestConfig
  );

  return data;
};

export const izbrisiKorisnika = async (id) => {
  const { data } = await axios.delete(
    `${apiBaseUrl}/korisnik/${id}`,
    axiosRequestConfig
  );

  return data;
};
