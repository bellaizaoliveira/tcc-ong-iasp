import { useParams  } from "react-router-dom"

const InfoProduto = () => {

    const { id } = useParams();    

  return (
    <div>
        <h1>Mais informaçõe do produto : {id}</h1>
        
        
        
        </div>
  )
}

export default InfoProduto