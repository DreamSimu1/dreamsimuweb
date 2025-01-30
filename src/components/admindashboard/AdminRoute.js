// import React from "react";
// import { Route } from "react-router-dom";
// import AdminDashboard from "./admin/AdminDashboard";
// import ViewAdmin from "./admin/ViewAdmin";
// import AllSale from "./forms/AllSale";
// import Invoice from "./forms/Invoice";
// import Quotation from "./forms/Quotation";
// import AllPurchase from "./forms/AllPurchase";
// import AllExpense from "./forms/AllExpense";
// import AddSale from "./forms/AddSale";
// import Profile from "./forms/Profile";
// import Setting from "./forms/Setting";
// import AllUsers from "./forms/AllUsers";
// import Role from "./forms/Role";
// import Permission from "./forms/Permission";
// import SalesDashboard from "../salesdashboard/sales/SalesDashboard";
// import ViewManager from "./admin/ViewManager";
// import ViewSalesUsers from "./admin/ViewSalesUsers";
// import AddSalesPage from "./forms/AddSalesPage";
// import ViewPoints from "./forms/ViewPoints";
// import ViewDisSales from "./forms/ViewDisSales";
// import ViewDisManager from "./forms/ViewDisManager";
// import JwtRegister from "../sessions/JwtRegister";
// import AuthGuard from "../../auth/AuthGuard";

// const AdminRoute = [
//   {
//     path: "/admin-dashboard",
//     element: (
//       <AuthGuard>
//         <AdminDashboard />
//       </AuthGuard>
//     ),
//   },

//   { path: "/view-admin", element: <ViewAdmin />, auth: "admin" },
//   { path: "/view-manager", element: <ViewManager />, auth: "admin" },
//   {
//     path: "/view-sales-disbursement",
//     element: <ViewDisSales />,
//     auth: "admin",
//   },
//   {
//     path: "/view-manager-disbursement",
//     element: <ViewDisManager />,
//     auth: "admin",
//   },
//   { path: "/view-manager", element: <ViewManager />, auth: "admin" },
//   { path: "/view-sales-operators", element: <ViewSalesUsers />, auth: "admin" },
//   { path: "/sales-dashboard", element: <SalesDashboard />, auth: "admin" },
//   { path: "/sales-list", element: <AllSale />, auth: "admin" },
//   { path: "/invoice-report", element: <Invoice />, auth: "admin" },
//   { path: "/quotation-list", element: <Quotation />, auth: "admin" },
//   { path: "/purchase-list", element: <AllPurchase />, auth: "admin" },
//   { path: "/expense-list", element: <AllExpense />, auth: "admin" },
//   { path: "/add-sales", element: <AddSale />, auth: "admin" },
//   { path: "/view-points", element: <ViewPoints />, auth: "admin" },
//   { path: "/add-sales-page", element: <AddSalesPage />, auth: "admin" },
//   { path: "/profile", element: <Profile />, auth: "admin" },
//   { path: "/settings", element: <Setting />, auth: "admin" },
//   { path: "/all-users", element: <AllUsers />, auth: "admin" },
//   { path: "/role-permission", element: <Role />, auth: "admin" },
//   { path: "/permission", element: <Permission />, auth: "admin" },
// ];

// export default AdminRoute;
import React from "react";
import { Route } from "react-router-dom";
import AdminDashboard from "./admin/AdminDashboard";
import ViewAdmin from "./admin/ViewAdmin";
import AllSale from "./forms/AllSale";
import Invoice from "./forms/Invoice";
import Quotation from "./forms/Quotation";
import AllPurchase from "./forms/AllPurchase";
import AllExpense from "./forms/AllExpense";
import AddSale from "./forms/AddSale";
import Profile from "./forms/Profile";
import Setting from "./forms/Setting";
import AllUsers from "./forms/AllUsers";
import Role from "./forms/Role";
import Permission from "./forms/Permission";
import SalesDashboard from "../salesdashboard/sales/SalesDashboard";
import ViewManager from "./admin/ViewManager";
import ViewSalesUsers from "./admin/ViewSalesUsers";
import AddSalesPage from "./forms/AddSalesPage";
import ViewPoints from "./forms/ViewPoints";
import ViewDisSales from "./forms/ViewDisSales";
import ViewDisManager from "./forms/ViewDisManager";
import JwtRegister from "../sessions/JwtRegister";
import AuthGuard from "../../auth/AuthGuard";
import Idea from "./admin/Idea";
import Refinement from "./admin/Refinement";
import Sprint from "./admin/Sprint";
import AllIdea from "./admin/AllIdea";
import AllRefine from "./admin/AllRefine";
import AllSprint from "./admin/AllSprint";
import Retro from "./admin/Retro";
import TokenHandler from "../sessions/TokenHandler";

const AdminRoute = [
  {
    path: "/vision",
    element: (
      <>
        {/* This will extract and store tokens */}
        <AuthGuard>
          <AdminDashboard />
        </AuthGuard>
      </>
    ),
  },
  {
    path: "/vision-idea/:title",
    element: (
      <AuthGuard>
        <Idea />
      </AuthGuard>
    ),
  },
  {
    path: "/brain-dump",
    element: (
      <AuthGuard>
        <AllIdea />
      </AuthGuard>
    ),
  },
  {
    path: "/refinement",
    element: (
      <AuthGuard>
        <AllRefine />
      </AuthGuard>
    ),
  },
  {
    path: "/sprint",
    element: (
      <AuthGuard>
        <AllSprint />
      </AuthGuard>
    ),
  },
  {
    path: "/retrospect",
    element: (
      <AuthGuard>
        <Retro />
      </AuthGuard>
    ),
  },
  {
    path: "/refinement/:title",
    element: (
      <AuthGuard>
        <Refinement />
      </AuthGuard>
    ),
  },

  // {
  //   path: "/sprint/:ideaId",
  //   element: (
  //     <AuthGuard>
  //       <Sprint />
  //     </AuthGuard>
  //   ),
  // },

  {
    path: "/sprint/:activities",
    element: (
      <AuthGuard>
        <Sprint />
      </AuthGuard>
    ),
  },

  {
    path: "/view-admin",
    element: (
      <AuthGuard>
        <ViewAdmin />
      </AuthGuard>
    ),
  },
  {
    path: "/view-manager",
    element: (
      <AuthGuard>
        <ViewManager />
      </AuthGuard>
    ),
  },
  {
    path: "/view-sales-disbursement",
    element: (
      <AuthGuard>
        <ViewDisSales />
      </AuthGuard>
    ),
  },
  {
    path: "/view-manager-disbursement",
    element: (
      <AuthGuard>
        <ViewDisManager />
      </AuthGuard>
    ),
  },
  {
    path: "/view-sales-operators",
    element: (
      <AuthGuard>
        <ViewSalesUsers />
      </AuthGuard>
    ),
  },
  {
    path: "/sales-dashboard",
    element: (
      <AuthGuard>
        <SalesDashboard />
      </AuthGuard>
    ),
  },
  {
    path: "/sales-list",
    element: (
      <AuthGuard>
        <AllSale />
      </AuthGuard>
    ),
  },
  {
    path: "/invoice-report",
    element: (
      <AuthGuard>
        <Invoice />
      </AuthGuard>
    ),
  },
  {
    path: "/quotation-list",
    element: (
      <AuthGuard>
        <Quotation />
      </AuthGuard>
    ),
  },
  {
    path: "/purchase-list",
    element: (
      <AuthGuard>
        <AllPurchase />
      </AuthGuard>
    ),
  },
  {
    path: "/expense-list",
    element: (
      <AuthGuard>
        <AllExpense />
      </AuthGuard>
    ),
  },
  {
    path: "/add-sales",
    element: (
      <AuthGuard>
        <AddSale />
      </AuthGuard>
    ),
  },
  {
    path: "/view-points",
    element: (
      <AuthGuard>
        <ViewPoints />
      </AuthGuard>
    ),
  },
  {
    path: "/add-sales-page",
    element: (
      <AuthGuard>
        <AddSalesPage />
      </AuthGuard>
    ),
  },
  {
    path: "/profile",
    element: (
      <AuthGuard>
        <Profile />
      </AuthGuard>
    ),
  },
  {
    path: "/settings",
    element: (
      <AuthGuard>
        <Setting />
      </AuthGuard>
    ),
  },
  {
    path: "/all-users",
    element: (
      <AuthGuard>
        <AllUsers />
      </AuthGuard>
    ),
  },
  {
    path: "/role-permission",
    element: (
      <AuthGuard>
        <Role />
      </AuthGuard>
    ),
  },
  {
    path: "/permission",
    element: (
      <AuthGuard>
        <Permission />
      </AuthGuard>
    ),
  },
];

export default AdminRoute;
