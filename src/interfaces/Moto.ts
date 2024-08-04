import Disponibilidade from "./Disponibilidade";
import Modelo from "./Modelo";
import Variacao from "./Variacao";

export default interface Moto {
	ano: number;
	disponibilidade: Disponibilidade["id"];
	id: string;
	modelo: Modelo["id"];
	observacoes?: string;
	placa: string;
	quilometragem: number;
	variacao: Variacao["id"];
}
