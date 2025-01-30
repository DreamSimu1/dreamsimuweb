// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import About from "./pages/About";
// import Home from "./pages/Home";
// import Login from "./pages/Login";

// function App() {
//   return (
//     <div className="App">
//       <Router>
//         <Routes>
//           <Route exact path="/" element={<Login />} />
//         </Routes>
//       </Router>
//     </div>
//   );
// }

// export default App;

import React, { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import routes from "./routes";
import { AuthProvider } from "./components/contexts/JWTAuthContext";
import { SidebarProvider } from "./components/admindashboard/SidebarProvider";
import { GoogleOAuthProvider } from "@react-oauth/google"; // Import the provider
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function App() {
  const content = useRoutes(routes);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("GoogleOauth useEffect triggered");
    console.log("Full URL:", window.location.href);

    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("accessToken");
    const refreshToken = urlParams.get("refreshToken");

    console.log("Extracted Tokens from URL:", { accessToken, refreshToken });

    if (accessToken && refreshToken) {
      console.log("Tokens found! Storing them in localStorage.");
      localStorage.setItem("jwtToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

      console.log("Tokens saved! Navigating to /vision...");
      navigate("/vision", { replace: true });
    } else {
      console.log("No valid tokens found in URL. Staying on /login.");
    }
  }, [navigate]);

  return (
    <div>
      <SidebarProvider>
        <AuthProvider>
          <GoogleOAuthProvider clientId="383086754449-8p3mg46a39tsepkgd47uof98qu32cmn5.apps.googleusercontent.com">
            {content} {/* Wrap routes with a single AuthProvider */}
          </GoogleOAuthProvider>
        </AuthProvider>
      </SidebarProvider>
    </div>
  );
}

export default App;
