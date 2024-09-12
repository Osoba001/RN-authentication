import axios from "axios";
import { Alert } from "react-native";
import { useContext } from "react";
import { AuthContext } from "../user_modules/authentication/AuthContext";

const BASE_URI = "http://206.217.137.75:702/api/";

const UNAUTHENTICATED_ROUTES = new Set([
  "users/login",
  "users/register",
  "users/forgot-password",
  "users/create",
  "users/set-new-password",
]);

const setUpInterceptors = (axiosInstance, authContext) => {
  axiosInstance.interceptors.request.use(handleRequest(authContext));
  axiosInstance.interceptors.response.use(handleSuccessResponse, handleErrorResponse);
};

const handleRequest = (authContext) => async (config) => {
  if (UNAUTHENTICATED_ROUTES.has(config.url.toLowerCase())) return config;

  const { accessToken, refreshToken, tokenTTL, updateToken } = authContext;
  if (!accessToken) return config;

  const currentTime = Date.now() / (1000 * 60);

  if (currentTime >= tokenTTL) {
    try {
      const { data } = await axios.post("users/refresh-token", {
        accessToken,
        refreshToken,
      });
      updateToken(data.accessToken, data.refreshToken);
      config.headers.Authorization = `Bearer ${data.accessToken}`;
    } catch (error) {
      handleAuthError(error);
      return Promise.reject(error);
    }
  } else {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
};

const handleSuccessResponse = (response) => {
  const { config, status } = response;
  const { method, url } = config;

  if (method !== "get" && !url.toLowerCase().includes("users/refresh-token") && !UNAUTHENTICATED_ROUTES.has(config.url.toLowerCase()) && status >= 200 && status < 300) {
    // Optionally show success toast here
  }

  return { isSuccess: true, payload: response.data, message: "" };
};

const handleErrorResponse = (error) => {
  let message = "Unknown error occurred.";
 

  if (error.response) {
    const { status, data } = error.response;

    message = data || `API Error Status (${status})`;

  } else if (error.request) {
    message = "No API response received";
  } else {
    message = `Error setting up the API request: ${error.message}`;
  }

  return { isSuccess: false, payload: null, message };
};


const handleAuthError = (error) => {
  if (error.response && error.response.status === 401) {
    Alert.alert("Session Expired", "Please login again");
  } else {
    Alert.alert("Error", "Unable to perform action. Please try again later.");
  }
};

const createApiMethod = (method) => async (axiosInstance, url, data = null) => {
  try {
    const response = await axiosInstance[method](url, data);
    return response ;
  } catch (error) {
    return handleErrorResponse(error);
  }
};

const ApiService = (authContext) => {
  const axiosInstance = axios.create({ baseURL: BASE_URI });
  setUpInterceptors(axiosInstance, authContext);

  return {
    getAsync: createApiMethod("get").bind(null, axiosInstance),
    postAsync: createApiMethod("post").bind(null, axiosInstance),
    patchAsync: createApiMethod("patch").bind(null, axiosInstance),
    putAsync: createApiMethod("put").bind(null, axiosInstance),
    deleteAsync: createApiMethod("delete").bind(null, axiosInstance),
    uploadFileAsync: createApiMethod("put").bind(null, axiosInstance),
  };
};

const useApiService = () => {
  const authContext = useContext(AuthContext);
  return ApiService(authContext);
};

export default useApiService;
