import { NavLink } from "react-router-dom";
import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">
          <svg width="28" height="28">
            <use href="/sprite.svg#icon-flag" />
          </svg>
          <span>LearnLingo</span>
        </div>
        <nav className="nav">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/teachers">Teachers</NavLink>
        </nav>
      </div>
      <div className="auth">
        <button className="login-btn">
          <svg width="20" height="20">
            <use href="/sprite.svg#icon-login" />
          </svg>
          Log in
        </button>
        <button className="register-btn">Registration</button>
      </div>
    </header>
  );
}
