import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../api";
import Splash from "../screens/Splash";
import AsyncStorage from "@react-native-async-storage/async-storage";

const userContext = createContext();
export const useUser = () => useContext(userContext);

const UserContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const storeToken = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      console.error("Failed to save the data to the storage", e);
    }
  };

  const getToken = async (key) => {
    try {
      return await AsyncStorage.getItem(key);
    } catch (e) {
      console.error("Failed to fetch the data from storage", e);
    }
  };

  const deleteToken = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      console.error("Failed to delete the data from storage", e);
    }
  };

  const register = async (displayName, email, password) => {
    try {
      const {
        data: { message, access_token, refresh_token },
      } = await api.post("/auth/register", {
        displayName,
        email,
        password,
      });
      await storeToken("access_token", access_token);
      await storeToken("refresh_token", refresh_token);
      setUser({ displayName, email });
      return message || "User registered successfully";
    } catch (error) {
      const message = error.response?.data?.message || "An error occurred";
      throw message;
    }
  };

  const login = async (email, password) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      const { access_token, refresh_token, message } = response.data;
      await storeToken("access_token", access_token);
      await storeToken("refresh_token", refresh_token);
      const userResponse = await api.get("/auth/me", {
        headers: { Authorization: `Bearer ${access_token}` },
      });
      setUser(userResponse.data);
      return message || "Login successful";
    } catch (error) {
      const message = error.response?.data?.message || "An error occurred";
      throw message;
    }
  };

  const logout = async () => {
    try {
      await deleteToken("access_token");
      await deleteToken("refresh_token");
      await api.post("/auth/logout");
      setUser(null);
    } catch (error) {
      const message = error.response?.data?.message || "An error occurred";
      throw message;
    }
  };

  const refreshToken = async () => {
    try {
      const refresh_token = await getToken("refresh_token");
      const response = await api.post("/auth/refresh", null, {
        headers: { Authorization: `Bearer ${refresh_token}` },
      });
      const { access_token } = response.data;
      await storeToken("access_token", access_token);
      return access_token;
    } catch (error) {
      console.error("Failed to refresh token", error);
      setUser(null);
      throw error;
    }
  };

  const apiRequest = async (url, options = {}) => {
    try {
      const access_token = await getToken("access_token");
      const response = await api(url, {
        ...options,
        headers: { Authorization: `Bearer ${access_token}` },
      });
      return response;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        const new_access_token = await refreshToken();
        const response = await api(url, {
          ...options,
          headers: { Authorization: `Bearer ${new_access_token}` },
        });
        return response;
      } else {
        throw error;
      }
    }
  };

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        const response = await apiRequest("/auth/me");
        setUser(response.data);
      } catch (error) {
        console.log(error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkUserLoggedIn();
  }, []);

  const provided = {
    user,
    register,
    login,
    logout,
    loading,
  };

  return (
    <userContext.Provider value={provided}>
      {loading ? <Splash /> : children}
    </userContext.Provider>
  );
};

export default UserContext;
