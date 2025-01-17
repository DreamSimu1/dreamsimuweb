import { useState } from "react";
import logo from "./oga4.png";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSidebar } from "./SidebarProvider";

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
                <h6 className="submenu-hdr">Your Vison Board</h6>
                <ul>
                  <li className="submenu">
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleSubmenu(0);
                      }}
                      className={openSubmenus.has(0) ? "subdrop active" : ""}
                    >
                      <i data-feather="grid"></i>
                      <span>Dashboard</span>
                    </a>
                  </li>
                </ul>
              </li>

              {/*<li className="submenu-open">
                <h6 className="submenu-hdr">Transactions</h6>
                <ul>
                  <li>
                    <a href="https://dreamspos.dreamstechnologies.com/html/template/manage-stocks.html">
                      <i data-feather="package"></i>
                      <span>Admin </span>
                    </a>
                  </li>
                  <li>
                    <a href="https://dreamspos.dreamstechnologies.com/html/template/manage-stocks.html">
                      <i data-feather="package"></i>
                      <span>Manager </span>
                    </a>
                  </li>
                  <li>
                    <a href="https://dreamspos.dreamstechnologies.com/html/template/stock-adjustment.html">
                      <i data-feather="clipboard"></i>
                      <span>Staff </span>
                    </a>
                  </li>
                </ul>
              </li>*/}
            </ul>
          </div>
          <div className="sidebar-overlay" data-reff="#sidebar"></div>
        </div>
      </div>
      {/* Add any additional scripts or components here */}
    </div>
  );
};

export default SideNav;
