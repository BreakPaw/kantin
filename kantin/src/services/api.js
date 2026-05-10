import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "/api";
const APP_BASE_URL = import.meta.env.VITE_BASE_URL || "";

export const api = axios.create({
  baseURL: API_BASE_URL,
});

export const BASE_URL = APP_BASE_URL;
