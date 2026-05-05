import axios from "axios";
// export const api = axios.create({
//   baseURL: "/api"
// });

// export const BASE_URL = "";

export const api = axios.create({
  baseURL: "https://kantin-clean.vercel.app/api",
});

export const BASE_URL = "https://kantin-clean.vercel.app";
