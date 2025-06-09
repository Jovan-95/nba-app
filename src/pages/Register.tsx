/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { registerUser } from "../services";
import { useNavigate } from "react-router-dom";
import type { RegisterFormUser, User } from "../types";

function Register() {
  const [userObj, setUserObj] = useState<RegisterFormUser>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // HTTP POST
  const addUserMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (err) => {
      alert("Registration failed!");
    },
  });

  function handleUserReg(e: React.FormEvent) {
    e.preventDefault();
    console.log(userObj);

    // Form validation
    if (
      userObj.username === "" ||
      userObj.email === "" ||
      userObj.password === "" ||
      userObj.confirmPassword === ""
    )
      return alert("Fill all fields!");

    const validateEmail = (email: string): boolean => {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex
      return regex.test(email);
    };

    if (userObj.password.length < 6) {
      return alert("Password is too short!");
    }

    if (userObj.password !== userObj.confirmPassword) {
      return alert("Passwords are not matching!");
    }

    if (!validateEmail(userObj.email)) {
      return alert("Invalid Email!");
    }

    alert("You registration is successfull!");

    const newUser: User = {
      id: Date.now(),
      username: userObj.username,
      email: userObj.email,
      password: userObj.password,
      role: "user",
      favoritesPlayers: [],
      favoritesTeams: [],
    };

    addUserMutation.mutate(newUser);
    navigate("/login");

    // reset fields
    setUserObj({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  }

  function goToLogin() {
    navigate("/login");
  }
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Create Your Account</h2>
        <form className="auth-form">
          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              type="text"
              id="username"
              className="form-input"
              placeholder="Enter username"
              onChange={(e) =>
                setUserObj({ ...userObj, username: e.target.value })
              }
              value={userObj.username}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              id="email"
              className="form-input"
              placeholder="Enter email"
              onChange={(e) =>
                setUserObj({ ...userObj, email: e.target.value })
              }
              value={userObj.email}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              id="password"
              className="form-input"
              placeholder="Enter password"
              onChange={(e) =>
                setUserObj({ ...userObj, password: e.target.value })
              }
              value={userObj.password}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              className="form-input"
              placeholder="Repeat password"
              onChange={(e) =>
                setUserObj({ ...userObj, confirmPassword: e.target.value })
              }
              value={userObj.confirmPassword}
            />
          </div>
          <button onClick={handleUserReg} type="submit" className="auth-button">
            Register
          </button>
        </form>
        <p className="auth-footer">
          Already have an account?
          <a onClick={goToLogin} className="auth-link">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;
