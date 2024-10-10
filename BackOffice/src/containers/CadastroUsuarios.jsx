import React, { useState, useEffect } from "react";
import { useApiRequest } from "../hooks/useApiRequest";
import bcrypt from "bcryptjs";
import './CadastroUsuarios.css'; // Importa o CSS
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Ícones para mostrar/ocultar senha

const CadastroUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const url = import.meta.env.VITE_API_OBTER_USUARIOS;
  const nivelAcessoUrl = import.meta.env.VITE_API_OBTER_NIVEL_ACESSO;
  const statusUrl = import.meta.env.VITE_API_OBTER_STATUS;

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  
  const { data: items, httpConfig, loading, error } = useApiRequest(url);
  const { data: nivelAcessoData, loading: loadingNivelAcesso } = useApiRequest(nivelAcessoUrl);
  const { data: statusData, loading: loadingStatus } = useApiRequest(statusUrl);

  const [nivelAcessoOptions, setNivelAcessoOptions] = useState([]);
  const [statusOptions, setStatusOptions] = useState([]);

  useEffect(() => {
    if (nivelAcessoData) {
      setNivelAcessoOptions(nivelAcessoData.map(option => option.valor));
    }
    if (statusData) {
      setStatusOptions(statusData.map(option => option.valor));
    }
  }, [nivelAcessoData, statusData]);

  const [id, setId] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaConfirmacao, setSenhaConfirmacao] = useState("");
  const [statusUsuario, setStatusUsuario] = useState("");
  const [nivelAcesso, setNivelAcesso] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [dataCadastro, setDataCadastro] = useState("");
  const [senhaOriginal, setSenhaOriginal] = useState("");

  const [showSenha, setShowSenha] = useState(false);
  const [showSenhaConfirmacao, setShowSenhaConfirmacao] = useState(false);

  const handleItemClick = (usuario) => {
    setSenhaOriginal(usuario.senha);
    setSelectedItem(usuario);
    setId(usuario.id);
    setNome(usuario.nome);
    setEmail(usuario.email);
    setNivelAcesso(usuario.nivelAcesso);
    setStatusUsuario(usuario.statusUsuario);
    setCpf(usuario.cpf);
    setTelefone(usuario.telefone);
    setDataCadastro(usuario.dataCadastro);
    setSenha("");
    setSenhaConfirmacao("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const clickedButton = e.nativeEvent.submitter;
    const buttonName = clickedButton.name;

    if (buttonName === "incluir" || buttonName === "alterar") {
      if (senha !== senhaConfirmacao) {
        alert("As senhas não coincidem!");
        return;
      }
    }

    let usuario = {
      id,
      nome,
      email,
      statusUsuario,
      nivelAcesso,
      cpf,
      telefone,
      dataCadastro,
    };

    if (buttonName === "incluir") {
      const salt = await bcrypt.genSalt(10);
      const senhaHash = await bcrypt.hash(senha, salt);
      usuario.senha = senhaHash;
      delete usuario.id;
    } else if (buttonName === "alterar") {
      if (senha) {
        const salt = await bcrypt.genSalt(10);
        const senhaHash = await bcrypt.hash(senha, salt);
        usuario.senha = senhaHash;
      } else {
        usuario.senha = senhaOriginal;
      }
    }

    if (buttonName === "incluir") {
      httpConfig(usuario, "POST");
    } else if (buttonName === "alterar") {
      httpConfig(usuario, "PUT");
    } else if (buttonName === "excluir") {
      httpConfig(usuario, "DELETE");
    }

    if (buttonName === "incluir") {
      setId("");
    }
    setNome("");
    setEmail("");
    setNivelAcesso("");
    setStatusUsuario("");
    setCpf("");
    setTelefone("");
    setDataCadastro("");
    setSenha("");
    setSenhaConfirmacao("");
  };

  const validatePassword = (password) => {
    const minLength = password.length >= 8;
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*]/.test(password);
    return minLength && hasNumber && hasSpecialChar;
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <h4 className="text-center mt-5 mb-5 ">Cadastro de Usuários</h4>

          <div className="filter-usurios mb-3">
            <input
              type="text"
              placeholder="Pesquisar usuários ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-control "
            />
          </div>
          <div style={{ height: "auto", overflowY: "auto" }}>
            <table className="table table-hover responsive">
              <thead style={{ position: "sticky", top: 0, background: "white" }}>
                <tr>
                  <th className="fs-small">Nome</th>
                  <th className="fs-small">Email</th>
                  <th className="fs-small">Nível de Acesso</th>
                  <th className="fs-small">Status</th>
                </tr>
              </thead>
              <tbody>
                {items &&
                  items
                    .filter((usuario) =>
                      usuario.nome.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .sort((a, b) => b.id - a.id)
                    .map((usuario) => (
                      <tr
                        className={selectedItem === usuario ? "table-active" : ""}
                        key={usuario.id}
                        onClick={() => handleItemClick(usuario)}
                      >
                        <td className="fs-small">{usuario.nome}</td>
                        <td className="fs-small">{usuario.email}</td>
                        <td className="fs-small">{usuario.nivelAcesso}</td>
                        <td className="fs-small">{usuario.statusUsuario}</td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
          <div>
            {loading && <p className="">Carregando dados ... </p>}
            {error && <p className="">{error}</p>}
          </div>
        </div>
        <div className="col-md-6">
          <div className="mt-3 mt-5">
            <form onSubmit={handleSubmit} className="form">
              <div className="form-group mb-3">
                <label htmlFor="id" className="form-label">Id :</label>
                <input
                  className="form-control "
                  type="text"
                  disabled
                  value={id}
                  name="id"
                />
              </div>

              <div className="form-group mb-3">
                <label htmlFor="nome" className="form-label">Nome :</label>
                <input
                  className="form-control"
                  type="text"
                  value={nome}
                  name="nome"
                  onChange={(e) => setNome(e.target.value)}
                />
              </div>

              <div className="form-group mb-3">
                <label htmlFor="email" className="form-label">Email:</label>
                <input
                  className="form-control"
                  type="email"
                  value={email}
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group mb-3 position-relative">
                <label htmlFor="senha" className="form-label">Senha :</label>
                <input
                  className="form-control"
                  type={showSenha ? "text" : "password"}
                  value={senha}
                  name="senha"
                  onChange={(e) => setSenha(e.target.value)}
                />
                <span 
                  onClick={() => setShowSenha(!showSenha)} 
                  className="position-absolute" 
                  style={{ right: '10px', top: '35px', cursor: 'pointer' }}>
                  {showSenha ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              <div className="form-group mb-3 position-relative">
                <label htmlFor="senhaConfirmacao" className="form-label">Confirme a Senha :</label>
                <input
                  className="form-control"
                  type={showSenhaConfirmacao ? "text" : "password"}
                  value={senhaConfirmacao}
                  name="senhaConfirmacao"
                  onChange={(e) => setSenhaConfirmacao(e.target.value)}
                />
                <span 
                  onClick={() => setShowSenhaConfirmacao(!showSenhaConfirmacao)} 
                  className="position-absolute" 
                  style={{ right: '10px', top: '35px', cursor: 'pointer' }}>
                  {showSenhaConfirmacao ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              <div className="form-group mb-3">
                <label htmlFor="nivelAcesso" className="form-label">Nível de Acesso :</label>
                <select
                  className="form-control "
                  value={nivelAcesso}
                  name="nivelAcesso"
                  onChange={(e) => setNivelAcesso(e.target.value)}
                >
                  <option value="">Selecione</option>
                  {nivelAcessoOptions.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group mb-3">
                <label htmlFor="statusUsuario" className="form-label">Status :</label>
                <select
                  className="form-control "
                  value={statusUsuario}
                  name="statusUsuario"
                  onChange={(e) => setStatusUsuario(e.target.value)}
                >
                  <option value="">Selecione</option>
                  {statusOptions.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group mb-3">
                <label htmlFor="cpf" className="form-label">CPF :</label>
                <input
                  className="form-control "
                  type="text"
                  value={cpf}
                  name="cpf"
                  onChange={(e) => setCpf(e.target.value)}
                />
              </div>

              <div className="form-group mb-3">
                <label htmlFor="telefone" className="form-label">Telefone :</label>
                <input
                  className="form-control "
                  type="text"
                  value={telefone}
                  name="telefone"
                  onChange={(e) => setTelefone(e.target.value)}
                />
              </div>

              <div className="form-group mb-3">
                <label htmlFor="dataCadastro" className="form-label">Data de Cadastro :</label>
                <input
                  className="form-control "
                  type="date"
                  value={dataCadastro.split('T')[0]}
                  name="dataCadastro"
                  onChange={(e) => {
                    const dateValue = e.target.value;
                    const localDateTimeString = dateValue + "T00:00:00";
                    setDataCadastro(localDateTimeString);
                  }}
                />
              </div>

              <div className="d-flex justify-content-between">
                {!loading && (
                  <button type="submit" className="btn btn-primary " name="incluir">
                    Incluir
                  </button>
                )}
                {!loading && (
                  <button type="submit" className="btn btn-primary " name="alterar">
                    Alterar
                  </button>
                )}
                {!loading && (
                  <button type="submit" className="btn btn-primary " name="excluir">
                    Excluir
                  </button>
                )}
              </div>

              <div className="mt-3">
                <p>
                  {validatePassword(senha) ? (
                    <span className="text-success">Senha forte</span>
                  ) : (
                    <span className="text-danger">A senha deve ter pelo menos 8 caracteres, um número e um caractere especial.</span>
                  )}
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CadastroUsuarios;
