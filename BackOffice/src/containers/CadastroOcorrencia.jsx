import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useApiRequest } from "../hooks/useApiRequest";
import { useAuth } from "../context/AuthContext";
import CadastroFotosOcorrencia from "../containers/CadastroFotosOcorrencia";
import FichaUsuario from "../components/FichaUsuario";

const CadastroOcorrencia = () => {
  const { id: paramId } = useParams();
  const navigate = useNavigate();
  const { nivelAcesso, usuarioAtual } = useAuth(); // Supondo que o contexto forneça o usuário atual
  const [errorMessage, setErrorMessage] = useState("");
  const [tipoOcorrencias, setTipoOcorrencias] = useState([]);
  const [statusOcorrencias, setStatusOcorrencias] = useState([]);

  // Estado local para o ID
  const [id, setId] = useState(paramId || null);

  // Estados para os dados da ocorrência
  const [dataOcor, setDataOcor] = useState("");
  const [descricao, setDescricao] = useState("");
  const [titulo, setTitulo] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [numero, setNumero] = useState("");
  const [cep, setCep] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");
  const [pontoRef, setPontoRef] = useState("");
  const [tipoOcorrencia, setTipoOcorrencia] = useState("");
  const [statusOcor, setStatusOcor] = useState("");
  const [usuario, setUsuario] = useState("");

  // Verifica se o usuário tem permissão
  useEffect(() => {
    if (nivelAcesso !== "ADMINISTRADOR") {
      setErrorMessage("Usuário não tem permissão para acessar esta página.");
      setTimeout(() => {
        navigate("/"); // Redireciona para a home
      }, 3000); // 3 segundos de delay
    }
  }, [nivelAcesso, navigate]);

  // Só faz a requisição se o ID não for nulo
  const url = id ? `${import.meta.env.VITE_API_OBTER_OCORRENCIAS}/${id}` : null;
  const { data: ocorrencia, loading, error } = useApiRequest(url);

  useEffect(() => {
    if (ocorrencia) {
      setDataOcor(ocorrencia.dataOcor || "");
      setDescricao(ocorrencia.descricao || "");
      setTitulo(ocorrencia.titulo || "");
      setLogradouro(ocorrencia.logradouro || "");
      setNumero(ocorrencia.numero || "");
      setCep(ocorrencia.cep || "");
      setCidade(ocorrencia.cidade || "");
      setUf(ocorrencia.uf || "");
      setPontoRef(ocorrencia.pontoRef || "");
      setTipoOcorrencia(ocorrencia.tipoOcorrencia || "");
      setStatusOcor(ocorrencia.statusOcor || "");
      setId(ocorrencia.id);
      setUsuario(ocorrencia.usuario || usuarioAtual);
    }
  }, [ocorrencia, paramId, usuarioAtual]);

  // Obtém os tipos de ocorrência da API usando useApiRequest
  const {
    data: tiposData,
    loading: loadingTipos,
    error: errorTipos,
  } = useApiRequest(import.meta.env.VITE_API_OBTER_TIPOOCORRENCIA);

  useEffect(() => {
    if (tiposData) {
      setTipoOcorrencias(tiposData); // Supondo que a API retorna um array de objetos { id, nome }
    }
  }, [tiposData]);

  // Obtém os status da ocorrência da API
  const {
    data: statusData,
    loading: loadingStatus,
    error: errorStatus,
  } = useApiRequest(import.meta.env.VITE_API_OBTER_STATUS_OCORRENCIA);

  useEffect(() => {
    if (statusData) {
      setStatusOcorrencias(statusData); // Supondo que a API retorna um array de objetos { valor }
    }
  }, [statusData]);

  const handleSave = async (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário

    const data = {
      dataOcor,
      descricao,
      titulo,
      logradouro,
      numero,
      cep,
      cidade,
      uf,
      pontoRef,
      tipoOcorrencia,
      statusOcor,
      usuario,
    };

    console.log(data);

    try {
      const method = id ? "PUT" : "POST";
      const requestUrl = id ? url : import.meta.env.VITE_API_OBTER_OCORRENCIAS;

      const response = await fetch(requestUrl, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Erro ao ${id ? "atualizar" : "criar"} a ocorrência`);
      }

      const result = await response.json();
      console.log(
        `Ocorrência ${id ? "atualizada" : "criada"} com sucesso:`,
        result
      );

      if (!id) {
        // Se foi uma criação, atualiza o estado com o novo ID
        setId(result.id);
      } else {
        // Se foi uma atualização, redireciona para a home
        navigate("/");
      }
    } catch (error) {
      console.error(
        `Erro ao ${id ? "atualizar" : "criar"} a ocorrência:`,
        error
      );
      setErrorMessage(
        `Erro ao ${id ? "atualizar" : "criar"} a ocorrência. Tente novamente.`
      );
    }
  };

  const handleNew = () => {
    setId(null);
    setDataOcor("");
    setDescricao("");
    setTitulo("");
    setLogradouro("");
    setNumero("");
    setCep("");
    setCidade("");
    setUf("");
    setPontoRef("");
    setTipoOcorrencia("");
    setStatusOcor("");
    setUsuario(usuarioAtual.id); // Resetando o usuário para o usuário logado
  };

  // Se houver um erro de permissão, não renderiza mais nada
  if (errorMessage) {
    return <p>{errorMessage}</p>;
  }

  // Função para buscar o endereço - Incluir
  const buscarEndereco = async (cep) => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json`);
      if (!response.ok) {
        throw new Error("Endereço não encontrado");
      }
      const data = await response.json();
      if (!data.erro) {
        setLogradouro(`${data.logradouro}`);
        setCidade(`${data.bairro}, ${data.localidade}`);
        setUf(data.uf);
      }
    } catch (error) {
      console.error("Erro ao buscar endereço:", error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <h1>{id ? "Editar Ocorrência" : "Nova Ocorrência"}</h1>
          <div>
            {loading && <p>Carregando dados ...</p>}
            {loadingTipos && <p>Carregando tipos de ocorrência ...</p>}
            {loadingStatus && <p>Carregando status de ocorrência ...</p>}
            {error && <p>Erro: {error}</p>}
            {errorTipos && (
              <p>Erro ao carregar tipos de ocorrência: {errorTipos}</p>
            )}
            {errorStatus && (
              <p>Erro ao carregar status de ocorrência: {errorStatus}</p>
            )}
          </div>
          <div>
            <FichaUsuario userId={usuario} />
          </div>
          <form className="form" onSubmit={handleSave}>
            {/* Campos do formulário */}
            <div className="form-group mb-3">
              <label htmlFor="dataOcor" className="form-label">
                Data: <span style={{ color: "red" }}>*</span>
              </label>
              <input
                className="form-control"
                type="datetime-local"
                value={dataOcor}
                name="dataOcor"
                onChange={(e) => setDataOcor(e.target.value)}
                required
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="titulo" className="form-label">
                Título: <span style={{ color: "red" }}>*</span>
              </label>
              <input
                className="form-control"
                type="text"
                value={titulo}
                name="titulo"
                onChange={(e) => setTitulo(e.target.value)}
                required
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="descricao" className="form-label">
                Descrição: <span style={{ color: "red" }}>*</span>
              </label>
              <textarea
                className="form-control"
                value={descricao}
                name="descricao"
                onChange={(e) => setDescricao(e.target.value)}
                required
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="tipoOcorrencia" className="form-label">
                Tipo de Ocorrência: <span style={{ color: "red" }}>*</span>
              </label>
              <select
                className="form-control"
                value={tipoOcorrencia}
                onChange={(e) => setTipoOcorrencia(e.target.value)}
                required
              >
                <option value="">Selecione um tipo</option>
                {tipoOcorrencias.map((tipo) => (
                  <option key={tipo.id} value={tipo.id}>
                    {tipo.nome}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group mb-3">
              <label htmlFor="statusOcor" className="form-label">
                Status da Ocorrência: <span style={{ color: "red" }}>*</span>
              </label>
              <select
                className="form-control"
                value={statusOcor}
                onChange={(e) => setStatusOcor(e.target.value)}
                required
              >
                <option value="">Selecione um status</option>
                {statusOcorrencias.map((status) => (
                  <option key={status.valor} value={status.valor}>
                    {status.valor}
                  </option>
                ))}
              </select>
            </div>
            <div className="row mb-3">
              <div className="col">
                <label htmlFor="cep" className="form-label">
                  CEP: <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={cep}
                  name="cep"
                  onChange={(e) => {
                    // Formatação do CEP
                    const value = e.target.value.replace(/\D/g, "").slice(0, 8);
                    setCep(value.replace(/(\d{5})(\d)/, "$1-$2"));
                    if (value.length === 8) {
                      buscarEndereco(value); // Chama a função para buscar o endereço
                    }
                  }}
                  maxLength="10" // Para o formato 99999-999
                  required
                />
              </div>
              <div className="col">
                <label htmlFor="logradouro" className="form-label">
                  Logradouro: <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={logradouro}
                  name="logradouro"
                  onChange={(e) => setLogradouro(e.target.value)}
                  required
                />
              </div>
              <div className="col">
                <label htmlFor="numero" className="form-label">
                  Número: <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={numero}
                  name="numero"
                  onChange={(e) => setNumero(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col">
                <label htmlFor="cidade" className="form-label">
                  Cidade: <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={cidade}
                  name="cidade"
                  onChange={(e) => setCidade(e.target.value)}
                  required
                />
              </div>
              <div className="col">
                <label htmlFor="uf" className="form-label">
                  UF: <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={uf}
                  name="uf"
                  onChange={(e) => setUf(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group mb-3">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate("/")}
              >
                Voltar
              </button>
              <button type="submit" className="btn btn-primary">
                {id ? "Atualizar" : "Salvar"}
              </button>
            </div>
          </form>
        </div>

        {/* Outras partes do componente, como CadastroFotosOcorrencia */}

        {/* Coluna para CadastroFotosOcorrencia */}
        <div className="col-md-6">
          {id && <CadastroFotosOcorrencia ocorrenciaId={id} />}
        </div>
      </div>
    </div>
  );
};

export default CadastroOcorrencia;
