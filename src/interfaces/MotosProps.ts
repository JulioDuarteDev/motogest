import Disponibilidade from "./Disponibilidade";
import Modelo from "./Modelo";
import Moto from "./Moto";
import Variacao from "./Variacao";

export default interface MotosProps {
	id: Moto["id"][];
	disponibilidade: Disponibilidade["nome"];
	placa: Moto["placa"][];
	marca: Modelo["marca"][];
	modelo: Modelo["nome"][];
	cor: Variacao["cor"][];
}