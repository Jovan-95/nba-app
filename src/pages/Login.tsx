/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { LoggedUserForm, User } from "../types";
import { getUsers } from "../services";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { addLoggedUser } from "../redux/authSlice";
import { showErrorToast, showSuccessToast } from "../components/Toast";

function Login() {
  const [loggedInUser, setLoggedInUser] = useState<LoggedUserForm>({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Getting users from services with reactQuery
  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  // Login
  function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    // Finding user on BE
    const user = data.find(
      (user: User) =>
        user.username === loggedInUser.username &&
        user.password === loggedInUser.password
    );

    if (!user) {
      showErrorToast("Wrong credentials");
      return;
    }

    if (user) {
      showSuccessToast("Credentials are matching!");
      dispatch(addLoggedUser(user));
      navigate("/teams");
    }

    console.log(user);
  }

  function goToRegister(): void {
    navigate("/");
  }

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Login</h2>
        <form className="auth-form">
          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              onChange={(e) =>
                setLoggedInUser({ ...loggedInUser, username: e.target.value })
              }
              value={loggedInUser.username}
              type="text"
              id="username"
              className="form-input"
              placeholder="Enter username"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              onChange={(e) =>
                setLoggedInUser({ ...loggedInUser, password: e.target.value })
              }
              value={loggedInUser.password}
              type="password"
              id="password"
              className="form-input"
              placeholder="Enter password"
            />
          </div>

          <button onClick={handleLogin} type="submit" className="auth-button">
            Login
          </button>
        </form>
        <p className="auth-footer">
          Don't have an account?{" "}
          <a onClick={goToRegister} className="auth-link">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
