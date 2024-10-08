import { useState } from "react";
import { useApiRequest } from "../hooks/useApiRequest";

const CadastroProduto = () => {
  const [produto, setProduto] = useState([]);
  const url = "http://localhost:8080/produtos";
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  const { data: items, httpConfig, loading, error } = useApiRequest(url);

  const [id, setId] = useState("");
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [codigoBarras, setCodigoBarras] = useState("");
  const [urlFoto, setUrlFoto] = useState("");
  const [preco, setPreco] = useState("");
  const [categoria_id, setCategoria_id] = useState("");
  const [statusProd, setStatusProd] = useState("");

  const handleItemClick = (produto) => {
    setId(produto.id);
    setNome(produto.nome);
    setDescricao(produto.descricao);
    setCodigoBarras(produto.codigoBarras);
    setUrlFoto(produto.urlFoto);
    setPreco(produto.preco);
    setCategoria_id(produto.categoria_id);
    setStatusProd(produto.statusProd);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const clickedButton = e.nativeEvent.submitter;
    const buttonName = clickedButton.name;

    if (buttonName === "incluir") {
      const produto = {
        nome,
        descricao,
        codigoBarras,
        urlFoto,
        preco,
        categoria_id,
        statusProd,
      };
      httpConfig(produto, "POST");
    } else if (buttonName === "alterar") {
      const produto = {
        nome,
        descricao,
        codigoBarras,
        urlFoto,
        preco,
        categoria_id,
        statusProd,
        id,
      };
      httpConfig(produto, "PUT");
    } else if (buttonName === "excluir") {
      const produto = {
        nome,
        descricao,
        codigoBarras,
        urlFoto,
        preco,
        categoria_id,
        statusProd,
        id,
      };
      httpConfig(produto, "DELETE");
    }

    // limpando os campos
    setId("");
    setNome("");
    setDescricao("");
    setCodigoBarras("");
    setUrlFoto("");
    setPreco("");
    setCategoria_id("");
    setStatusProd("");
  };

  return (
    <div className="container">
      <div className="row">
        {/* Tabela  */}
        <div className="col-md-6">
          <h4 className="text-center mt-5 mb-5 fs-6">Produtos da Pizzaria</h4>

          <div className="filter-produtos mb-3">
            <input
              type="text"
              placeholder="Pesquisar produto ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-control fs-6"
            />
          </div>
          <div style={{ height: "auto", overflowY: "auto" }}>
            <table className="table table-hover responsive">
              <thead style={{ position: "sticky", top: 0, background: "white" }}>
                <tr>
                  <th className="fs-6">Nome</th>
                  <th className="fs-6">Descrição</th>
                  <th className="fs-6">Preço</th>
                  <th className="fs-6">Status</th>
                  <th className="fs-6"></th>
                </tr>
              </thead>
              <tbody>
                {items &&
                  items
                    .filter(
                      (produto) =>
                        produto.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        produto.descricao.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .sort((a, b) => b.id - a.id)
                    .map((produto) => (
                      <tr
                        className={selectedItem === produto ? "table-active" : ""}
                        key={produto.id}
                        onClick={() => handleItemClick(produto)}
                      >
                        <td className="fs-6">{produto.nome}</td>
                        <td className="fs-6">{produto.descricao}</td>
                        <td className="fs-6">{produto.preco}</td>
                        <td className="fs-6">{produto.statusProd}</td>
                        <td>
                          <img
                            src={produto.urlFoto}
                            alt={produto.nome}
                            style={{ maxWidth: "40px", maxHeight: "40px" }}
                          />
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
          <div>
            {loading && <p className="fs-6">Carregando dados ... </p>}
            {error && <p className="fs-6">{error}</p>}
          </div>
        </div>
        {/* Formulário  */}
        <div className="col-md-6">
          <div className="mt-3 mt-5">
            <form onSubmit={handleSubmit} className="form">
              <div className="form-group mb-3">
                <label htmlFor="id" className="form-label fs-6">Id :</label>
                <input
                  className="form-control fs-6"
                  type="text"
                  disabled
                  value={id}
                  name="id"
                />
              </div>

              <div className="form-group mb-3">
                <label htmlFor="nome" className="form-label fs-6">Nome :</label>
                <input
                  className="form-control fs-6"
                  type="text"
                  value={nome}
                  name="nome"
                  onChange={(e) => setNome(e.target.value)}
                />
              </div>

              <div className="form-group mb-3">
                <label htmlFor="descricao" className="form-label fs-6">Descrição :</label>
                <textarea
                  className="form-control fs-6"
                  value={descricao}
                  name="descricao"
                  onChange={(e) => setDescricao(e.target.value)}
                  rows="4"
                />
              </div>

              <div className="form-group mb-3">
                <label htmlFor="codigoBarras" className="form-label fs-6">Código de Barras:</label>
                <input
                  className="form-control fs-6"
                  type="text"
                  value={codigoBarras}
                  name="codigoBarras"
                  onChange={(e) => setCodigoBarras(e.target.value)}
                />
              </div>

              <div className="form-group mb-3">
                <label htmlFor="preco" className="form-label fs-6">Preço :</label>
                <input
                  className="form-control fs-6"
                  type="text"
                  value={preco}
                  name="preco"
                  onChange={(e) => setPreco(e.target.value)}
                />
              </div>

              <div className="form-group mb-3">
                <label htmlFor="categoria_id" className="form-label fs-6">Categoria :</label>
                <input
                  className="form-control fs-6"
                  type="text"
                  value={categoria_id}
                  name="categoria_id"
                  onChange={(e) => setCategoria_id(e.target.value)}
                />
              </div>

              <div className="form-group mb-3">
                <label htmlFor="statusProd" className="form-label fs-6">Status :</label>
                <input
                  className="form-control fs-6"
                  type="text"
                  value={statusProd}
                  name="statusProd"
                  onChange={(e) => setStatusProd(e.target.value)}
                />
              </div>

              <div className="form-group mb-3">
                <label htmlFor="urlFoto" className="form-label fs-6">URL da Foto:</label>
                <input
                  className="form-control fs-6"
                  type="text"
                  value={urlFoto}
                  name="urlFoto"
                  onChange={(e) => setUrlFoto(e.target.value)}
                />
              </div>

              <div className="d-flex justify-content-between">
                {!loading && (
                  <button type="submit" className="btn btn-primary fs-6" name="incluir">
                    Incluir
                  </button>
                )}
                {!loading && (
                  <button type="submit" className="btn btn-primary fs-6" name="alterar">
                    Alterar
                  </button>
                )}
                {!loading && (
                  <button type="submit" className="btn btn-primary fs-6" name="excluir">
                    Excluir
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CadastroProduto;
