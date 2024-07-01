import { useParams } from 'react-router-dom';
export function ModeloDetalhes() {
    const { id } = useParams();
    return (
      <>
      <h2>Detalhe de modelo {id}</h2>
      </>
    );
  }