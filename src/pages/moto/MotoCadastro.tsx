// TODO: ajustar mensagens de validação do ZOD em todos os inputs
// TODO: adicionar mascaras para valor e data
// TODO: adicionar mais campos na situação financeira


import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea"

const formSchema = z.object({
  // Informações gerais
  modelo: z.string({
    required_error: "É necessário selecionar um modelo",
  }),
  marca: z.string({
    required_error: "É necessário selecionar uma marca",
  }),
  cor: z.string({
    required_error: "É necessário selecionar uma cor",
  }),
  disponibilidade: z.string({
    required_error: "É necessário selecionar a disponibilidade",
  }),
  responsavel: z.string({
    required_error: "É necessário selecionar um responsável",
  }),
  placa: z.string({required_error:"É necessário informar a placa"}).length(7, "Informe uma placa válida"),
  ano: z.string({required_error:"É necessário informar o ano"}).length(4, "Informe um ano válido"),
  quilometragem: z.coerce
    .number({ message: "Informe um número válido" })
    .int("Informe um número inteiro")
    .positive("Informe um número positivo"),
  observacoes: z.string().max(1000, "O campo observações deve ter no máximo 1000 caracteres").optional(),

  // Informações financeiras
  situacao: z.string({
    required_error: "É necessário selecionar a situação financeira",
  }),
  valor: z.coerce
    .number({ message: "Informe um valor válido" })
    .positive("Informe um valor positivo")
});

const marcas = [
  { nome: "Yamaha", id: "1" },
  { nome: "Honda", id: "2" },
];

const modelos = [
  {nome: "Fazer 250", id: "1"},
  {nome: "XRE 300", id: "2"},
  {nome: "CB 500", id: "3"},
]

const cores = [
  {nome: "Vermelho", id: "1"},
  {nome: "Azul", id: "2"},
  {nome: "Preto", id: "3"},
  {nome: "Branco", id: "4"},
]

const situacoes = [
  {nome: "Paga", id: "1"},
  {nome: "Financiando", id: "2"},
]

const disponibilidade = [
  {nome: "Disponível", id: "1"},
  {nome: "Alugada", id: "2"},
  {nome: "Em manutenção", id: "3"},
]

const responsaveis = [
  {nome: "João", id: "1"},
  {nome: "Maria", id: "2"},
  {nome: "José", id: "3"},
]

export function MotoCadastro() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      placa: "",
      ano: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    });
  }

  const isCadastro = true;
  return (
    <div className="container">
      <h2 className="text-3xl font-bold tracking-tight">
        {isCadastro ? "Cadastro" : "Edição"} de moto
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <fieldset className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 rounded-lg border p-4">
            <legend className="-ml-1 px-1 text-sm font-medium">
              Informações gerais
            </legend>
            <FormField
              control={form.control}
              name="marca"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Marca</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma marca" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {marcas.map((item) => {
                        return (
                          <SelectItem key={item.id} value={item.id}>
                            {item.nome}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="modelo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Modelo</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um modelo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {modelos.map((item) => {
                        return (
                          <SelectItem key={item.id} value={item.id}>
                            {item.nome}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cor</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma cor" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {cores.map((item) => {
                        return (
                          <SelectItem key={item.id} value={item.id}>
                            {item.nome}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="placa"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Placa</FormLabel>
                  <FormControl>
                    <Input placeholder="Informe a placa" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ano"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ano</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Informe o ano"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quilometragem"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quilometragem</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Informe a quilometragem atual"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="disponibilidade"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Disponibilidade</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a disponibilidade" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {disponibilidade.map((item) => {
                        return (
                          <SelectItem key={item.id} value={item.id}>
                            {item.nome}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="responsavel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Responsável</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o responsável" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {responsaveis.map((item) => {
                        return (
                          <SelectItem key={item.id} value={item.id}>
                            {item.nome}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="observacoes"
              render={({ field }) => (
                <FormItem className="md:col-span-2 lg:col-span-3">
                  <FormLabel>Observações</FormLabel>
                  <FormControl>
                  <Textarea
                  placeholder="Informe aqui qualquer observação extra sobre a moto"
                  className="resize-none"
                  {...field}
                />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </fieldset>

          <fieldset className="grid gap-4 md:grid-cols-2 rounded-lg border p-4">
            <legend className="-ml-1 px-1 text-sm font-medium">
              Informações financeiras
            </legend>
            <FormField
              control={form.control}
              name="situacao"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Situação financeira</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a situação financeira" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {situacoes.map((item) => {
                        return (
                          <SelectItem key={item.id} value={item.id}>
                            {item.nome}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="valor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor nominal</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Informe o valor nominal"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          </fieldset>

          <Button type="submit">{isCadastro ? "Cadastrar" : "Editar"}</Button>
        </form>
      </Form>
    </div>
  );
}
