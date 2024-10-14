import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext'; // Ajuste o caminho conforme necessário
import { useNavigate } from 'react-router-dom';
import { useApiRequest } from '../hooks/useApiRequest';
import bcrypt from 'bcryptjs';
import loginImage from '../assets/images/IconLogin.png'; // Importando a imagem

const Login = () => {
  const { login } = useAuth(); // Usar o hook para acessar o contexto
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);
  const [emailInput, setEmailInput] = useState(""); // Alterado para email
  const [senhaInput, setSenhaInput] = useState("");
  const [error, setError] = useState("");
  const url = import.meta.env.VITE_API_OBTER_USUARIOS;

  const { data: items, loading, error: apiError } = useApiRequest(url);

  // Carregar usuários cadastrados ao montar o componente
  useEffect(() => {
    if (items) {
      setUsuarios(items);
    }
  }, [items]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Encontrar o usuário com base no email
    const usuario = usuarios.find((user) => user.email === emailInput); // Alterado para email

    if (usuario) {
      // Comparar a senha fornecida com a senha criptografada
      const isMatch = await bcrypt.compare(senhaInput, usuario.senha);
      if (isMatch) {
        // Login bem-sucedido
        login(usuario.nivelAcesso, usuario.email, usuario.id);  
        navigate('/'); // Redireciona para a página inicial
      } else {
        setError("Senha incorreta.");
      }
    } else {
      setError("Usuário não encontrado.");
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100" style={{ padding: 0, margin: 0 }}>
      <div className="row w-100" style={{ margin: 0 }}>
        <div className="col-md-8 d-flex align-items-center mx-auto">
          <div className="border border-secondary rounded p-4 d-flex w-100" style={{ margin: '0 auto' }}>
            <img 
              src={loginImage} 
              alt="Login" 
              className="img-fluid me-4" 
              style={{ maxWidth: '300px', height: 'auto', objectFit: 'contain' }} // Mantendo a proporcionalidade da imagem
            />
            <div className="flex-grow-1">
              <h4 className="text-center mb-4 fs-10">Login</h4>
              <form onSubmit={handleSubmit} className="form">
                <div className="form-group mb-3">
                  <label htmlFor="email" className="form-label fs-6">Email:</label>
                  <input
                    className="form-control fs-6" 
                    type="email"
                    value={emailInput}
                    name="email"
                    onChange={(e) => setEmailInput(e.target.value)}
                    required
                    style={{ width: '100%', height: '50px' }} // Aumentando a largura do campo
                  />
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="senha" className="form-label fs-6">Senha:</label>
                  <input
                    className="form-control fs-6" 
                    type="password"
                    value={senhaInput}
                    name="senha"
                    onChange={(e) => setSenhaInput(e.target.value)}
                    required
                    style={{ width: '100%', height: '50px' }} // Aumentando a largura do campo
                  />
                </div>

                <div className="d-flex justify-content-between">
                  <button type="submit" className="btn btn-primary fs-6" style={{ width: '100%' }}>
                    Entrar
                  </button>
                </div>

                {loading && <p className="fs-6">Carregando dados ...</p>}
                {apiError && <p className="fs-6 text-danger">{apiError}</p>}
                
                {/* Área de Mensagem de Erro Fixa */}
                <div style={{ height: '40px', overflow: 'hidden' }}>
                  {error && <p className="fs-6 text-danger">{error}</p>}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
