// import { useNavigate } from "react-router-dom";
// import { Field, Formik } from "formik";
// import { useEffect, useState } from "react";
// import { NavLink } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";
// import useAuth from "../hooks/useAuth";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { AiFillGoogleCircle, AiFillApple, AiFillWindows } from "react-icons/ai";
// import "font-awesome/css/font-awesome.min.css";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// import "./login.css";
// import googlelogo from "./googlelogo.svg";
// import micro from "./micro.svg";
// import apple from "./apple.svg";

// import * as Yup from "yup";
// // inital login credentials
// const initialValues = {
//   email: "",
//   password: "",
//   fullname: "",
//   company_name: "",
//   phone: "",
//   address: "",
//   remember: true,
// };

// const validationSchema = Yup.object().shape({
//   password: Yup.string()
//     .min(6, "Password must be 6 character length")
//     .required("Password is required!"),
//   // email: Yup.string()
//   //   .email("Invalid Email address")
//   //   .required("Email is required!"),
//   // username: Yup.string()
//   //   .email("Invalid Username")
//   //   .required("Username is required!"),
// });
// const JwtRegister = () => {
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const { register } = useAuth();

//   const apiUrl = process.env.REACT_APP_API_URL;
//   const handleFormSubmit = async (values) => {
//     console.log("handleFormSubmit is triggered");

//     try {
//       // Assuming your login function returns a JWT token upon successful login
//       const response = await register(values.identifier, values.password);

//       if (response.status === 200) {
//         // Successful login
//         // Redirect the user after successful login

//         checkUserRoleAndRedirect();
//         toast.success("Regisrer successful!");
//       } else {
//         // Handle other status codes (e.g., 401 for unauthorized)
//         toast.error("Invalid credentials"); // Display an error notification
//         console.error("Login failed with status:", response.status);
//       }
//     } catch (error) {
//       console.error("Incorrect Username/Email or Password:", error);
//       toast.error("Incorrect Username/Email or Password");
//     }
//   };

//   const getUserRoleFromToken = () => {
//     // Implement this function to extract the user's role from the JWT token.
//     const jwtToken = localStorage.getItem("jwtToken");
//     if (jwtToken) {
//       const decodedToken = jwtDecode(jwtToken);
//       return decodedToken.role;
//     }
//     return "guest"; // Return a default role for unauthenticated users
//   };

//   const checkUserRoleAndRedirect = () => {
//     const userRole = getUserRoleFromToken();

//     if (userRole === "admin") {
//       navigate("/admin-dashboard");
//     } else if (userRole === "manager") {
//       navigate("/dashboard/manager-dashboard");
//     } else if (userRole === "sales") {
//       navigate("/dashboard/sales-dashboard");
//     } else {
//       navigate("/session/signin"); // Redirect unauthenticated users to sign-in page
//     }
//   };
//   return (
//     <>
//       <ToastContainer position="top-center" />
//       <body class="account-page">
//         <div class="main-wrapper">
//           <div class="account-content">
//             <div class="login-wrapper bg-img">
//               <div class="login-content logos">
//                 <Formik
//                   onSubmit={handleFormSubmit}
//                   initialValues={initialValues}
//                   validationSchema={validationSchema}
//                 >
//                   {({
//                     values,
//                     errors,
//                     touched,
//                     handleChange,
//                     handleBlur,
//                     handleSubmit,
//                   }) => (
//                     <form onSubmit={handleSubmit}>
//                       <div class="login-userset">
//                         <div class="login-userheading">
//                           <div className="logo">
//                             <p
//                               style={{
//                                 fontSize: "40px",
//                                 fontWeight: "800",
//                                 textAlign: "center",
//                               }}
//                             >
//                               {" "}
//                               DreamSimu{" "}
//                             </p>
//                           </div>
//                           <h3
//                             style={{
//                               fontSize: "20px",
//                               fontWeight: "800",
//                               textAlign: "center",
//                             }}
//                           >
//                             Signup to continue
//                           </h3>
//                           {/*} <h4>
//                             Keep your visions, dream in a safe place and see how
//                             you can achieve it with DreamSimu
//                           </h4>*/}
//                         </div>
//                         <div class="form-login mb-3">
//                           <label class="form-label">Email Address</label>
//                           <div class="form-addons">
//                             <input
//                               type="text"
//                               value={values.email}
//                               name="email"
//                               onChange={handleChange}
//                               class="form- control"
//                               placeholder="Enter your email"
//                             />
//                           </div>
//                         </div>
//                         <div class="form-login mb-3">
//                           <label class="form-label">Full Name</label>
//                           <div class="form-addons">
//                             <input
//                               type="text"
//                               value={values.fullname}
//                               name="fullname"
//                               onChange={handleChange}
//                               class="form- control"
//                               placeholder="Enter your full name"
//                             />
//                           </div>
//                         </div>
//                         <div class="form-login mb-3">
//                           <label class="form-label">Password</label>
//                           <div className="pass-group">
//                             <input
//                               value={values.password}
//                               onChange={handleChange}
//                               name="password"
//                               type={showPassword ? "text" : "password"}
//                               className="pass-input form-control"
//                             />
//                             <span
//                               className="toggle-password"
//                               onClick={() => setShowPassword(!showPassword)}
//                             >
//                               {showPassword ? (
//                                 <AiOutlineEyeInvisible />
//                               ) : (
//                                 <AiOutlineEye />
//                               )}
//                             </span>
//                           </div>
//                         </div>

//                         <div class="form-login authentication-check">
//                           <div class="row">
//                             <div class="col-12 d-flex align-items-center justify-content-between">
//                               <div class="custom-control custom-checkbox">
//                                 <label class="checkboxs ps-4 mb-0 pb-0 line-height-1">
//                                   <input type="checkbox" class="form-control" />
//                                   <span class="checkmarks"></span>Remember me
//                                 </label>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                         <div class="form-login" style={{ width: "100%" }}>
//                           <button
//                             loading={loading}
//                             type="submit"
//                             class="btn btn-login"
//                             style={{ width: "100%" }}
//                           >
//                             Sign Up
//                           </button>
//                         </div>
//                         <h5
//                           style={{
//                             textAlign: "center",
//                             color: "black",
//                             marginBottom: "20px",
//                           }}
//                         >
//                           Or continue with{" "}
//                         </h5>
//                         <div class="form-login social-login-buttons">
//                           <button
//                             type="button"
//                             class="btn btn-microsoft d-flex align-items-center justify-content-center mb-2"
//                             style={{
//                               width: "100%",
//                               backgroundColor: "#fff",
//                               color: "black",
//                               border: "1px solid black",
//                             }}
//                           >
//                             <img
//                               src={googlelogo}
//                               alt=""
//                               style={{
//                                 width: "25px",
//                                 height: "25px",
//                                 marginRight: "10px",
//                               }}
//                             />
//                             Continue with Google
//                           </button>
//                           <button
//                             type="button"
//                             class="btn btn-microsoft d-flex align-items-center justify-content-center mb-2"
//                             style={{
//                               width: "100%",
//                               backgroundColor: "#fff",
//                               color: "black",
//                               border: "1px solid black",
//                             }}
//                           >
//                             <img
//                               src={micro}
//                               alt=""
//                               style={{
//                                 width: "25px",
//                                 height: "25px",
//                                 marginRight: "10px",
//                               }}
//                             />
//                             Continue with Microsoft
//                           </button>
//                           <button
//                             type="button"
//                             class="btn btn-apple d-flex align-items-center justify-content-center"
//                             style={{
//                               width: "100%",
//                               backgroundColor: "#fff",
//                               color: "black",
//                               border: "1px solid black",
//                             }}
//                           >
//                             <img
//                               src={apple}
//                               alt=""
//                               style={{
//                                 width: "25px",
//                                 height: "25px",
//                                 marginRight: "10px",
//                               }}
//                             />
//                             Continue with Apple
//                           </button>
//                         </div>
//                         <div
//                           style={{
//                             display: "flex",
//                             justifyContent: "flex-end",
//                             gap: "1rem",
//                           }}
//                         >
//                           <div class="text-end">
//                             <a
//                               class="forgot-link"
//                               href="/session/forgot-password"
//                             >
//                               Already have an account?
//                             </a>
//                           </div>
//                           <div class="text-end">
//                             <a class="forgot-link" href="/login">
//                               Login
//                             </a>
//                           </div>
//                         </div>
//                         {/*} <div class="signinform">
//                       <h4>
//                         New on our platform?
//                         <a
//                           href="https://dreamspos.dreamstechnologies.com/html/template/register.html"
//                           class="hover-a"
//                         >
//                           {" "}
//                           Create an account
//                         </a>
//                       </h4>
//                     </div>*/}
//                         {/*}   <div class="form-setlogin or-text">
//                       <h4>OR</h4>
//                     </div>
//                     <div class="form-sociallink">
//                       <ul class="d-flex">
//                         <li>
//                           <a href="javascript:void(0);" class="facebook-logo">
//                             <img
//                               src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/icons/facebook-logo.svg"
//                               alt="Facebook"
//                             />
//                           </a>
//                         </li>
//                         <li>
//                           <a href="javascript:void(0);">
//                             <img
//                               src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/icons/google.png"
//                               alt="Google"
//                             />
//                           </a>
//                         </li>
//                         <li>
//                           <a href="javascript:void(0);" class="apple-logo">
//                             <img
//                               src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/icons/apple-logo.svg"
//                               alt="Apple"
//                             />
//                           </a>
//                         </li>
//                       </ul>
//                       <div class="my-4 d-flex justify-content-center align-items-center copyright-text">
//                         <p>
//                           Copyright &copy; 2023 DreamsPOS. All rights reserved
//                         </p>
//                       </div>
//                     </div>*/}
//                       </div>
//                     </form>
//                   )}
//                 </Formik>
//               </div>
//             </div>
//           </div>
//         </div>
//       </body>
//     </>
//   );
// };

// export default JwtRegister;
import { useNavigate } from "react-router-dom";
import { Field, Formik } from "formik";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import useAuth from "../hooks/useAuth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiFillGoogleCircle, AiFillApple, AiFillWindows } from "react-icons/ai";
import "font-awesome/css/font-awesome.min.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import "./login.css";
import googlelogo from "./googlelogo.svg";
import micro from "./micro.svg";
import apple from "./apple.svg";
import * as Yup from "yup";

const initialValues = {
  email: "",
  password: "",
  fullname: "",
  phone: "",
  address: "",
};

const validationSchema = Yup.object().shape({
  fullname: Yup.string().required("Full name is required!"),
  email: Yup.string()
    .email("Invalid Email address")
    .required("Email is required!"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required!"),
  phone: Yup.string(),
  address: Yup.string(),
});

const JwtRegister = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();

  const handleFormSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await register(
        values.fullname,
        values.email,
        values.password,
        values.phone,
        values.address
      );

      if (response.status === 201) {
        toast.success("Registration successful!");
        navigate("/login");
      } else {
        toast.error("Registration failed!");
      }
    } catch (error) {
      toast.error("An error occurred during registration.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer position="top-center" />
      <div className="main-wrapper">
        <div className="account-content">
          <div className="login-wrapper bg-img">
            <div className="login-content logos">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleFormSubmit}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <div className="login-userset">
                      <div className="login-userheading">
                        <div className="logo">
                          <p
                            style={{
                              fontSize: "30px",
                              fontWeight: "800",
                              textAlign: "center",
                              color: "black",
                            }}
                          >
                            {" "}
                            Let's sign you in
                          </p>
                        </div>
                        <h3
                          style={{
                            fontSize: "20px",
                            fontWeight: "800",
                            textAlign: "center",
                          }}
                        >
                          Welcome back, you have been missed
                        </h3>
                      </div>
                      <div className="form-login mb-3">
                        <label className="form-label">Full Name</label>
                        <input
                          type="text"
                          name="fullname"
                          value={values.fullname}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="form-control"
                          placeholder="Enter your full name"
                        />
                        {touched.fullname && errors.fullname && (
                          <small className="text-danger">
                            {errors.fullname}
                          </small>
                        )}
                      </div>
                      <div className="form-login mb-3">
                        <label className="form-label">Email Address</label>
                        <input
                          type="email"
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="form-control"
                          placeholder="Enter your email"
                        />
                        {touched.email && errors.email && (
                          <small className="text-danger">{errors.email}</small>
                        )}
                      </div>
                      <div className="form-login mb-3">
                        <label className="form-label">Password</label>
                        <div className="pass-group">
                          <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="form-control"
                          />
                          <span
                            className="toggle-password"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <AiOutlineEyeInvisible />
                            ) : (
                              <AiOutlineEye />
                            )}
                          </span>
                        </div>
                        {touched.password && errors.password && (
                          <small className="text-danger">
                            {errors.password}
                          </small>
                        )}
                      </div>
                      <div className="form-login mb-3">
                        <label className="form-label">Phone (Optional)</label>
                        <input
                          type="text"
                          name="phone"
                          value={values.phone}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="form-control"
                          placeholder="Enter your phone number"
                        />
                      </div>
                      <div className="form-login mb-3">
                        <label className="form-label">Address (Optional)</label>
                        <input
                          type="text"
                          name="address"
                          value={values.address}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="form-control"
                          placeholder="Enter your address"
                        />
                      </div>
                      <div className="form-login" style={{ width: "100%" }}>
                        <button
                          type="submit"
                          className="btn btn-login"
                          style={{ width: "100%" }}
                          disabled={loading}
                        >
                          {loading ? "Signing Up..." : "Sign Up"}
                        </button>
                      </div>
                      <div className="text-end mt-3">
                        <a href="/login" className="forgot-link">
                          Already have an account? Login
                        </a>
                      </div>
                    </div>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JwtRegister;
