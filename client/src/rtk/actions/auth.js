import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import jwt_decode from "jwt-decode";

export const login = createAsyncThunk(
  "authentication/login",
  async ({ email, password }) => {
    const response = await axios.post("http://localhost:4000/login", {
      email,
      password,
    });

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }

    return response.data;
  }
);

export const logout = createAsyncThunk(
  "authentication/logout",
  async (_, thunkAPI) => { // No need to pass userId
    try {
      // Get the token from localStorage
      const token = localStorage.getItem("token");

      // Make sure to include the Authorization header with the JWT token
      const response = await axios.post(
        `http://localhost:4000/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Remove the token from localStorage
      localStorage.removeItem("token");

      // Return the response data
      return response.data;
    } catch (error) {
      // Handle errors and pass them to the thunkAPI
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data : "Logout failed"
      );
    }
  }
);

export const initializeAuth = createAsyncThunk(
  "authentication/initializeAuth",
  async (_, { dispatch }) => {
    const token = localStorage.getItem("token");
    if (token) {
      let user = jwt_decode(token);

      const response = await axios.get("http://localhost:4000/user", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("USER API RES", response);

      if (response.data) {
        user = response.data;
      }

      return { user, token };
    }

    return null;
  }
);

export const fetchUpdatedUser = createAsyncThunk(
  "authentication/fetchUpdatedUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:4000/user/${userId}`);
      console.log("Fetch Updated User Called & Response.Data:", response.data);
      if (response.data && response.data._id) {
        response.data.id = response.data._id;
        delete response.data._id;
      }
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateUser = (user) => {
  return {
    type: "user/update",
    payload: user,
  };
};