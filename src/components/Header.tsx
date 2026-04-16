import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Modal from "./Modal";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import "./Header.css";

export default function Header() {
  const { user, logoutUser } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
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
        {user ? (
          <button className="login-btn" onClick={logoutUser}>
            Log out
          </button>
        ) : (
          <>
            <button className="login-btn" onClick={() => setShowLogin(true)}>
              <svg width="20" height="20">
                <use href="/sprite.svg#icon-login" />
              </svg>
              Log in
            </button>
            <button
              className="register-btn"
              onClick={() => setShowRegister(true)}
            >
              Registration
            </button>
          </>
        )}
      </div>
      {showLogin && (
        <Modal onClose={() => setShowLogin(false)}>
          <LoginForm onClose={() => setShowLogin(false)} />
        </Modal>
      )}
      {showRegister && (
        <Modal onClose={() => setShowRegister(false)}>
          <RegisterForm onClose={() => setShowRegister(false)} />
        </Modal>
      )}
    </header>
  );
}
