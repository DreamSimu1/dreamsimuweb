import { useState } from "react";
import logo from "./oga4.png";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSidebar } from "./SidebarProvider";
import "./side.css";
import {
  FiHome,
  FiCreditCard,
  FiUsers,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import { useLocation } from "react-router-dom"; // Import useLocation

const SideNav = () => {
  const [openSubmenus, setOpenSubmenus] = useState(new Set());
  const { isSidebarOpen } = useSidebar();
  const toggleSubmenu = (index) => {
    const updatedSubmenus = new Set(openSubmenus);
    if (updatedSubmenus.has(index)) {
      updatedSubmenus.delete(index);
    } else {
      updatedSubmenus.add(index);
    }
    setOpenSubmenus(updatedSubmenus);
  };
  const location = useLocation(); // Get current page path
  const isActive = (path) => location.pathname === path;

  return (
    <div className="main-wrapper">
      <div
        className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}
        id="sidebar"
      >
        <div className="sidebar-inner slimscroll">
          <div id="sidebar-menu" className="sidebar-menu">
            <ul>
              <li className="submenu-open">
                <ul>
                  <li className="submenu">
                    <a
                      href="/vision"
                      className={`${
                        openSubmenus.has(0) ? "subdrop active" : ""
                      } ${isActive("/vision") ? "active-menu" : ""}`.trim()}
                      style={{
                        backgroundColor: isActive("/vision")
                          ? "#dc3545"
                          : "transparent",
                        borderRadius: "5px",
                        padding: "10px",
                      }}
                    >
                      <FiHome
                        size={20}
                        color={isActive("/vision") ? "white" : "black"}
                      />
                      <span
                        style={{
                          fontSize: "18px",
                          color: isActive("/vision") ? "white" : "black",
                        }}
                      >
                        Dashboard
                      </span>
                    </a>
                  </li>
                  <li className="submenu">
                    <a
                      href="/billing"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleSubmenu(1);
                      }}
                      className={`${
                        openSubmenus.has(1) ? "subdrop active" : ""
                      } ${isActive("/billing") ? "active-menu" : ""}`.trim()}
                      style={{
                        backgroundColor: isActive("/billing")
                          ? "#dc3545"
                          : "transparent",
                        borderRadius: "5px",
                        padding: "10px",
                      }}
                    >
                      <FiCreditCard
                        size={20}
                        color={isActive("/billing") ? "white" : "black"}
                      />
                      <span
                        style={{
                          fontSize: "18px",
                          color: isActive("/billing") ? "white" : "black",
                        }}
                      >
                        Billing
                      </span>
                    </a>
                  </li>
                  <li className="submenu">
                    <a
                      href="/community"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleSubmenu(2);
                      }}
                      className={`${
                        openSubmenus.has(2) ? "subdrop active" : ""
                      } ${isActive("/community") ? "active-menu" : ""}`.trim()}
                      style={{
                        backgroundColor: isActive("/community")
                          ? "#dc3545"
                          : "transparent",
                        borderRadius: "5px",
                        padding: "10px",
                      }}
                    >
                      <FiUsers
                        size={20}
                        color={isActive("/community") ? "white" : "black"}
                      />
                      <span
                        style={{
                          fontSize: "18px",
                          color: isActive("/community") ? "white" : "black",
                        }}
                      >
                        Community
                      </span>
                    </a>
                  </li>

                  {/* Settings */}
                  <li className="submenu">
                    <a
                      href="/settings"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleSubmenu(3);
                      }}
                      className={`${
                        openSubmenus.has(3) ? "subdrop active" : ""
                      } ${isActive("/settings") ? "active-menu" : ""}`.trim()}
                      style={{
                        backgroundColor: isActive("/settings")
                          ? "#dc3545"
                          : "transparent",
                        borderRadius: "5px",
                        padding: "10px",
                      }}
                    >
                      <FiSettings
                        size={20}
                        color={isActive("/settings") ? "white" : "black"}
                      />
                      <span
                        style={{
                          fontSize: "18px",
                          color: isActive("/settings") ? "white" : "black",
                        }}
                      >
                        Settings
                      </span>
                    </a>
                  </li>
                  <li className="submenu">
                    <a href="#">
                      <FiLogOut size={20} color="black" />
                      <span style={{ fontSize: "18px", color: "black" }}>
                        Logout
                      </span>
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="sidebar-overlay" data-reff="#sidebar"></div>
        </div>
      </div>

      {/* Bottom Navigation for Mobile */}
      <div className="bottom-nav mobile-only">
        <ul className="nav">
          <li className="nav-item">
            <a href="/vision">
              <FiHome />
              <span>Home</span>
            </a>
          </li>
          <li className="nav-item">
            <a href="/billing">
              <FiCreditCard />
              <span>Billing</span>
            </a>
          </li>
          <li className="nav-item">
            <a href="/community">
              <FiUsers />
              <span>Community</span>
            </a>
          </li>
          <li className="nav-item">
            <a href="/settings">
              <FiSettings />
              <span>Settings</span>
            </a>
          </li>
          <li className="nav-item">
            <a href="#">
              <FiLogOut />
              <span>Logout</span>
            </a>
          </li>
        </ul>
      </div>

      {/* Add any additional scripts or components here */}
    </div>
  );
};

export default SideNav;
