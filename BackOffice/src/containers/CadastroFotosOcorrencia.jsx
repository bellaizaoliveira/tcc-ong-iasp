import React, { useState } from "react";
import { useApiRequest } from "../hooks/useApiRequest";
import FotoCard from "../components/FotoCard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

const CadastroFotosOcorrencia = ({ ocorrenciaId }) => {


  // const CadastroFotosOcorrencia = ({ ocorrenciaId }) => {
  //   if (!ocorrenciaId) {
  //     return <p>ID da ocorrência é necessário para visualizar as fotos.</p>;
  //   }

console.log("Ocorrencia " + ocorrenciaId );


  const apiUrl = `${import.meta.env.VITE_API_OBTER_FOTOS_OCORRENCIA}/${ocorrenciaId}`;
  console.log("URL :" + apiUrl);

  const { data: fotos, loading, error } = useApiRequest(apiUrl);
  const [showAddFotoCard, setShowAddFotoCard] = useState(false);

  const handleAddFotoClick = () => {
    setShowAddFotoCard(true);
  };

  return (
    <div>
      {loading && <p>Carregando dados ...</p>}
      {error && <p>Erro: {error}</p>}
         <div className="col-md-6 mb-4">
          <div
            className="card"
            style={{ cursor: "pointer" }}
            onClick={handleAddFotoClick}
          >
            <div className="card-body text-center">
              <FontAwesomeIcon icon={faCamera} size="2x" className="mb-2" /> {/* Ícone de câmera */}
              <h5 className="card-title">Adicionar Nova Imagem</h5>
              <p className="card-text">Clique para adicionar uma nova imagem à ocorrência.</p>
            </div>
          </div>
          {showAddFotoCard && (
            <FotoCard
              ocorrenciaId={ocorrenciaId}
              id_foto={null} // Indica que estamos adicionando uma nova foto
            />
          )}
        </div>
      <div className="row">
        {fotos &&
          fotos.map((foto) => (
            <FotoCard
              key={foto.id}
              ocorrenciaId={ocorrenciaId}
              id_foto={foto.id}
            />
          ))}

      </div>
    </div>
  );
};

export default CadastroFotosOcorrencia;
