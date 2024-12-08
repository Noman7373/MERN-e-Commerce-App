import axios from "axios";
import Axios from "../Axios";
import { baseURL } from "../apiSummery.js";

const registerUser = async ({ name, email, password }) => {
  try {
    const response = await Axios.post(`${baseURL}/api/user/register`, {
      name,
      email,
      password,
    });
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || "An error occurred");
  }
};

const userLogIn = async ({ email, password }) => {
  try {
    const response = await Axios.post(`${baseURL}/api/user/login`, {
      email,
      password,
    });

    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || "An error occurred");
  }
};

const userForgotPassword = async ({ email }) => {
  try {
    const response = await Axios.put(`${baseURL}/api/user/forgot-password`, {
      email,
    });
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || "An error occurred");
  }
};

const verifyOTP = async ({ otp, email }) => {
  try {
    const response = await Axios.put(
      `${baseURL}/api/user/verify-forgotpassword-otp`,
      {
        otp,
        email,
      }
    );
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || "An error occurred");
  }
};

const resetPassword = async ({ id, newPassword, confirmNewPassword }) => {
  try {
    const response = await axios.put(
      `${baseURL}/api/user/reset-password/${id}`,
      {
        id,
        newPassword,
        confirmNewPassword,
      }
    );
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || "An error occurred");
  }
};


// logout Function
const logOutUser = async () => {
  try {
    const response = await Axios.get(`${baseURL}/api/user/logout`);
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || "An error occurred");
  }
};

// expend the life of accessToken with the help of RefreshToken
const refreshAccessToken = async (refreshToken) => {
  try {
    const response = await axios.put(`${baseURL}/api/user/refresh-token`, {
      refreshToken,
    });
    const accessToken = response.data.tokens.accessToken;
    localStorage.setItem("accessToken", accessToken);
    return accessToken;
  } catch (error) {
    throw new Error(error.response?.data?.message || "An error occurred");
  }
};

// fetch User Details API
const getUserLoginDetails = async () => {
  try {
    const response = await Axios.get(`${baseURL}/api/user/getuser-details`);
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || "An error occurred");
  }
};

// Upload Avater
const updloadAvater = async ({ file }) => {
  try {
    const formData = new FormData();
    formData.append("avatar", file);

    const response = await Axios.put(
      `${baseURL}/api/user/upload-avatar`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // Ensures the file is uploaded correctly
        },
      }
    );

    return response;
  } catch (error) {
    console.error("Error during avatar upload:", error);
    throw new Error(
      error.response?.data?.message || "An error occurred during avatar upload."
    );
  }
};


// update USER Details
const updateUserDetails = async ({ _id, name, email, mobie }) => {
  try {
    const response = await Axios.put(
      `${baseURL}/api/user/update-profile/${_id}`,
      {
        _id,
        name,
        email,
        mobie,
      }
    );

    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || "An error occurred");
  }
};

export {
  registerUser,
  userLogIn,
  userForgotPassword,
  verifyOTP,
  resetPassword,
  logOutUser,
  refreshAccessToken,
  getUserLoginDetails,
  updloadAvater,
  updateUserDetails,
};
