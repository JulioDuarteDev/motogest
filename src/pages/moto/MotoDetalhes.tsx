import { useParams } from 'react-router-dom';
export function MotoDetalhes() {
    const { id } = useParams();
    return (
      <>
      <h2>Detalhe de moto {id}</h2>
      </>
    );
  }