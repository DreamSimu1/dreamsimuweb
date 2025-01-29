import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import googlelogo from "./googlelogo.svg";
import micro from "./micro.svg";
import apple from "./apple.svg";
// const GoogleOauth = () => {
//   const navigate = useNavigate();
//   const apiUrl = process.env.REACT_APP_API_URL;
//   const onSuccess = async (response) => {
//     const googleToken = response.credential;

//     try {
//       // Send the googleToken to your backend for verification and login
//       const res = await fetch("http://localhost:8000/api/auth/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ googleToken }),
//       });

//       const data = await res.json();

//       if (data.token) {
//         // Store JWT token (you can use localStorage or cookies)
//         localStorage.setItem("token", data.token);

//         // Redirect user to the dashboard or desired route
//         navigate("/vision");
//       } else {
//         console.error("Google login failed");
//       }
//     } catch (error) {
//       console.error("Error during Google login:", error);
//     }
//   };

//   const onFailure = (error) => {
//     console.error("Google login failed:", error);
//   };

//   return <GoogleLogin onSuccess={onSuccess} onFailure={onFailure} useOneTap />;
// };

// const GoogleOauth = () => {
//   const googleLoginUrl = "http://localhost:8000/api/google";

//   const redirectToGoogle = () => {
//     window.location.href = googleLoginUrl; // Redirect to backend's Google OAuth
//   };

//   return <button onClick={redirectToGoogle}>Continue with Google</button>;
// };

// export default GoogleOauth;
import { useEffect } from "react";

const GoogleOauth = () => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const googleLoginUrl = `${apiUrl}/api/google`;

  const redirectToGoogle = () => {
    window.location.href = googleLoginUrl; // Redirect to backend's Google OAuth
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("accessToken");
    const refreshToken = urlParams.get("refreshToken");

    if (accessToken && refreshToken) {
      // Store the tokens in localStorage
      localStorage.setItem("jwtToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
    }
  }, []);

  return (
    <button
      onClick={redirectToGoogle}
      type="button"
      className="btn btn-microsoft d-flex align-items-center justify-content-center mb-2"
      style={{
        width: "100%",
        backgroundColor: "#fff",
        color: "black",
        border: "1px solid black",
      }}
    >
      <img
        src={googlelogo}
        alt="Google Logo"
        style={{
          width: "25px",
          height: "25px",
          marginRight: "10px",
        }}
      />
      Continue with Google
    </button>
  );
};

export default GoogleOauth;
