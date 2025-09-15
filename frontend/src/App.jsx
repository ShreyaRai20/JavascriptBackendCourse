// src/App.js

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Login from "./components/Login";
import Register from "./components/Register";
import PrivateRoute from "./components/PrivateRoutes";
import { logoutUser } from "./features/auth/authSlice";
import Counter from "./components/Counter";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      <h1>Welcome, {user?.fullName || "User"} 🎉</h1>
      <Counter />
      <button onClick={() => dispatch(logoutUser())}>Logout</button>
    </div>
  );
};

const App = () => {
  const { accessToken } = useSelector((state) => state.auth);

  return (
    <Router>
      <nav style={{ marginBottom: "20px" }}>
        <Link to="/login" style={{ margin: "0 10px" }}>
          Login
        </Link>
        <Link to="/register" style={{ margin: "0 10px" }}>
          Register
        </Link>
        {accessToken && (
          <Link to="/dashboard" style={{ margin: "0 10px" }}>
            Dashboard
          </Link>
        )}
      </nav>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
