import React, { useState, useEffect } from "react";
import { useApiRequest } from "../hooks/useApiRequest";
import UploadModal from "./UploadModal"; // Importe o novo componente

const FotoCard = ({ ocorrenciaId, id_foto }) => {
  const isNew = id_foto === null;
  const url = isNew ? null : `${import.meta.env.VITE_API_OBTER_FOTO_OCORRENCIA}/${id_foto}`;
  const { data: fotoData, httpConfig, loading, error } = useApiRequest(url);
  const [isEditing, setIsEditing] = useState(isNew);
  const [currentImage, setCurrentImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState(null);
  
  const [formData, setFormData] = useState({
    titulo: "",
    descricao: "",
    sequencia: "",
    localFoto: "",
  });

  useEffect(() => {
    if (fotoData) {
      setCurrentImage(`${import.meta.env.VITE_API_OBTER_IMAGENS}/${fotoData.localFoto}`);
      setFormData({
        titulo: fotoData.titulo,
        descricao: fotoData.descricao,
        sequencia: fotoData.sequencia,
        localFoto: fotoData.localFoto,
      });
    }
  }, [fotoData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUploadFileName = (fileName) => {
    setFormData((prevData) => ({
      ...prevData,
      localFoto: fileName,
    }));
    setCurrentImage(`${import.meta.env.VITE_API_OBTER_IMAGENS}/${fileName}`);
  };



const handleSaveClick = async () => {
  try {
    let fotoOcorrencia = {
      ...formData,
      ocorrencia:ocorrenciaId,
    };

   

    const method = isNew ? "POST" : "PUT";
    const url = isNew 
      ? `${import.meta.env.VITE_API_OBTER_FOTO_OCORRENCIA}` 
      : `${import.meta.env.VITE_API_OBTER_FOTO_OCORRENCIA}/${id_foto}`;

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fotoOcorrencia),
    });

    if (!response.ok) {
      throw new Error("Erro ao salvar os dados");
    }

    setIsEditing(false);
  } catch (error) {
    console.error("Erro ao salvar os dados:", error);
  }
};
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const openModal = (event) => {
    const rect = event.target.getBoundingClientRect();
    setModalPosition({ top: rect.bottom + window.scrollY, left: rect.left + window.scrollX });
    setIsModalOpen(true);
  };

  if (loading) {
    return <p>Carregando dados da foto...</p>;
  }

  if (error) {
    return <p>Erro: {error}</p>;
  }

  if (!isEditing && !fotoData && !currentImage) {
    return null;
  }

  return (
    // <div className={isEditing ? "col-12 mb-4" : "col-md-6 mb-4"}>
    //   <div className="card">
    //     <div className="card-body">
    //       {currentImage && (
    //         <img
    //           src={currentImage}
    //           alt="Foto da Ocorrência"
    //           className="img-fluid mb-3"
    //         />
    //       )}
    //       {isEditing ? (
    //         <>
    //           <div className="mb-2">
    //             <label htmlFor="titulo" className="form-label">Título</label>
    //             <input
    //               type="text"
    //               id="titulo"
    //               name="titulo"
    //               value={formData.titulo}
    //               onChange={handleInputChange}
    //               className="form-control"
    //               placeholder="Título"
    //             />
    //           </div>
    //           <div className="mb-2">
    //             <label htmlFor="descricao" className="form-label">Descrição</label>
    //             <textarea
    //               id="descricao"
    //               name="descricao"
    //               value={formData.descricao}
    //               onChange={handleInputChange}
    //               className="form-control"
    //               placeholder="Descrição"
    //             />
    //           </div>
    //           <div className="mb-2">
    //             <label htmlFor="sequencia" className="form-label">Sequência</label>
    //             <input
    //               type="number"
    //               id="sequencia"
    //               name="sequencia"
    //               value={formData.sequencia}
    //               onChange={handleInputChange}
    //               className="form-control"
    //               placeholder="Sequência"
    //             />
    //           </div>
    //           <div className="mb-2">
    //             <label htmlFor="localFoto" className="form-label">Foto</label>
    //             <input
    //               type="text"
    //               id="localFoto"
    //               name="localFoto"
    //               value={formData.localFoto}
    //               onChange={handleInputChange}
    //               readOnly 
    //               className="form-control"
    //             />
    //           </div>
    //           <button className="btn btn-primary me-2" onClick={openModal}>
    //             Upload
    //           </button>
    //           <button className="btn btn-primary me-2" onClick={handleSaveClick}>
    //             Salvar
    //           </button>
    //           <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>
    //             Cancelar
    //           </button>
    //         </>
    //       ) : (
    //         <>
    //           <h5 className="card-title">{formData.titulo}</h5>
    //           <p className="card-text">{formData.descricao}</p>
    //           <button className="btn btn-primary me-2" onClick={handleEditClick}>
    //             Editar
    //           </button>
    //         </>
    //       )}
    //     </div>
    //   </div>
    //   <UploadModal 
    //     isOpen={isModalOpen} 
    //     onRequestClose={() => setIsModalOpen(false)} 
    //     onUpload={handleUploadFileName} 
    //     position={modalPosition} 
    //   />
    // </div>


    <div className={isEditing ? "col-12 mb-4" : "col-md-6 mb-4"}>
  <div className="card">
    <div className="card-body">
      {currentImage && (
        <img
          src={currentImage}
          alt="Foto da Ocorrência"
          className="img-fluid mb-3"
        />
      )}
      {isEditing ? (
        <>
          <div className="mb-2">
            <label htmlFor="titulo" className="form-label">Título</label>
            <input
              type="text"
              id="titulo"
              name="titulo"
              value={formData.titulo}
              onChange={handleInputChange}
              className="form-control"
              placeholder="Título"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="descricao" className="form-label">Descrição</label>
            <textarea
              id="descricao"
              name="descricao"
              value={formData.descricao}
              onChange={handleInputChange}
              className="form-control"
              placeholder="Descrição"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="sequencia" className="form-label">Sequência</label>
            <input
              type="number"
              id="sequencia"
              name="sequencia"
              value={formData.sequencia}
              onChange={handleInputChange}
              className="form-control"
              placeholder="Sequência"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="localFoto" className="form-label">Foto</label>
            <div className="input-group">
              <button className="btn btn-primary" onClick={openModal}>
                Upload
              </button>
              <input
                type="text"
                id="localFoto"
                name="localFoto"
                value={formData.localFoto}
                readOnly 
                className="form-control"
              />
            </div>
          </div>
          <button className="btn btn-primary me-2" onClick={handleSaveClick}>
            Salvar
          </button>
          <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>
            Cancelar
          </button>
        </>
      ) : (
        <>
          <h5 className="card-title">{formData.titulo}</h5>
          <p className="card-text">{formData.descricao}</p>
          <button className="btn btn-primary me-2" onClick={handleEditClick}>
            Editar
          </button>
        </>
      )}
    </div>
  </div>
  <UploadModal 
    isOpen={isModalOpen} 
    onRequestClose={() => setIsModalOpen(false)} 
    onUpload={handleUploadFileName} 
    position={modalPosition} 
  />
</div>

  );
};

export default FotoCard;
