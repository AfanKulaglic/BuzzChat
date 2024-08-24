import React, { useState } from "react";

interface MobileAuthFormProps {
  email: string;
  password: string;
  error: string | null;
  isLogin: boolean;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  handleLogin: (e: React.FormEvent<HTMLFormElement>) => void;
  handleRegister: (e: React.FormEvent<HTMLFormElement>) => void;
}

const MobileAuthForm: React.FC<MobileAuthFormProps> = ({
  email,
  password,
  error,
  isLogin,
  setEmail,
  setPassword,
  setIsLogin,
  handleLogin,
  handleRegister,
}) => {
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [registerError, setRegisterError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleRegisterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setRegisterError("Passwords do not match");
      return;
    }
    handleRegister(e);
  };

  return (
    <div className="auth-container">
      {isLogin ? (
        <form onSubmit={handleLogin} className="auth-form">
          <h2>Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            className="auth-form-input"
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          <label className="checkbox">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <span>Show Password</span>
          </label>
          <button type="submit">Login</button>
          {error && <p className="auth-error">{error}</p>}
          <p className="auth-toggle-text">
            Don't have an account?{" "}
            <span onClick={() => setIsLogin(false)} className="auth-link">
              Register now
            </span>
          </p>
        </form>
      ) : (
        <form onSubmit={handleRegisterSubmit} className="auth-form">
          <h2>Registration</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
          />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete="new-password"
          />
          <label className="checkbox">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <span>Show Password</span>
          </label>
          <button type="submit">Register</button>
          {registerError && <p className="auth-error">{registerError}</p>}
          {error && <p className="auth-error">{error}</p>}
          <span className="auth-toggle-text">
            Already have an account?{" "}
            <span onClick={() => setIsLogin(true)} className="auth-link">
              Login here
            </span>
          </span>
        </form>
      )}
    </div>
  );
};

export default MobileAuthForm;
