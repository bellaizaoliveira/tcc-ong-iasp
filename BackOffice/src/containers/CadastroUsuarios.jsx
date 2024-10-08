import React, { useState, useEffect } from "react";
import { useApiRequest } from "../hooks/useApiRequest";
import bcrypt from "bcryptjs";
import './CadastroUsuarios.css'; // Importa o CSS

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
  const [dataCadastro, setDataCadastro] = useState(""); // Campo de data
  const [senhaOriginal, setSenhaOriginal] = useState("");

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
    setDataCadastro(usuario.dataCadastro); // Captura a data de cadastro
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
      dataCadastro, // Utiliza o valor da data de cadastro
    };

    if (buttonName === "incluir") {
      const salt = await bcrypt.genSalt(10);
      const senhaHash = await bcrypt.hash(senha, salt);
      usuario.senha = senhaHash;
      usuario.dataCadastro = new Date().toISOString(); // Define a data de cadastro como a data e hora atual
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

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("Texto copiado: " + text);
    }, (err) => {
      alert("Erro ao copiar: " + err);
    });
  };

  const handleNewUser = () => {
    setSelectedItem(null); // Limpa a seleção do usuário
    setId("");
    setNome("");
    setEmail("");
    setSenha("");
    setSenhaConfirmacao("");
    setStatusUsuario("");
    setNivelAcesso("");
    setCpf("");
    setTelefone("");
    setDataCadastro(""); // Limpa a data de cadastro
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <h4 className="text-center mt-5 mb-5">Cadastro de Usuários</h4>

          <div className="filter-usurios mb-3">
            <input
              type="text"
              placeholder="Pesquisar usuários ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-control"
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
                  <th className="fs-small">Data de Cadastro</th> {/* Adiciona coluna para a data de cadastro */}
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
                        <td className="fs-small">{usuario.dataCadastro}</td> {/* Exibe data de cadastro */}
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
                  className="form-control"
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

              <div className="form-group mb-3">
                <label htmlFor="senha" className="form-label">Senha :</label>
                <input
                  className="form-control"
                  type="password"
                  value={senha}
                  name="senha"
                  onChange={(e) => setSenha(e.target.value)}
                />
              </div>

              <div className="form-group mb-3">
                <label htmlFor="senhaConfirmacao" className="form-label">Confirme a Senha :</label>
                <input
                  className="form-control"
                  type="password"
                  value={senhaConfirmacao}
                  name="senhaConfirmacao"
                  onChange={(e) => setSenhaConfirmacao(e.target.value)}
                />
              </div>

              <div className="form-group mb-3">
                <label htmlFor="nivelAcesso" className="form-label">Nível de Acesso :</label>
                <select
                  className="form-control"
                  value={nivelAcesso}
                  onChange={(e) => setNivelAcesso(e.target.value)}
                >
                  <option value="">Selecione...</option>
                  {!loadingNivelAcesso && nivelAcessoOptions.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div className="form-group mb-3">
                <label htmlFor="statusUsuario" className="form-label">Status :</label>
                <select
                  className="form-control"
                  value={statusUsuario}
                  onChange={(e) => setStatusUsuario(e.target.value)}
                >
                  <option value="">Selecione...</option>
                  {!loadingStatus && statusOptions.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div className="form-group mb-3">
                <label htmlFor="cpf" className="form-label">CPF :</label>
                <input
                  className="form-control"
                  type="text"
                  value={cpf}
                  name="cpf"
                  onChange={(e) => setCpf(e.target.value)}
                />
              </div>

              <div className="form-group mb-3">
                <label htmlFor="telefone" className="form-label">Telefone :</label>
                <input
                  className="form-control"
                  type="text"
                  value={telefone}
                  name="telefone"
                  onChange={(e) => setTelefone(e.target.value)}
                />
              </div>

              <div className="form-group mb-3">
                <label htmlFor="dataCadastro" className="form-label">Data de Cadastro:</label>
                <input
                  className="form-control"
                  type="text"
                  value={dataCadastro ? new Date(dataCadastro).toLocaleString() : ""} // Formata a data
                  name="dataCadastro"
                  readOnly // Torna o campo somente leitura
                />
              </div>

              <button type="submit" className="btn btn-success" name="incluir">Incluir</button>
              <button type="submit" className="btn btn-warning" name="alterar">Alterar</button>
              <button type="submit" className="btn btn-danger" name="excluir">Excluir</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CadastroUsuarios;
