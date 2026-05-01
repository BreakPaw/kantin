import axios from "axios";
export const api = axios.create({
  baseURL: "https://prompter-unbeaten-disparity.ngrok-free.dev/api/v1"
});

export const BASE_URL = "https://prompter-unbeaten-disparity.ngrok-free.dev";