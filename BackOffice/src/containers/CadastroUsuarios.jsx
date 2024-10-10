import React, { useState, useEffect } from "react";
import { useApiRequest } from "../hooks/useApiRequest";
import bcrypt from "bcryptjs";
import InputMask from 'react-input-mask'; // Importa a biblioteca de máscara
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

      // Valida a senha antes de prosseguir
      if (!validatePassword(senha)) {
        alert("A senha deve ter pelo menos 8 caracteres, um número e um caractere especial.");
        return;
      }
    }

    // Adiciona validação de CPF
    if (!validateCPF(cpf)) {
      alert("CPF inválido!");
      return;
    }

    // Formata a dataCadastro para o formato LocalDateTime
    const formattedDataCadastro = `${dataCadastro}T00:00:00`;

    let usuario = {
      id,
      nome,
      email,
      statusUsuario,
      nivelAcesso,
      cpf,
      telefone,
      dataCadastro: formattedDataCadastro, // Usa a data formatada
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

  const validateCPF = (cpf) => {
    // Remover caracteres especiais
    cpf = cpf.replace(/[^\d]+/g, '');

    // Validação básica do CPF
    if (cpf.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(cpf)) return false; // Checa se todos os dígitos são iguais

    // Cálculo do dígito verificador
    let soma = 0;
    let resto;

    for (let i = 1; i <= 9; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }

    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(10))) return false;

    return true;
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
          <form onSubmit={handleSubmit} className="formulario-pequeno">

              <div className="mb-3">
                <label htmlFor="id" className="form-label">ID:</label>
                <input
                  type="text"
                  className="form-control"
                  id="id"
                  value={id}
                  readOnly
                />
              </div>

              <div className="mb-3">
                <label htmlFor="nome" className="form-label">Nome:</label>
                <input
                  type="text"
                  className="form-control"
                  id="nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email:</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="cpf" className="form-label">CPF:</label>
                <InputMask
                  mask="999.999.999-99"
                  className="form-control"
                  id="cpf"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="telefone" className="form-label">Telefone:</label>
                <InputMask
                  mask="(99) 99999-9999"
                  className="form-control"
                  id="telefone"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="nivelAcesso" className="form-label">Nível de Acesso:</label>
                <select
                  id="nivelAcesso"
                  className="form-select"
                  value={nivelAcesso}
                  onChange={(e) => setNivelAcesso(e.target.value)}
                  required
                >
                  <option value="">Selecione o Nível de Acesso</option>
                  {nivelAcessoOptions.map((nivel, index) => (
                    <option key={index} value={nivel}>
                      {nivel}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="statusUsuario" className="form-label">Status:</label>
                <select
                  id="statusUsuario"
                  className="form-select"
                  value={statusUsuario}
                  onChange={(e) => setStatusUsuario(e.target.value)}
                  required
                >
                  <option value="">Selecione o Status</option>
                  {statusOptions.map((status, index) => (
                    <option key={index} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="senha" className="form-label">Senha:</label>
                <div className="input-group">
                  <input
                    type={showSenha ? "text" : "password"}
                    className="form-control"
                    id="senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowSenha(!showSenha)}
                  >
                    {showSenha ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="senhaConfirmacao" className="form-label">Confirmação de Senha:</label>
                <div className="input-group">
                  <input
                    type={showSenhaConfirmacao ? "text" : "password"}
                    className="form-control"
                    id="senhaConfirmacao"
                    value={senhaConfirmacao}
                    onChange={(e) => setSenhaConfirmacao(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowSenhaConfirmacao(!showSenhaConfirmacao)}
                  >
                    {showSenhaConfirmacao ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="dataCadastro" className="form-label">Data de Cadastro:</label>
                <input
                  type="date"
                  className="form-control"
                  id="dataCadastro"
                  value={dataCadastro}
                  onChange={(e) => setDataCadastro(e.target.value)}
                  required
                />
              </div>

              <div className="text-center mt-4">
                <button type="submit" name="incluir" className="btn btn-success me-2">Incluir</button>
                <button type="submit" name="alterar" className="btn btn-warning me-2">Alterar</button>
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
