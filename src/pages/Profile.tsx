import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { editUser, getUsers } from "../services";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import type { User } from "../types";
import Modal from "../components/Modal";
import { useState } from "react";
import { showErrorToast, showSuccessToast } from "../components/Toast";

/* eslint-disable @typescript-eslint/no-unused-vars */
function Profile() {
  const [modal, setModal] = useState<boolean>(false);
  const queryClient = useQueryClient();
  // Find current logged user
  const loggedUser = useSelector((state: RootState) => state.auth.loggedInUser);

  // Edit user fields
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Get users from services with reactQuery
  const {
    data: users,
    isLoading: isLoadingUsers,
    error: usersError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  // Patch HTTP method Edit user
  const { mutate: editUserFormFields } = useMutation({
    mutationFn: ({
      userId,
      editedObj,
    }: {
      userId: string;
      editedObj: Partial<User>; // Use Partial<User> for type safety
    }) => editUser(userId, editedObj),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });

  if (isLoadingUsers) return <p>Loading...</p>;
  if (usersError) return <p>{usersError.message}</p>;
  if (!users) return <p>No data found.</p>;

  // Find current user on Backend
  const currentUser = users.find(
    (user: User) => Number(user.id) === Number(loggedUser?.id)
  );

  // Edit modal
  function handleEditModal() {
    setModal((prev) => !prev);
    setUsername(currentUser.username);
    setEmail(currentUser.email);
    setPassword(currentUser.password); // Assuming you store plain text (in real apps, don't)
    setConfirmPassword(currentUser.password);
  }

  // Submit EDITED obj
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (password !== confirmPassword) {
      return showErrorToast("Passwords do not match");
    }

    if (!username || !email || !password) {
      return showErrorToast("All fields are required");
    }

    const editedObj = {
      username,
      email,
      password,
    };

    console.log("Sending PATCH for user:", currentUser.id, editedObj); // ✅ check this

    editUserFormFields({ userId: currentUser.id, editedObj });
    showSuccessToast("Changes are saved!");
    setModal(false);
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-avatar">
          {/* <!-- Optional user avatar --> */}
          <img src="https://via.placeholder.com/120" alt="User Avatar" />
        </div>
        <div className="profile-info">
          <h2 className="profile-name">{currentUser.username}</h2>
          <p className="profile-email">{currentUser.email}</p>
          <span className="profile-role">{currentUser.role}</span>
        </div>
        <div className="profile-actions">
          <button onClick={handleEditModal} className="btn edit-btn">
            Edit Profile
          </button>
        </div>
      </div>
      <div className={modal ? "d-block" : "d-none"}>
        <Modal>
          <div
            onClick={() => setModal(false)}
            style={{ textAlign: "right", cursor: "pointer" }}
          >
            X
          </div>
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label className="form-label">Username</label>
              <input
                type="text"
                id="username"
                className="form-input"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                id="email"
                className="form-input"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                id="password"
                className="form-input"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                className="form-input"
                placeholder="Repeat password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="auth-button">
              Save
            </button>
          </form>
        </Modal>
      </div>
    </div>
  );
}

export default Profile;
