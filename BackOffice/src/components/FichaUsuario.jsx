import React, { useEffect, useState } from "react";

const FichaUsuario = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_OBTER_USUARIOS}/${userId}`
        );

        if (!response.ok) {
          throw new Error("Erro ao buscar dados do usuário");
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, [userId]);

  if (!user) {
    return <div>Carregando...</div>;
  }

  const handleToggleModal = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="card-body">
      <div className="d-flex align-items-center justify-content-between p-0">
        <span
          className="form-control border-0"
          style={{ borderRadius: "8px 0 0 8px" }}
        >
          {user.nome}
        </span>
        <button onClick={handleToggleModal} className="btn btn-primary">
          {isExpanded ? "Detalhes" : "Detalhes"}
        </button>
      </div>
      {isExpanded && (
        <div className="user-details mb-3"> {/* Adicionei mb-3 aqui */}
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Nível de Acesso:</strong> {user.nivelAcesso}</p>
          <p><strong>CPF:</strong> {user.cpf}</p>
          <p><strong>Telefone:</strong> {user.telefone}</p>
          <p><strong>Data de Cadastro:</strong> {new Date(user.dataCadastro).toLocaleDateString()}</p>
          <p><strong>Status:</strong> {user.statusUsuario}</p>
        </div>
      )}
    </div>
  );
};

export default FichaUsuario;
