import Variacao from "./Variacao";

export default interface Modelo {
	id: number;
	nome: string;
	cilindrada: string;
	marca: string;
	cores: Variacao[];
}
