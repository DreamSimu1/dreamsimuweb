// import { React, useEffect, useState } from "react";
// // import useFetch from "hooks/useFetch";

// import axios from "axios";
// import TopNav from "../TopNav";
// import useAuth from "../../hooks/useAuth";

// const Profile = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const { user } = useAuth();
//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <div>
//       <body>
//         <div class="main-wrapper">
//           <TopNav />

//           <div class="page-wrapper">
//             <div class="content">
//               <div class="page-header">
//                 <div class="page-title">
//                   <h4>Profile</h4>
//                   <h6>User Profile</h6>
//                 </div>
//               </div>

//               <div class="card">
//                 <div class="card-body">
//                   <div class="profile-set">
//                     <div class="profile-head"></div>
//                     <div class="profile-top">
//                       <div class="profile-content">
//                         <div class="profile-contentimg">
//                           <img
//                             src=""
//                             alt="img"
//                             id="blah"
//                           />
//                           <div class="profileupload">
//                             <input type="file" id="imgInp" />
//                             <a href="javascript:void(0);">
//                               <img
//                                 src=""
//                                 alt="img"
//                               />
//                             </a>
//                           </div>
//                         </div>
//                         <div class="profile-contentname">
//                           <h2>{user.fullname}</h2>
//                           <h4>Updates Your Photo and Personal Details.</h4>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <div class="row">
//                     <div class="col-lg-6 col-sm-12">
//                       <div class="input-blocks">
//                         <label class="form-label">Full Name</label>
//                         <input
//                           type="text"
//                           class="form-control"
//                           value="William"
//                           placeholder="{user.fullname}"
//                         />
//                       </div>
//                     </div>

//                     <div class="col-lg-6 col-sm-12">
//                       <div class="input-blocks">
//                         <label>Email</label>
//                         <input
//                           type="email"
//                           class="form-control"
//                           value="william@example.com"
//                         />
//                       </div>
//                     </div>
//                     <div class="col-lg-6 col-sm-12">
//                       <div class="input-blocks">
//                         <label class="form-label">Phone</label>
//                         <input type="text" value="+1452 876 5432" />
//                       </div>
//                     </div>
//                     <div class="col-lg-6 col-sm-12">
//                       <div class="input-blocks">
//                         <label class="form-label">User Name</label>
//                         <input
//                           type="text"
//                           class="form-control"
//                           value="William Castilo"
//                         />
//                       </div>
//                     </div>
//                     <div class="col-lg-6 col-sm-12">
//                       <div class="input-blocks">
//                         <label class="form-label">Password</label>
//                         <div class="pass-group">
//                           <input
//                             type="password"
//                             class="pass-input form-control"
//                           />
//                           <span class="fas toggle-password fa-eye-slash"></span>
//                         </div>
//                       </div>
//                     </div>
//                     <div class="col-12">
//                       <a href="javascript:void(0);" class="btn btn-submit me-2">
//                         Submit
//                       </a>
//                       <a href="javascript:void(0);" class="btn btn-cancel">
//                         Cancel
//                       </a>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </body>
//     </div>
//   );
// };

// export default Profile;
import React, { useState } from "react";
import TopNav from "../TopNav";
import useAuth from "../../hooks/useAuth";

const Profile = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useAuth(); // Get authenticated user from context

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (!user) {
    return <p>Loading profile...</p>; // Handle case when user data is not yet available
  }

  return (
    <div>
      <div className="main-wrapper">
        <TopNav />

        <div className="page-wrapper">
          <div className="content">
            <div className="page-header">
              <div className="page-title">
                <h4>Profile</h4>
                <h6>User Profile</h6>
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <div className="profile-set">
                  <div className="profile-head"></div>
                  <div className="profile-top">
                    <div className="profile-content">
                      <div className="profile-contentimg">
                        <img
                          src={
                            user.profileImage ||
                            "https://via.placeholder.com/150"
                          }
                          alt="Profile"
                          id="blah"
                        />
                        <div className="profileupload">
                          <input type="file" id="imgInp" />
                          <a href="javascript:void(0);">
                            <img
                              src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/icons/edit-set.svg"
                              alt="Edit"
                            />
                          </a>
                        </div>
                      </div>
                      <div className="profile-contentname">
                        <h2>{user.fullname}</h2>
                        <h4>Update your photo and personal details.</h4>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6 col-sm-12">
                    <div className="input-blocks">
                      <label className="form-label">Full Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={user.fullname}
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 col-sm-12">
                    <div className="input-blocks">
                      <label>Email</label>
                      <input
                        type="email"
                        className="form-control"
                        value={user.email}
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 col-sm-12">
                    <div className="input-blocks">
                      <label className="form-label">Password</label>
                      <div className="pass-group">
                        <input
                          type="password"
                          className="pass-input form-control"
                          value="********"
                          readOnly
                        />
                        <span className="fas toggle-password fa-eye-slash"></span>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <button className="btn btn-submit me-2">Submit</button>
                    <button className="btn btn-cancel">Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
