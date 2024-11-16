import './Signup.css';

const SignupPage = () => {
  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2>Create an Account</h2>
        <form>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" placeholder="Enter your username" />

          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Enter your email" />

          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Enter your password" />

          <button type="submit">Sign Up</button>
        </form>
        <div className="login-link">
          Already have an account? <a href="/login">Login here</a>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
