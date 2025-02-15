import React, { createContext, useEffect, useState, useReducer } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";

const initialState = {
  isAuthenticated: false,
  isInitialised: false,
  user: null,
  loading: true,
};

const apiUrl = process.env.REACT_APP_API_URL;

// Utility function to check if the token is still valid
const isValidToken = (jwtToken) => {
  if (!jwtToken) {
    return false;
  }
  const decodedToken = jwtDecode(jwtToken);

  const currentTime = Date.now() / 1000;
  return decodedToken.exp > currentTime;
};

// Function to set the session, store tokens in localStorage, and set axios headers
const setSession = (accessToken, refreshToken) => {
  if (accessToken) {
    // Save tokens to localStorage
    localStorage.setItem("jwtToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    // Set Authorization header for axios
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    // Remove tokens from localStorage and axios headers
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("refreshToken");
    delete axios.defaults.headers.common.Authorization;
  }
};

// Reducer function to manage state changes
const reducer = (state, action) => {
  switch (action.type) {
    case "INIT":
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        isInitialised: true,
        user: action.payload.user,
      };
    case "LOGIN":
    case "REGISTER":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

const AuthContext = createContext({
  ...initialState,
  method: "JWT",
  login: () => Promise.resolve(),
  logout: () => {},
  register: () => Promise.resolve(),
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState(true); // Add loading state
  const [showModal, setShowModal] = useState(false); // Modal state
  const navigate = useNavigate();
  // // Initialize authentication when the component mounts
  // useEffect(() => {
  //   const initAuth = async () => {
  //     const jwtToken = localStorage.getItem("jwtToken");

  //     if (jwtToken && isValidToken(jwtToken)) {
  //       setSession(jwtToken, localStorage.getItem("refreshToken"));

  //       try {
  //         // const response = await axios.get(`${apiUrl}/api/profile`);
  //         const jwtToken = localStorage.getItem("jwtToken");

  //         const response = await axios.get(`${apiUrl}/api/profile`, {
  //           headers: {
  //             Authorization: `Bearer ${jwtToken}`,
  //           },
  //         });

  //         const { user } = response.data;
  //         dispatch({
  //           type: "INIT",
  //           payload: {
  //             isAuthenticated: true,
  //             user,
  //           },
  //         });
  //       } catch (err) {
  //         dispatch({
  //           type: "INIT",
  //           payload: {
  //             isAuthenticated: false,
  //             user: null,
  //           },
  //         });
  //       }
  //     } else {
  //       dispatch({
  //         type: "INIT",
  //         payload: {
  //           isAuthenticated: false,
  //           user: null,
  //         },
  //       });
  //     }
  //     setLoading(false);
  //   };

  //   initAuth();
  // }, []); // Run only once when the component mounts
  useEffect(() => {
    const initAuth = async () => {
      const jwtToken = localStorage.getItem("jwtToken");

      if (jwtToken) {
        const decoded = jwtDecode(jwtToken);

        // Check if token is expired
        if (decoded.exp * 1000 < Date.now()) {
          setShowModal(true); // Show modal
          dispatch({ type: "LOGOUT" }); // Log out user
          setLoading(false);
          return;
        }

        if (isValidToken(jwtToken)) {
          setSession(jwtToken, localStorage.getItem("refreshToken"));

          try {
            const response = await axios.get(`${apiUrl}/api/profile`, {
              headers: { Authorization: `Bearer ${jwtToken}` },
            });

            dispatch({
              type: "INIT",
              payload: { isAuthenticated: true, user: response.data.user },
            });
          } catch (err) {
            dispatch({
              type: "INIT",
              payload: { isAuthenticated: false, user: null },
            });
          }
        } else {
          dispatch({
            type: "INIT",
            payload: { isAuthenticated: false, user: null },
          });
        }
      } else {
        dispatch({
          type: "INIT",
          payload: { isAuthenticated: false, user: null },
        });
      }

      setLoading(false);
    };

    initAuth();
  }, []);
  if (loading) return <p>Loading...</p>; // Prevent rendering before auth check
  // Login method to authenticate the user and set session
  const login = async (email, password) => {
    try {
      const response = await axios.post(
        `${apiUrl}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      if (response.status === 200) {
        const { token, user, refreshToken } = response.data;

        // Save token to localStorage and set axios Authorization header
        localStorage.setItem("user", JSON.stringify(user));
        setSession(token, refreshToken);

        // Dispatch LOGIN action to update state
        dispatch({
          type: "LOGIN",
          payload: { user },
        });

        return response;
      } else {
        return response;
      }
    } catch (error) {
      throw error;
    }
  };

  // Register method to create a new user and set session
  const register = async (fullname, email, password) => {
    try {
      const payload = { fullname, email, password };

      const response = await axios.post(`${apiUrl}/api/auth/signup`, payload);

      if (response.status === 201) {
        const { token, user, refreshToken } = response.data;

        // Save token and user in localStorage
        setSession(token, refreshToken);
        localStorage.setItem("user", JSON.stringify(user));

        // Dispatch REGISTER action to update state
        dispatch({
          type: "REGISTER",
          payload: { user },
        });

        return response;
      } else {
        return response;
      }
    } catch (error) {
      console.error(
        "Registration error:",
        error.response?.data?.message || error.message
      );
      throw error;
    }
  };

  // Logout method to clear session
  const logout = () => {
    setShowModal(false);
    setSession(null); // Clear session and tokens
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("refreshToken");

    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    setTimeout(() => {
      navigate("/login");
    }, 100);
  };

  // Wait until initial state is loaded

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "JWT",
        login,
        logout,
        register,
      }}
    >
      {children}

      <Modal show={showModal} onHide={logout} backdrop="static" centered>
        <Modal.Header closeButton>
          <Modal.Title>Session Expired</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your session has expired. Please log in again.</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={logout}>
            Login Again
          </Button>
        </Modal.Footer>
      </Modal>
    </AuthContext.Provider>
  );
};

export default AuthContext;
