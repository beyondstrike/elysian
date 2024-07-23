import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import api from "../api";
import Splash from "../pages/Splash";

const userContext = createContext();
export const useUser = () => useContext(userContext);

const UserContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const register = async (displayName, email, password) => {
    try {
      const {
        data: { message, access_token, refresh_token },
      } = await api.post("/auth/register", {
        displayName,
        email,
        password,
      });
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
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
      const { message, access_token, refresh_token } = response.data;
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
      const userResponse = await api.get("/auth/me", {
        headers: { Authorization: `Bearer ${access_token}` },
      });
      setUser(userResponse.data);
      return message;
    } catch (error) {
      const message = error.response?.data?.message || "An error occurred";
      throw message;
    }
  };

  const logout = async () => {
    try {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      await api.post("/auth/logout");
      setUser(null);
    } catch (error) {
      const message = error.response?.data?.message || "An error occurred";
      throw message;
    }
  };

  const refreshToken = async () => {
    try {
      const refresh_token = localStorage.getItem("refresh_token");
      const response = await api.post("/auth/refresh", null, {
        headers: { Authorization: `Bearer ${refresh_token}` },
      });
      const { access_token } = response.data;
      localStorage.setItem("access_token", access_token);
      return access_token;
    } catch (error) {
      console.error("Failed to refresh token", error);
      setUser(null);
      throw error;
    }
  };

  const apiRequest = useCallback(async (url, options = {}) => {
    try {
      const access_token = localStorage.getItem("access_token");
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
  }, []);

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        const response = await apiRequest("/auth/me");
        setUser(response.data);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkUserLoggedIn();
  }, [apiRequest]);

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
