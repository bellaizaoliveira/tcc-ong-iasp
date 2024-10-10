import React from 'react'; // Removi 'useState', 'useEffect' pois não são usados
import loginImage from '../assets/images/IconLogin.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/custom.css';

const Sobre = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <h1 className="mb-4">Bem-vindo à IASP</h1>
          <p>
            A IASP (Instituto de Assistência e Solidariedade às Pessoas) é uma ONG dedicada a fornecer assistência às comunidades afetadas por desastres naturais, como enchentes e deslizamentos de terra. Nosso objetivo é aliviar o sofrimento das vítimas, promovendo a conscientização ambiental e a solidariedade social.
          </p>
          <p>
            Trabalhamos para resgatar vidas, preservar a dignidade humana e minimizar os impactos de eventos adversos, sempre em busca de práticas sustentáveis e de uma convivência harmoniosa com o meio ambiente.
          </p>
        </div>
        <div className="col-md-6 text-center">
          <img src={loginImage} alt="Login" className="img-fluid" />
        </div>
      </div>

      <div className="mt-5">
        <h2>O que fazemos</h2>
        <ul>
          <li>Assistência imediata: Fornecemos ajuda a comunidades afetadas por desastres naturais.</li>
          <li>Conscientização: Promovemos campanhas educativas sobre a importância da preservação ambiental e a mitigação de desastres.</li>
          <li>Voluntariado: Convidamos pessoas a se juntarem a nós como voluntários, contribuindo com seu tempo e habilidades.</li>
        </ul>
      </div>

      <div className="mt-5">
        <h2>Aplicativo IASP</h2>
        <p>
          Para facilitar a comunicação e o registro de ocorrências, desenvolvemos um aplicativo prático e fácil de usar. Através dele, você pode:
        </p>
        <ul>
          <li>Registrar ocorrências: Informe sobre situações que necessitam de assistência.</li>
          <li>Ver ocorrências: Acompanhe as solicitações feitas por outros usuários.</li>
          <li>Ser voluntário: Entre em contato conosco para se tornar um voluntário.</li>
          <li>Realizar doações: Contribua com a nossa causa enviando um e-mail para a ONG.</li>
        </ul>
      </div>

      <div className="mt-5">
        <h2>Como instalar o aplicativo</h2>
        <ol>
          <li>Acesse a Google Play Store ou a App Store e busque pelo "Aplicativo IASP".</li>
          <li>Baixe e instale.</li>
          <li>Abra o aplicativo e siga as instruções para criar sua conta ou fazer login.</li>
        </ol>
      </div>

      <div className="mt-5">
        <h2>Entre em contato</h2>
        <p>
          Se você tiver dúvidas ou precisar de mais informações, não hesite em nos contatar através do e-mail: <a href="mailto:contato@iasp.org.br">contato@iasp.org.br</a>.
        </p>
      </div>
    </div>
  );
};

export default Sobre;