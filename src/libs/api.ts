import axios from "axios";
import { apibaseUrl, timeOut } from "./constants";

// Create an instance of axios with a custom configuration
const api = axios.create({
  baseURL: apibaseUrl,
  timeout: timeOut, // Set a timeout for requests (in milliseconds)
});

export default api