import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Importa o CSS do DatePicker
import { useApiRequest } from "../hooks/useApiRequest";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import ptBR from "date-fns/locale/pt-BR"; // Importa o locale pt-BR
import { Link } from "react-router-dom"; // Importa o Link
import { useAuth } from "../context/AuthContext";

// Registra e define o locale padrão
registerLocale("pt-BR", ptBR);
setDefaultLocale("pt-BR");

const QuadroOcorrencias = () => {
  const today = new Date();
  const pastDate = new Date();
  pastDate.setDate(today.getDate() - 5);
  const { nivelAcesso } = useAuth();

  const formatDateForApi = (date) => {
    if (!date) return "";
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${year}-${month}-${day}`; // Formato YYYY-MM-DD para a URL
  };

  const formatDateForDisplay = (date) => {
    if (!date) return "";
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`; // Formato dd/MM/aaaa para a exibição
  };

  const [startDate, setStartDate] = useState(pastDate);
  const [endDate, setEndDate] = useState(today);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para o termo de pesquisa

  const [fetchUrl, setFetchUrl] = useState(
    `${
      import.meta.env.VITE_API_OBTER_OCORRENCIASCOMPLETA
    }?dataInicio=${formatDateForApi(startDate)}&dataFim=${formatDateForApi(
      endDate
    )}`
  );

  const { data: ocorrencias, loading, error } = useApiRequest(fetchUrl);

  useEffect(() => {
    setFetchUrl(
      `${
        import.meta.env.VITE_API_OBTER_OCORRENCIASCOMPLETA
      }?dataInicio=${formatDateForApi(startDate)}&dataFim=${formatDateForApi(
        endDate
      )}`
    );
  }, [startDate, endDate]);

  // Filtra ocorrências com base no termo de pesquisa
  const filteredOcorrencias = ocorrencias?.filter(
    (item) =>
      (item.descricao &&
        item.descricao.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.conteudo &&
        item.conteudo.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.statusOcor &&
        item.statusOcor.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.dataOcor &&
        item.dataOcor.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="container mt-4">
      <div className="mb-4">
        <div className="card p-3 mb-3">
          <h5>Ocorrências no período selecionado</h5>
          <p>
            <strong>Data Início: </strong> {formatDateForDisplay(startDate)}{" "}
            <br />
            <strong>Data Fim: </strong> {formatDateForDisplay(endDate)}
          </p>
        </div>
      </div>

      <div className="mb-4 d-flex flex-wrap align-items-center">
        <label className="me-2" style={{ minWidth: "100px" }}>
          Data Início:
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="DD/MM/AAAA"
            locale="pt-BR"
            className="form-control custom-datepicker" // Adiciona a nova classe CSS
          />
        </label>
        <label className="me-2" style={{ minWidth: "100px" }}>
          Data Fim:
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="DD/MM/AAAA"
            locale="pt-BR"
            className="form-control custom-datepicker" // Adiciona a nova classe CSS
          />
        </label>
        <input
          type="text"
          placeholder="Pesquisar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-control custom-search me-4" // Adiciona a nova classe CSS
          style={{ flex: "1 1 150px" }} // Ajusta a largura do campo de pesquisa
        />
      </div>

      {loading && <div className="alert alert-info">Carregando...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="mb-4">
        {/* Botão para criar nova ocorrência com id nulo */}
        {nivelAcesso === "ADMINISTRADOR" && (
          <Link to="/cadastroocorrencia" className="btn btn-success mb-3">
            Criar Nova Ocorrência
          </Link>
        )}
      </div>
      <div className="row">
        {filteredOcorrencias &&
          filteredOcorrencias.map((item) => (
            <div className="col-md-4 mb-4" key={item.id}>
              <div className="card shadow-sm">
                {item.fotoPrincipal && (
                  <img
                    src={`${import.meta.env.VITE_API_OBTER_IMAGENS}/${
                      item.fotoPrincipal
                    }`}
                    alt={item.titulo}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }} // Ajusta a imagem
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{item.titulo}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {formatDateForDisplay(new Date(item.dataOcor))}
                  </h6>
                  <p className="card-text">{item.descricao}</p>
                  <p className="card-text">
                    <small className="text-muted">
                      {item.logradouro}, {item.numero} - {item.cidade}/{item.uf}
                    </small>
                  </p>
                  <p className="card-text">
                    <strong>Status:</strong> {item.statusOcor}
                  </p>
                  {nivelAcesso === "ADMINISTRADOR" && (
                    <Link
                      to={`/cadastroocorrencia/${item.id}`}
                      className="btn btn-primary"
                    >
                      Editar Ocorrência
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default QuadroOcorrencias;
