import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes, Navigate } from "react-router";
import { Login } from "./components/Login"; 
import Register from "./components/Register";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Toaster position="top-center" richColors /> 
      <Routes>
        {/* Set Register as the index/first page */}
        <Route path="/" element={<Login />} />
        
        {/* Other routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<App />} />

        {/* Fallback: Redirect unknown paths to Register */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);