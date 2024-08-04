import Marca from "./Marca";
import Variacao from "./Variacao";

export default interface Modelo {
	id: string;
	nome: string;
	cilindrada: string;
	marca: Marca["nome"];
	cores: Variacao[];
}
