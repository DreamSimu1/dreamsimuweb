// import React, { createContext, useEffect, useReducer } from "react";
// import { jwtDecode } from "jwt-decode";
// import axios from "axios";

// const initialState = {
//   isAuthenticated: false,
//   isInitialised: false,
//   user: null,
// };

// const apiUrl = process.env.REACT_APP_API_URL;

// const isValidToken = (jwtToken) => {
//   if (!jwtToken) {
//     return false;
//   }

//   const decodedToken = jwtDecode(jwtToken);
//   const currentTime = Date.now() / 1000;

//   return decodedToken.exp > currentTime;
// };

// // const setSession = (jwtToken) => {
// //   if (jwtToken) {
// //     localStorage.setItem("jwtToken", jwtToken);
// //     axios.defaults.headers.common.Authorization = `Bearer ${jwtToken}`;
// //   } else {
// //     localStorage.removeItem("jwtToken");
// //     delete axios.defaults.headers.common.Authorization;
// //   }
// // };
// const setSession = (accessToken, refreshToken) => {
//   if (accessToken) {
//     localStorage.setItem("jwtToken", accessToken);
//     localStorage.setItem("refreshToken", refreshToken);
//     axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
//   } else {
//     localStorage.removeItem("jwtToken");
//     localStorage.removeItem("refreshToken");
//     delete axios.defaults.headers.common.Authorization;
//   }
// };

// const reducer = (state, action) => {
//   switch (action.type) {
//     case "INIT":
//       return {
//         ...state,
//         isAuthenticated: action.payload.isAuthenticated,
//         isInitialised: true,
//         user: action.payload.user,
//       };
//     case "LOGIN":
//     case "REGISTER":
//       return {
//         ...state,
//         isAuthenticated: true,
//         user: action.payload.user,
//       };
//     case "LOGOUT":
//       return {
//         ...state,
//         isAuthenticated: false,
//         user: null,
//       };
//     default:
//       return state;
//   }
// };

// const AuthContext = createContext({
//   ...initialState,
//   method: "JWT",
//   login: () => Promise.resolve(),
//   logout: () => {},
//   register: () => Promise.resolve(),
// });

// export const AuthProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(reducer, initialState);

//   // useEffect(() => {
//   //   const initAuth = async () => {
//   //     const jwtToken = localStorage.getItem("jwtToken");

//   //     if (jwtToken && isValidToken(jwtToken)) {
//   //       setSession(jwtToken);

//   //       try {
//   //         const response = await axios.get(`${apiUrl}/api/auth/profile`);
//   //         const { user } = response.data;
//   //         dispatch({
//   //           type: "INIT",
//   //           payload: {
//   //             isAuthenticated: true,
//   //             user,
//   //           },
//   //         });
//   //       } catch (err) {
//   //         dispatch({
//   //           type: "INIT",
//   //           payload: {
//   //             isAuthenticated: false,
//   //             user: null,
//   //           },
//   //         });
//   //       }
//   //     } else {
//   //       dispatch({
//   //         type: "INIT",
//   //         payload: {
//   //           isAuthenticated: false,
//   //           user: null,
//   //         },
//   //       });
//   //     }
//   //   };

//   //   initAuth();
//   // });

//   useEffect(() => {
//     const initAuth = async () => {
//       const jwtToken = localStorage.getItem("jwtToken");

//       if (jwtToken && isValidToken(jwtToken)) {
//         setSession(jwtToken, localStorage.getItem("refreshToken"));

//         try {
//           const response = await axios.get(`${apiUrl}/api/auth/profile`);
//           const { user } = response.data;
//           dispatch({
//             type: "INIT",
//             payload: {
//               isAuthenticated: true,
//               user,
//             },
//           });
//         } catch (err) {
//           dispatch({
//             type: "INIT",
//             payload: {
//               isAuthenticated: false,
//               user: null,
//             },
//           });
//         }
//       } else {
//         dispatch({
//           type: "INIT",
//           payload: {
//             isAuthenticated: false,
//             user: null,
//           },
//         });
//       }
//     };

//     initAuth();
//   }, [apiUrl]); // This effect is triggered on initial load, ensure the token state is updated

//   // const login = async (email, password) => {
//   //   try {
//   //     const response = await axios.post(`${apiUrl}/api/auth/login`, {
//   //       email,
//   //       password,
//   //     });

//   //     if (response.status === 200) {
//   //       const { token, user } = response.data;

//   //       localStorage.setItem("user", JSON.stringify(user));
//   //       setSession(token);

//   //       dispatch({
//   //         type: "LOGIN",
//   //         payload: { user },
//   //       });

//   //       return response;
//   //     } else {
//   //       return response;
//   //     }
//   //   } catch (error) {
//   //     throw error;
//   //   }
//   // };

//   const login = async (email, password) => {
//     try {
//       const response = await axios.post(
//         `${apiUrl}/api/auth/login`,
//         { email, password },
//         {
//           withCredentials: true, // Include credentials with the request
//         }
//       );

//       if (response.status === 200) {
//         const { token, user } = response.data;

//         localStorage.setItem("user", JSON.stringify(user));
//         setSession(token);

//         dispatch({
//           type: "LOGIN",
//           payload: { user },
//         });

//         return response;
//       } else {
//         return response;
//       }
//     } catch (error) {
//       throw error;
//     }
//   };

//   // const register = async (fullname, email, phone, address, password) => {
//   //   try {
//   //     const response = await axios.post(`${apiUrl}/api/auth/signup`, {
//   //       fullname,
//   //       email,
//   //       phone,
//   //       address,
//   //       password, // This matches your backend field for the hashed password
//   //     });

//   //     if (response.status === 201) {
//   //       const { token, user } = response.data;

//   //       // Set the token in session (or localStorage)
//   //       setSession(token);
//   //       localStorage.setItem("user", JSON.stringify(user));

//   //       // Dispatch action to update state
//   //       dispatch({
//   //         type: "REGISTER",
//   //         payload: { user },
//   //       });

//   //       return response;
//   //     } else {
//   //       return response;
//   //     }
//   //   } catch (error) {
//   //     // Handle error
//   //     console.error(
//   //       "Error during registration:",
//   //       error.response?.data?.message || error.message
//   //     );
//   //     throw error;
//   //   }
//   // };

//   // const register = async (
//   //   fullname,
//   //   email,
//   //   password,
//   //   phone = "",
//   //   address = ""
//   // ) => {
//   //   try {
//   //     const response = await axios.post(`${apiUrl}/api/auth/signup`, {
//   //       fullname,
//   //       email,
//   //       password,
//   //       phone, // Optional
//   //       address, // Optional
//   //     });

//   //     if (response.status === 201) {
//   //       const { token, user } = response.data;

//   //       // Save token and user in local storage or context
//   //       setSession(token);
//   //       localStorage.setItem("user", JSON.stringify(user));
//   //       dispatch({
//   //         type: "REGISTER",
//   //         payload: { user },
//   //       });

//   //       return response;
//   //     } else {
//   //       return response;
//   //     }
//   //   } catch (error) {
//   //     console.error(
//   //       "Registration error:",
//   //       error.response?.data?.message || error.message
//   //     );
//   //     throw error;
//   //   }
//   // };
//   const register = async (fullname, email, password) => {
//     try {
//       const payload = { fullname, email, password };

//       const response = await axios.post(`${apiUrl}/api/auth/signup`, payload);

//       if (response.status === 201) {
//         const { token, user } = response.data;
//         setSession(token);
//         localStorage.setItem("user", JSON.stringify(user));
//         dispatch({
//           type: "REGISTER",
//           payload: { user },
//         });
//         return response;
//       } else {
//         return response;
//       }
//     } catch (error) {
//       console.error(
//         "Registration error:",
//         error.response?.data?.message || error.message
//       );
//       throw error;
//     }
//   };

//   const logout = () => {
//     setSession(null);
//     localStorage.removeItem("user");
//     localStorage.removeItem("lastSession");
//     dispatch({ type: "LOGOUT" });
//   };

//   if (!state.isInitialised) {
//     return;
//   }

//   return (
//     <AuthContext.Provider
//       value={{
//         ...state,
//         method: "JWT",
//         login,
//         logout,
//         register,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;
import React, { createContext, useEffect, useReducer } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

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

  // Initialize authentication when the component mounts
  useEffect(() => {
    const initAuth = async () => {
      const jwtToken = localStorage.getItem("jwtToken");

      if (jwtToken && isValidToken(jwtToken)) {
        setSession(jwtToken, localStorage.getItem("refreshToken"));

        try {
          const response = await axios.get(`${apiUrl}/api/auth/profile`);
          const { user } = response.data;
          dispatch({
            type: "INIT",
            payload: {
              isAuthenticated: true,
              user,
            },
          });
        } catch (err) {
          dispatch({
            type: "INIT",
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } else {
        dispatch({
          type: "INIT",
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initAuth();
  }, []); // Run only once when the component mounts

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
    setSession(null); // Clear session and tokens
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
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
    </AuthContext.Provider>
  );
};

export default AuthContext;
