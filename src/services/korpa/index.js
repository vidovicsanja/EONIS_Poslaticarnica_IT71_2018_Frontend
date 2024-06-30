import axios from "axios";

import { apiBaseUrl, axiosRequestConfig } from "../../config/axios";

export const stripeSesija = async (request) => {
  const { data } = await axios.post(
    `${apiBaseUrl}/stripe/create-checkout-session`,
    request,
    axiosRequestConfig
  );

  return data;
};

export const getUkupnaCijena = (korpa) => {
  return korpa?.proizvodi?.reduce((t, p) => p?.cena * p?.kolicina + t, 0);
};
