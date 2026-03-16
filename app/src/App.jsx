import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from 'react-redux';

import "./App.css"

import { authUser } from "./contexts/userSlice";

const Home = React.lazy(() => import("./pages/home/home"));
const Register = React.lazy(() => import("./pages/register/register"));
const Login = React.lazy(() => import("./pages/login/login"));
const Footer = React.lazy(() => import("./pages/footer/footer"));
const AdminDash = React.lazy(() => import("./pages/dashboards/admin"));
const MemberDash = React.lazy(() => import("./pages/dashboards/member"));
import ProtectedRoute from "./routes/protectedRoute";
import AdminRoute from "./routes/adminRoute";

export const App = () => {
  var perms = "none";
  const { currentUser, loading, err } = useSelector((state) => state.user)
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(authUser())
  }, [])
  if (currentUser) perms = currentUser.perms;

  if (loading) return <div>Loading...</div>;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={
          perms === "none"
          ?
          <div>
            <Login/>
            <Footer/>
          </div>
          : <Navigate to="/"/>
        }/>
        <Route path="/register" element={
          <div>
            <Register/>
            <Footer/>
          </div>
        }/>
        <Route path="/" element={
          <div>
            <Home/>
            <Footer/>
          </div>
        }/>
        <Route path="/dashboard" element={
          perms !== "none"
          ? <Navigate to={`/dashboard/${perms}`}/>
          : <Navigate to="/"/>
        }/>
        <Route path="/dashboard/admin" element={
            <AdminRoute>
                <AdminDash/>
                <Footer/>
            </AdminRoute>
        }/>
        <Route path="/dashboard/member" element={
            <ProtectedRoute>
                <MemberDash/>
                <Footer/>
            </ProtectedRoute>
        }/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;