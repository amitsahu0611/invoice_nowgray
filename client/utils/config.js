/** @format */

// export const Base_URL = "http://localhost:8001/api/";
// export const Image_URL = "http://localhost:8001/";

export const forImage = "https://ng-invoice.nowgray.live";
// export const forImage = "http://localhost:5173";

export const Base_URL = "https://ng-invoice-api.nowgray.live/api/";
export const Image_URL = "https://ng-invoice-api.nowgray.live/";

// export const Base_URL = "https://invoice-api.nowgray.live/api/";
// export const Image_URL = "https://invoice-api.nowgray.live/";

// export const Base_URL = "https://invoice-api.myycrowsoft.com/api/";
// export const Image_URL = "https://invoice-api.myycrowsoft.com/";

import axios from "axios";
import moment from "moment";
import toast from "react-hot-toast";

export const showError = (message) => {
  toast.error(message);
};

export const showSuccess = (message) => {
  toast.success(message);
};

export const validateEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};

export const getToken = async () => {
  try {
    const storedUserData = await localStorage.getItem("token");
    if (storedUserData) {
      const Token = storedUserData;
      return Token;
    }
    return null;
  } catch (error) {
    console.error("Error retrieving user data:", error);
    return null;
  }
};

export const getUserData = async () => {
  try {
    const storedUserData = await localStorage.getItem("userInfo");
    return JSON.parse(storedUserData);
  } catch (error) {
    console.error("Error retrieving user data:", error);
    return null;
  }
};

export const getYearsArray = () => {
  const startYear = 1995;
  const currentYear = moment().year();
  const years = [];

  for (let year = startYear; year <= currentYear; year++) {
    years.push({lookup_name: year.toString(), lookup_value: year.toString()});
  }

  return years;
};

export const handleNumInput = (event) => {
  const value = event.target.value;
  const numericValue = value.replace(/\D/g, "");
  event.target.value = numericValue;
};

export const replaceBr = (str, value, replace) => {
  return str.replace(new RegExp(value, "g"), replace);
};

// export const formatDate = (isoString) => {
//   if (!isoString) return "-";
//   const date = new Date(isoString);
//   return date.toISOString().split("T")[0]; // Returns "2025-02-01"
// };

export const formatDate = (isoString) => {
  if (!isoString) return "-"; // Return "-" if the input is falsy
  const date = new Date(isoString); // Create a Date object

  // Get day, month, and year
  const day = String(date.getDate()).padStart(2, "0"); // Get day and pad with zero if needed
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Get month (0-indexed) and pad
  const year = date.getFullYear(); // Get full year

  return `${day}-${month}-${year}`; // Return in DD-MM-YYYY format
};

// Example usage
const formattedDate = formatDate("2025-02-01T00:00:00.000Z");
console.log(formattedDate); // Output: "01-02-2025"

export const parseDate = (dateString) => {
  const parsedDate = moment(dateString, "YYYY-MM-DD");
  return parsedDate.isValid() ? parsedDate.format("YYYY-MM-DD") : "";
};

export const TabsEnums = {
  CaseInfo: "Case Info",
  OpponentsDetails: "Opponents Details",
  DoucumentInfo: "Document Info",
  CaseHearing: "case hearing",
  Payments: "Payments",
  AdminandStaff: "Admin/Staff",
  ClientPage: "Client",
  TaskPage: "Tasks",
  FileNoConfig: "File No Config",
  Template: "Template",
};
