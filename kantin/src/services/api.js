import axios from "axios";
export const BASE_URL =
  "https://unconducted-ashli-nonconfidential.ngrok-free.dev";
export const api = axios.create({
  baseURL: `${BASE_URL}/api/v1`,
  headers: {
    "ngrok-skip-browser-warning": "any-value",
  },
});
