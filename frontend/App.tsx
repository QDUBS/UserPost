import { Routes, Route, Navigate } from "react-router-dom";
import UsersPage from "./src/pages/UsersPage";
import { ToastContainer } from "react-toastify";
import UserPostsPage from "./src/pages/UserPostsPage";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Routes>
        <Route path="/" element={<Navigate to="/users" />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/users/:id" element={<UserPostsPage />} />
      </Routes>
    </>
  );
}
