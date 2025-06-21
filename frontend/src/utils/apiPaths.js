export const BASE_URL = "https://amlgolabs-assignment.onrender.com";

//BASE_URL = "http://localhost:4000";
// utils/ apipaths.js
export const API_PATHS = {
  AUTH: {
    LOGIN: "/api/user/login",
    REGISTER: "/api/user/register",
    GET_USER_INFO: "/api/user/getUser",
  },
  DASHBOARD: {
    GET_DATA: "/api/dashboard",
  },
  INCOME: {
    ADD_INCOME: "/api/income/add",
    GET_ALL_INCOME: "/api/income/get",
    DELETE_INCOME: (incomeId) => `/api/income/delete/${incomeId}`,
    DOWNLOAD_INCOME: `/api/income/download-pdf`,
  },
  EXPENSE: {
    ADD_EXPENSE: "/api/expense/add",
    GET_ALL_EXPENSE: "/api/expense/get",
    DELETE_EXPENSE: (expenseId) => `/api/expense/delete/${expenseId}`,
    DOWNLOAD_EXPENSE: `/api/expense/download-pdf`,
  },
  IMAGE: {
    UPLOAD_IMAGE: "/api/user/upload-image",
  },
};
