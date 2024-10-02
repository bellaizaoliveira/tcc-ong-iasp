import React, { useState } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import CadastroProdutos from './CadastroProdutos';
import CadastroUsuarios from './CadastroUsuarios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Importando Font Awesome

function Administracao() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="container mt-4">
      {/* <h2>Administração</h2> */}
      <div className="d-flex flex-wrap">
        {/* Botão de Colapsar/Expandir com ícone */}
        <button
          className="btn btn-secondary mb-3"
          onClick={toggleCollapse}
          style={{ height: 'fit-content' }}
        >
          <i className={isCollapsed ? 'fas fa-chevron-right' : 'fas fa-chevron-left'}></i>
        </button>

        {/* Coluna dos Cards */}
        {!isCollapsed && (
          <div className="card me-2" style={{ width: '200px' }}>
            <div className="card-body">
              <div className="mb-2">
                <h6 className="card-title d-flex align-items-center">
                  <i className="fas fa-box me-2"></i>
                  Cadastro de Produtos
                  <Link to="cadastro-produtos" className="btn btn-link ms-2">
                    <i className="fas fa-arrow-right"></i>
                  </Link>
                </h6>
              </div>
              <div>
                <h6 className="card-title d-flex align-items-center">
                  <i className="fas fa-user-plus me-2"></i>
                  Cadastro de Usuários
                  <Link to="cadastro-usuarios" className="btn btn-link ms-2">
                    <i className="fas fa-arrow-right"></i>
                  </Link>
                </h6>
              </div>
            </div>
          </div>
        )}

        {/* Coluna do Conteúdo */}
        <div className="flex-grow-1">
          <Routes>
            <Route path="cadastro-produtos" element={<CadastroProdutos />} />
            <Route path="cadastro-usuarios" element={<CadastroUsuarios />} />
            {/* Adicione mais rotas conforme necessário */}
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Administracao;
