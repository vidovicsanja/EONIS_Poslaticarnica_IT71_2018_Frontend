import axios from "axios";

import { apiBaseUrl, axiosRequestConfig } from "../../config/axios";

export const getProizvodi = async ({ perPage, page, sort, direction }) => {
  const { data } = await axios.get(
    `${apiBaseUrl}/proizvod/all?perPage=${perPage}&page=${page}&sort=${sort}&direction=${direction}`,
    axiosRequestConfig
  );

  return data;
};

export const getProizvodiByName = async ({ name }) => {
  const { data } = await axios.get(
    `${apiBaseUrl}/proizvod/name/${name}`,
    axiosRequestConfig
  );

  return data;
};

export const getProizvod = async (id) => {
  const { data } = await axios.get(
    `${apiBaseUrl}/proizvod/${id}`,
    axiosRequestConfig
  );

  return data;
};

export const dodajProizvod = async (request) => {
  const { data } = await axios.post(
    `${apiBaseUrl}/proizvod`,
    request,
    axiosRequestConfig
  );

  return data;
};

export const izmjeniProizvod = async (request) => {
  const { data } = await axios.put(
    `${apiBaseUrl}/proizvod/${request?.id}`,
    request,
    axiosRequestConfig
  );

  return data;
};

export const izbrisiProizvod = async (id) => {
  const { data } = await axios.delete(
    `${apiBaseUrl}/proizvod/${id}`,
    axiosRequestConfig
  );

  return data;
};

export const getKategorijeProizvoda = async ({
  perPage,
  page,
  sort,
  direction,
}) => {
  const { data } = await axios.get(
    `${apiBaseUrl}/kategorijaproizvoda/all?perPage=${perPage}&page=${page}&sort=${sort}&direction=${direction}`,
    axiosRequestConfig
  );

  return data;
};

export const getKategorijaProizvoda = async (id) => {
  const { data } = await axios.get(
    `${apiBaseUrl}/kategorijaproizvoda/${id}`,
    axiosRequestConfig
  );

  return data;
};

export const dodajKategorijuProizvoda = async (request) => {
  const { data } = await axios.post(
    `${apiBaseUrl}/kategorijaproizvoda`,
    request,
    axiosRequestConfig
  );

  return data;
};

export const izmjeniKategorijuProizvoda = async (request) => {
  const { data } = await axios.put(
    `${apiBaseUrl}/kategorijaproizvoda/${request?.id}`,
    request,
    axiosRequestConfig
  );

  return data;
};

export const izbrisiKategorijuProizvoda = async (id) => {
  const { data } = await axios.delete(
    `${apiBaseUrl}/kategorijaproizvoda/${id}`,
    axiosRequestConfig
  );

  return data;
};
