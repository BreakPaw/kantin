import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1";
const APP_BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

export const api = axios.create({
  baseURL: API_BASE_URL,
});

export const BASE_URL = APP_BASE_URL;
