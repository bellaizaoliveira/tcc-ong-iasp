import { Link, useParams } from "react-router-dom";
import { useApiRequest } from "../hooks/useApiRequest";
const Produto = () => {
  // 6 - Rota Dinâmica

  const { id } = useParams();

  // 7 - Carregamento de Dado Individual
  const url = "http://localhost:3000/produto/" + id;

  const { data: produto, loading, error } = useApiRequest(url);
  return (
    <div>
      <h1>Produto</h1>
      <p>Id do Produto : {id} </p>
      {error && <p> Ocorreu um erro ... </p>}
      {loading && <p>Carregando ...</p>}
      {produto && (
        <div>
          <h1>{produto.nome}</h1>
          <p>R$ {produto.preco}</p>
          {/* 8 - nested routes */}
          <Link to={`/produto/${produto.id}/info`}>Mais Informações </Link>
        </div>
      )}
    </div>
  );
};

export default Produto;
