import React from 'react'; 
import loginImage from '../assets/images/IconLogin.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../pages/Sobre.css';
import '../styles/custom.css';

const Sobre = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <h1 className="mb-4">Bem-vindo à IASP</h1>
          <p>
            A IASP (Instituto de Auxílio de São Paulo) é uma ONG dedicada a fornecer assistência a comunidades afetadas por desastres naturais, como alagamentos, desabamentos, desmoronamentos e enchentes. Nosso objetivo é aliviar o sofrimento das vítimas, promovendo a conscientização ambiental, a solidariedade social e ações de socorro emergencial.
          </p>
          <p>
            Trabalhamos intensamente para resgatar vidas, preservar a dignidade humana e minimizar os impactos de eventos adversos. Adotamos práticas sustentáveis, buscando a convivência harmoniosa com o meio ambiente e soluções para mitigar futuros desastres. Atuamos exclusivamente no estado de São Paulo, concentrando nossos esforços nas áreas mais vulneráveis da região.
          </p>
        </div>
        <div className="col-md-6 text-center">
          <img src={loginImage} alt="Login" className="img-fluid" />
        </div>
      </div>

      <div className="mt-5">
        <h2>O que fazemos</h2>
        <ul>
          <li>Assistências: Apoiamos comunidades afetadas por alagamentos, desmoronamentos e outros desastres naturais, sempre contando com o trabalho dedicado de nossos voluntários.</li>
          <li>Conscientização: Promovemos campanhas educativas sobre preservação ambiental e prevenção de desastres.</li>
          <li>Voluntariado: Convidamos voluntários para contribuir com suas habilidades e tempo em nossas operações de emergência.</li>
          <li>Pedidos de doação: Facilitamos doações, que são vitais para a continuidade de nosso trabalho em áreas atingidas por desastres.</li>
        </ul>
      </div>

      <div className="mt-5">
        <h2>Como ajudamos</h2>
        <p>
          Nossa atuação em São Paulo é guiada por uma estratégia organizada, que envolve nossos voluntários e o contato com autoridades locais. Assim que uma situação de desastre natural é reportada, acionamos nossa rede de voluntários e coordenamos a ação de resgate e assistência. Trabalhamos em colaboração com as autoridades competentes, como bombeiros e defesa civil, para garantir que as operações sejam realizadas de forma rápida e eficaz.
        </p>
        <p>
          Além de prestar auxílio emergencial, nossa equipe também oferece suporte emocional e logístico às vítimas, distribuindo mantimentos, roupas e itens de primeira necessidade. Estamos comprometidos em oferecer ajuda de maneira coordenada e responsável, sempre respeitando as diretrizes de segurança estabelecidas pelas autoridades.
        </p>
      </div>

      <div className="mt-5">
        <h2>Tipos de Desastres que Atendemos</h2>
        <p>
          A IASP atende exclusivamente o estado de São Paulo, oferecendo assistência emergencial e apoio humanitário para as seguintes situações:
        </p>
        <ul>
          <li>
            <strong>Alagamento:</strong> Prestamos socorro às vítimas de alagamentos, distribuindo mantimentos e fornecendo abrigo temporário quando necessário. Nossos voluntários trabalham para evacuar áreas inundadas e reduzir os danos causados pela água.
          </li>
          <li>
            <strong>Desabamento:</strong> Oferecemos suporte em casos de desabamentos de edificações, ajudando no resgate de vítimas e na coordenação de operações de emergência com autoridades locais.
          </li>
          <li>
            <strong>Desmoronamento:</strong> Em áreas afetadas por desmoronamentos, nossa equipe atua no resgate de sobreviventes e na recuperação de pertences pessoais, sempre respeitando as diretrizes de segurança e prevenção.
          </li>
          <li>
            <strong>Enchente:</strong> Enchentes frequentes podem desabrigar milhares de pessoas. Nossa equipe trabalha no fornecimento de recursos essenciais, como água potável, alimentos e roupas, além de ajudar na recuperação das comunidades afetadas.
          </li>
          <li>
            <strong>Outro:</strong> Além dos desastres naturais citados, oferecemos suporte para outras situações adversas que possam ocorrer no estado de São Paulo, sempre alinhados com nossa missão de preservar a vida e a dignidade humana.
          </li>
        </ul>
        <p>
          Nossa atuação está limitada ao estado de São Paulo, onde buscamos fazer a diferença nas comunidades mais impactadas pelos desastres naturais.
        </p>
      </div>

      <div className="mt-5">
        <h2>Aplicativo IASP</h2>
        <p>
          Para melhorar nossa resposta e comunicação, criamos um aplicativo prático e fácil de usar. Através dele, você pode:
        </p>
        <ul>
          <li>Registrar ocorrências: Informe-nos sobre situações como enchentes, alagamentos, desabamentos ou desmoronamentos que necessitam de assistência imediata.</li>
          <li>Ser voluntário: Cadastre-se e contribua com seu tempo e habilidades diretamente pelo aplicativo.</li>
          <li>Realizar doações: Envie doações diretamente ou entre em contato conosco por e-mail para ajudar financeiramente as vítimas dos desastres.</li>
        </ul>
      </div>

      <div className="mt-5">
        <h2>Como instalar o aplicativo</h2>
        <ol>
          <li>Acesse a Google Play Store ou a App Store e busque pelo aplicativo "IASP".</li>
          <li>Baixe e instale o aplicativo.</li>
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
