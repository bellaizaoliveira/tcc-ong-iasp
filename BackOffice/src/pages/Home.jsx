import { Link } from "react-router-dom";
import { useApiRequest } from "../hooks/useApiRequest";

const apiPrefix = import.meta.env.VITE_API_PREFIX;

const Home = () => {
  // 5 - Carregando Produtos
  

  const endpoint = '/produto'; // O endpoint que você quer acessar
  const url = `${apiPrefix}${endpoint}`;

  console.log(url)
  const { data: items, loading, error } = useApiRequest(url);

  return (
    // "id": "1",
    // "nome": "Muçarela",
    // "descricao": "Base de molho de tomate com cobertura de muçarela, orégano e tomate",
    // "codigoBarras": "0001",
    // "urlFoto": "https://imagens.jotaja.com/produtos/75c06707-f149-445f-97e0-6c51c07bf4a8.jpg",
    // "preco": 29.98,
    // "categoria_id": 7,
    // "statusProd": "ATIVO"

    <div>
      <h1>Produtos</h1>
      {error && <p>{error}</p>}
      {items &&
        items.map((item) => (
          <li key={item.id}>
            <Link to={`/Produto/${item.id}`}>
              <h2>{item.nome}</h2>
            </Link>
            <p>R${item.preco}</p>
            <img src={item.urlFoto} alt={item.nome} />
          </li>
        ))}
    </div>
  );
};

export default Home;
