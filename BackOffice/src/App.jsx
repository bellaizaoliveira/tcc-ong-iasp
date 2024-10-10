import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Sobre from "./pages/Sobre";
import Produto from "./pages/Produto";
import InfoProduto from "./pages/InfoProduto";
import NotFound from "./pages/NotFound";
import NavBar from "./components/NavBar";
import Administracao from "./containers/Administracao";
import CadastroOcorrencia from './containers/CadastroOcorrencia';  
import CadastroFotosOcorrencia from './containers/CadastroFotosOcorrencia';  
import Login from "./components/Login";
import { AuthProvider } from "./context/AuthContext"; // Importar o AuthProvider
import ProtectedRoute from "./components/ProtectedRoute";

import './styles/custom.css';
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/produto/:id" element={<Produto />} />
          <Route path="/produto/:id/info" element={<InfoProduto />} />
          {/* <Route path="/quadroocorrencias" element={<QuadroOcorrencias />} /> */}
          <Route path="/cadastroocorrencia/:id" element={<CadastroOcorrencia />} />
          <Route path="/cadastroocorrencia" element={<CadastroOcorrencia />} />
          <Route path="/cadastrofotosocorrencia/:ocorrenciaId" element={<CadastroFotosOcorrencia />} />
          {/* <Route path="/administracao/*" element={<Administracao />} /> */}
          <Route path="/login" element={<Login />} />
          <Route
            path="/administracao/*"
            element={
              <ProtectedRoute>
                <Administracao />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

