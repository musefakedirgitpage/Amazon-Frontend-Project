import axios from "axios"
export const axiosInstance = axios.create({
  // local url link
  // baseURL: "http://127.0.0.1:5001/clone-ffc0b/us-central1/api",
  // deployed in render url linek
  baseURL:"https://amazon-backend-deploy-first.onrender.com"
});
