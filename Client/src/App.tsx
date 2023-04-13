import React from "react";
import logo from "./logo.svg";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import Login from "./Pages/login";
import SignUp from "./Pages/SignUp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import Chats from "./Pages/Chat";
import SetAvatar from "./Components/setAvatar";

function App() {
  const { user, token, loading, error, success, message } = useSelector(
    (state: any) => state.auth
  );

  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route
            path="/"
            element={user ? <Chats /> : <Navigate to={"../login"} />}
          />
          <Route path="/setAvatar" element={<SetAvatar />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
