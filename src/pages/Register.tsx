function Register() {
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
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              id="email"
              className="form-input"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              id="password"
              className="form-input"
              placeholder="Enter password"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              className="form-input"
              placeholder="Repeat password"
            />
          </div>
          <button type="submit" className="auth-button">
            Register
          </button>
        </form>
        <p className="auth-footer">
          Already have an account?
          <a href="/login" className="auth-link">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;
