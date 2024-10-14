// import React, { createContext, useContext, useState } from 'react';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [nivelAcesso, setNivelAcesso] = useState(null); // Estado para o nível de acesso
//   const [email, setEmail] = useState(null); // Estado para o email

//   const login = (nivel, userEmail) => {
//     setIsAuthenticated(true);
//     setNivelAcesso(nivel); // Define o nível de acesso ao fazer login
//     setEmail(userEmail); // Define o email ao fazer login
//   };

//   const logout = () => {
//     setIsAuthenticated(false);
//     setNivelAcesso(null); // Limpa o nível de acesso ao fazer logout
//     setEmail(null); // Limpa o email ao fazer logout
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, nivelAcesso, email, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);



import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [nivelAcesso, setNivelAcesso] = useState(null); // Estado para o nível de acesso
  const [email, setEmail] = useState(null); // Estado para o email
  const [ usuarioAtual, setUsuarioAtual] = useState(null); // Estado para o ID do usuário

  const login = (nivel, userEmail, id) => {
    setIsAuthenticated(true);
    setNivelAcesso(nivel); // Define o nível de acesso ao fazer login
    setEmail(userEmail); // Define o email ao fazer login
    setUsuarioAtual(id); // Define o ID do usuário ao fazer login

    console.log("Usurio Atual"+usuarioAtual);
  };


  const logout = () => {
    setIsAuthenticated(false);
    setNivelAcesso(null); // Limpa o nível de acesso ao fazer logout
    setEmail(null); // Limpa o email ao fazer logout
    setUserId(null); // Limpa o ID do usuário ao fazer logout
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, nivelAcesso, email, usuarioAtual, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
