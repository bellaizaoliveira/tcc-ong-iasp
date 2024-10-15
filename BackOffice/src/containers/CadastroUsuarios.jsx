import React, { useState, useEffect } from "react";
import './CadastroUsuarios.css'; // Importa o CSS
import { useApiRequest } from "../hooks/useApiRequest";
import bcrypt from "bcryptjs";
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
  const [dataCadastro, setDataCadastro] = useState(""); // Novo estado para dataCadastro
  const [senhaOriginal, setSenhaOriginal] = useState("");

  const [showSenha, setShowSenha] = useState(false);
  const [showSenhaConfirmacao, setShowSenhaConfirmacao] = useState(false);
  
  const [errorMessages, setErrorMessages] = useState({
    senha: '',
    cpf: '',
    telefone: ''
  });

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

  const validatePhone = (phone) => {
    const phonePattern = /^\(\d{2}\) \d{5}-\d{4}$/; // Formato: (XX) XXXXX-XXXX
    return phonePattern.test(phone);
  };

  const validateCpf = (cpf) => {
    const cpfPattern = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/; // Formato: XXX.XXX.XXX-XX
    return cpfPattern.test(cpf);
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
      if (!validatePassword(senha)) {
        setErrorMessages(prev => ({ ...prev, senha: 'A senha deve ter pelo menos 8 caracteres, um número e um caractere especial.' }));
        return;
      }
      if (!validateCpf(cpf)) {
        setErrorMessages(prev => ({ ...prev, cpf: 'CPF deve estar no formato XXX.XXX.XXX-XX.' }));
        return;
      }
      if (!validatePhone(telefone)) {
        setErrorMessages(prev => ({ ...prev, telefone: 'Telefone deve estar no formato (XX) XXXXX-XXXX.' }));
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
      dataCadastro, // Adiciona a data de cadastro
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
    setDataCadastro(""); // Limpa a data de cadastro
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
                  required
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
                  required
                  value={email}
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group mb-3">
                <label htmlFor="cpf" className="form-label">CPF:</label>
                <input
                  className="form-control"
                  type="text"
                  required
                  value={cpf}
                  name="cpf"
                  onChange={(e) => setCpf(e.target.value)}
                  placeholder="XXX.XXX.XXX-XX"
                />
                {errorMessages.cpf && <span className="text-danger">{errorMessages.cpf}</span>}
              </div>

              <div className="form-group mb-3">
                <label htmlFor="telefone" className="form-label">Telefone:</label>
                <input
                  className="form-control"
                  type="text"
                  required
                  value={telefone}
                  name="telefone"
                  onChange={(e) => setTelefone(e.target.value)}
                  placeholder="(XX) XXXXX-XXXX"
                />
                {errorMessages.telefone && <span className="text-danger">{errorMessages.telefone}</span>}
              </div>

              <div className="form-group mb-3">
                <label htmlFor="senha" className="form-label">Senha:</label>
                <div className="input-group">
                  <input
                    className="form-control"
                    type={showSenha ? "text" : "password"}
                    required
                    value={senha}
                    name="senha"
                    onChange={(e) => setSenha(e.target.value)}
                  />
                  <span className="input-group-text" onClick={() => setShowSenha(!showSenha)}>
                    {showSenha ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>

              <div className="form-group mb-3">
                <label htmlFor="senhaConfirmacao" className="form-label">Confirmação de Senha:</label>
                <div className="input-group">
                  <input
                    className="form-control"
                    type={showSenhaConfirmacao ? "text" : "password"}
                    required
                    value={senhaConfirmacao}
                    name="senhaConfirmacao"
                    onChange={(e) => setSenhaConfirmacao(e.target.value)}
                  />
                  <span className="input-group-text" onClick={() => setShowSenhaConfirmacao(!showSenhaConfirmacao)}>
                    {showSenhaConfirmacao ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                {errorMessages.senha && <span className="text-danger">{errorMessages.senha}</span>}
              </div>

              <div className="form-group mb-3">
                <label htmlFor="nivelAcesso" className="form-label">Nível de Acesso:</label>
                <select
                  className="form-select"
                  required
                  value={nivelAcesso}
                  name="nivelAcesso"
                  onChange={(e) => setNivelAcesso(e.target.value)}
                >
                  <option value="">Selecione um nível de acesso</option>
                  {nivelAcessoOptions.map((nivel, index) => (
                    <option key={index} value={nivel}>{nivel}</option>
                  ))}
                </select>
              </div>

              <div className="form-group mb-3">
                <label htmlFor="dataCadastro" className="form-label">Data de Cadastro:</label>
                <input
                  className="form-control"
                  type="datetime-local"
                  required
                  value={dataCadastro}
                  name="dataCadastro"
                  onChange={(e) => setDataCadastro(e.target.value)}
                />
              </div>

              <div className="form-group mb-3">
                <label htmlFor="statusUsuario" className="form-label">Status:</label>
                <select
                  className="form-select"
                  required
                  value={statusUsuario}
                  name="statusUsuario"
                  onChange={(e) => setStatusUsuario(e.target.value)}
                >
                  <option value="">Selecione um status</option>
                  {statusOptions.map((status, index) => (
                    <option key={index} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              <div className="d-flex justify-content-between mt-4">
                <button type="submit" name="incluir" className="btn btn-primary">Incluir</button>
                <button type="submit" name="alterar" className="btn btn-warning">Alterar</button>
                <button type="submit" name="excluir" className="btn btn-danger">Excluir</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CadastroUsuarios;
