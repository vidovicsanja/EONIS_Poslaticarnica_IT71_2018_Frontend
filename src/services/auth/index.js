import axios from "axios";
import { jwtDecode } from "jwt-decode";

import { apiBaseUrl, axiosRequestConfig } from "../../config/axios";

export const login = async (request) => {
  const { data } = await axios.post(
    `${apiBaseUrl}/auth/login`,
    request,
    axiosRequestConfig
  );

  return data;
};

export const registracija = async (request) => {
  const { data } = await axios.post(
    `${apiBaseUrl}/korisnik/register`,
    request,
    axiosRequestConfig
  );

  return data;
};

export const getRole = (token) => {
  const decoded = jwtDecode(token);

  return decoded?.role;
};
