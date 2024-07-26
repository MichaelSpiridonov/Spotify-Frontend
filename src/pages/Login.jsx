export function Login() {
  return (
    <div class="login-container-wrapper">
    <div className="login-container">
      <img
        src="../assets/icons/beatify_favicon_32.png"
        alt="Beatify Logo"
      />
      <h1>Log in to Beatify</h1>
      <div className="login-form">
        <input type="text" placeholder="Email or username" />
        <input type="password" placeholder="Password" />
        <label>
          <input type="checkbox" />
          Remember me
        </label>
      </div>
      <button class="login-button">Log In</button>
      <a href="#" className="forgot-password">
        Forgot your password?
      </a>
      <a href="#" className="signup-link">
        Don't have an account? Sign up for Beatify
      </a>
    </div>
    </div>
  )
}
