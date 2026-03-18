import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';

import { authUser } from "./contexts/userSlice";

import "./App.css"

const Home = React.lazy(() => import("./pages/home/home"));
const Register = React.lazy(() => import("./pages/register/register"));
const Login = React.lazy(() => import("./pages/login/login"));
const Footer = React.lazy(() => import("./pages/footer/footer"));
const Sidebar = React.lazy(() => import("./pages/sidebar/sidebar"));
const AdminDash = React.lazy(() => import("./pages/dashboards/admin"));
const MemberDash = React.lazy(() => import("./pages/dashboards/member"));
import ProtectedRoute from "./routes/protectedRoute";
import AdminRoute from "./routes/adminRoute";

export const App = () => {
  var perms = 0;
  const { currentUser, loading, err } = useSelector((state) => state.user)
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(authUser())
  }, [])
  if (currentUser) perms = currentUser.perms;

  if (loading) return <div>Loading...</div>;
  return (
    <BrowserRouter>
      <div className="screen-container">
        <Sidebar/>
        <div className="content-container">
          <div className="route-container">
            <Routes>
              <Route path="/login" element={
                perms === 0
                ? <Login/>
                : <Navigate to="/"/>
              }/>
              <Route path="/register" element={<Register/>}/>
              <Route path="/" element={<Home/>}/>
              <Route path="/dashboard" element={
                perms !== 0
                ? <Navigate to={`/dashboard/${perms === 1 ? "member" : "admin"}`}/>
                : <Navigate to="/"/>
              }/>
              <Route path="/dashboard/admin" element={
                  <AdminRoute>
                      <AdminDash/>
                  </AdminRoute>
              }/>
              <Route path="/dashboard/member" element={
                  <ProtectedRoute>
                      <MemberDash/>
                  </ProtectedRoute>
              }/>
            </Routes>
          </div>
          <Footer/>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;