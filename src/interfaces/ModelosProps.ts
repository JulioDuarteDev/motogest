import Modelo from "./Modelo";

export interface ModelosProps {
	id: Modelo["id"];
	quantidade_motos: number;
	cilindrada: Modelo["cilindrada"];
	marca: Modelo["marca"];
	nome: Modelo["nome"];
}