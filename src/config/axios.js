export const apiBaseUrl = "https://localhost:7186/api";

export const axiosRequestConfig = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
  responseType: "json",
};
