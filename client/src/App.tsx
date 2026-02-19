import { Route, Routes } from "react-router-dom"

import React from 'react';
import ProtectedRoute from "./components/layout/ProtectedRoute"
import PublicRoute from "./components/layout/PublicRoute"

// Lazy load the components
const AppWrapper = React.lazy(() => import("./components/layout/AppWrapper"));

// Lazy load the pages
const Attendance = React.lazy(() => import("./pages/Attendance"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const DisplayLog = React.lazy(() => import("./pages/DisplayLog"));
const Login = React.lazy(() => import("./pages/Login"));

export default function App() {
  return (
    <Routes>
      {/* ACCESSIBLE IF LOGGED IN */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AppWrapper />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/students" element={<h1>HELLO</h1>} />
        </Route>
      </Route>

      {/* ACCESSIBLE REGARDLESS OF AUTH */}
      <Route path="/display" element={<DisplayLog />} />

      {/* ACCESSIBLE IF NOT LOGGED IN */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>

  )
}
