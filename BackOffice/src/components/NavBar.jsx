import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Ajuste o caminho conforme necessário
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faSignOutAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import logo from '../assets/images/Logo.ico'; // Importando o logotipo

const NavBar = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const { isAuthenticated, nivelAcesso, email, logout } = useAuth(); // Usar o hook para acessar o estado de autenticação
  const location = useLocation();

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  const isActive = (path) => {
    return location.pathname.startsWith(path);
  };

  // Debugging: Verifique o valor de nivelAcesso
  console.log("Nível de Acesso:", nivelAcesso);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <img src={logo} alt="Logo" style={{ height: '60px', marginRight: '8px' }} /> {/* Logotipo */}
          IASP
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          aria-controls="navbarContent"
          aria-expanded={!isNavCollapsed}
          aria-label="Toggle navigation"
          onClick={handleNavCollapse}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`collapse navbar-collapse ${
            !isNavCollapsed ? "show" : ""
          }`}
          id="navbarContent"
        >
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link
                to="/"
                className={`nav-link ${
                  isActive("/")
                    ? "active fw-bold text-decoration-underline"
                    : ""
                }`}
              >
                Home
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link
                to="/sobre"
                className={`nav-link ${
                  isActive("/sobre")
                    ? "active fw-bold text-decoration-underline"
                    : ""
                }`}
              >
                Sobre
              </Link>
            </li> */}
            {isAuthenticated &&
              nivelAcesso === "ADMINISTRADOR" && ( // Verifica se o usuário é autenticado e se o nível de acesso é ADMINISTRATOR
                <li className="nav-item">
                  <Link
                    to="/administracao"
                    className={`nav-link ${
                      isActive("/administracao")
                        ? "active fw-bold text-decoration-underline"
                        : ""
                    }`}
                  >
                    Administração
                  </Link>
                </li>
              )}
            {!isAuthenticated ? (
              <li className="nav-item">
                <Link to="/login" className="btn btn-primary">
                  <FontAwesomeIcon icon={faSignInAlt} /> Login
                </Link>
              </li>
            ) : (
              <li className="nav-item">
                <button className="btn btn-secondary" onClick={logout}>
                  <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Exibindo o email e nível de acesso com ícone de usuário */}
      {isAuthenticated && (
        <div className="d-flex align-items-center mt-1" style={{ fontSize: "0.7rem" }}>
          <FontAwesomeIcon icon={faUser} className="me-1" />
          <span>( {email} / {nivelAcesso} )</span>
          <span>{"    ."}</span>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
