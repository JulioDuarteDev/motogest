import Modelo from "./Modelo";

export default interface Variacao {
	id: string;
	cor: string;
	url: string;
	modelo: Modelo["id"];
}
