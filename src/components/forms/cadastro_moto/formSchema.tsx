import { z } from "zod";

const numeroValido = "Informe um número válido";
const valorValido = "Informe um valor válido";
const diaValido = "Informe um dia válido";
const anoValido = "Informe um ano válido";

const schemaGeral = z.object({
	modelo: z.string({
		message: "É necessário selecionar um modelo",
	}),
	marca: z.string({
		message: "É necessário selecionar uma marca",
	}),
	variacao: z.string({
		message: "É necessário selecionar uma cor",
	}),
	disponibilidade: z.string({
		message: "É necessário selecionar a disponibilidade",
	}),
	placa: z
		.string({ message: "É necessário informar a placa" })
		.length(7, "Informe uma placa válida"),
	ano: z.coerce
		.number({ message: anoValido })
		.positive(anoValido)
		.min(1000, anoValido),

	quilometragem: z.coerce
		.number({ message: numeroValido })
		.nonnegative(numeroValido),
	observacoes: z
		.string()
		.max(1000, "O campo observações deve ter no máximo 1000 caracteres")
		.optional(),
});

const schemaFinanciamento = z
	.object({
		quitado: z
			.string({
				message: "É necessário selecionar a situação financeira",
			})
			.transform((val) => val === "true"),
		valor: z.coerce.number({ message: valorValido }).positive(valorValido),
		valor_parcela: z.coerce.number({ message: valorValido }),
		parcelas_restantes: z.coerce.number({ message: numeroValido }),
		dia_vencimento: z.coerce.number({ message: diaValido }),
	})
	.superRefine((values, ctx) => {
		if (values.quitado) return;

		const campos = [
			{ campo: "valor_parcela", mensagem: valorValido },
			{ campo: "parcelas_restantes", mensagem: numeroValido },
			{ campo: "dia_vencimento", mensagem: diaValido },
		];

		campos.forEach(({ campo, mensagem }) => {
			if (!values[campo]) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: mensagem,
					path: [campo],
				});
			}
		});
	});

const formSchema = z.intersection(schemaGeral, schemaFinanciamento);

export default formSchema;
