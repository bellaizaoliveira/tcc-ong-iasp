import React, { useState } from "react";
import Modal from "react-bootstrap/Modal"; // Certifique-se de instalar react-bootstrap
import Button from "react-bootstrap/Button"; // Importando o componente Button

const UploadModal = ({ isOpen, onRequestClose, onUpload, position }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_UPLOAD_IMAGEM}`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error("Erro ao fazer upload da foto");
        }

        const result = await response.json();
        onUpload(result.fileName);
        onRequestClose();
      } catch (error) {
        console.error("Erro no upload:", error);
      }
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setImagePreview(null);
  };

  return (
    <Modal
      show={isOpen}
      onHide={onRequestClose}
      style={{
        position: "absolute",
        top: position?.top || "50%",
        left: position?.left || "50%",
        transform: "translate(-50%, -50%)",
      }}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Upload de Imagem</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        
        {/* <input
          type="file"
          className="form-control mb-3"
          onChange={handleFileChange}
        /> */}
<label htmlFor="fileInput" className="form-label">
    Escolher arquivo
  </label>
  <input
    type="file"
    id="fileInput"
    className="form-control mb-3"
    onChange={handleFileChange}
  />
        {imagePreview && (
          <div className="text-center mb-3">
            <img
              src={imagePreview}
              alt="Pré-visualização"
              className="img-fluid"
              style={{ maxHeight: "200px" }}
            />
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        {imagePreview ? (
          <>
            <Button variant="success" onClick={handleUpload}>
              <i className="fa fa-upload"></i> Confirmar Upload
            </Button>
            <Button variant="danger" onClick={handleRemoveFile}>
              <i className="fa fa-trash-alt"></i> Excluir Arquivo
            </Button>
          </>
        ) : (
          <Button variant="secondary" onClick={onRequestClose}>
            Cancelar
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default UploadModal;
