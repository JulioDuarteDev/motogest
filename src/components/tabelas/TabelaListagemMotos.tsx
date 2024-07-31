import {
	ColumnDef,
	ColumnFiltersState,
	SortingState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import {
	ArrowUpDown,
	ClipboardPen,
	Eye,
	MoreHorizontal,
	PlusIcon,
	SquarePen,
	Trash2Icon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MotosProps } from "@/interfaces/MotosProps";
import useApi from "@/hooks/useApi";
import { toast } from "@/components/ui/use-toast.ts";

interface TabelaListagemMotosProps {
	data: MotosProps[];
}

export function TabelaListagemMotos({ data }: TabelaListagemMotosProps) {
  const navigate = useNavigate();
  const { deleteById } = useApi();
  
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

	function getVarianteBadge(disponibilidade: MotosProps["disponibilidade"]) {
		switch (disponibilidade) {
			case "Disponível":
				return "success";
			case "Em manutenção":
				return "destructive";
			case "Locada":
				return "neutral";
			default:
				return undefined;
		}
  }
  async function handleExcluirMoto(moto: MotosProps) {
    try {
      await deleteById("motos", moto.id);
      toast({
        title: "Sucesso!",
        description: `Moto de placa "${moto.placa}" cadastrada com sucesso!`,
        variant: "success",
      });
      navigate(0);
    } catch (error) {
      toast({
        title: "Ops!",
        description: error.message,
        variant: "destructive",
      });
    }
  }

	const columns: ColumnDef<MotosProps>[] = [
		{
			accessorKey: "disponibilidade",
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						size="sm"
						className="flex items-center gap-2"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					>
						Disponibilidade
						<ArrowUpDown className="size-4" />
					</Button>
				);
			},
			cell: ({ row }) => (
				<Badge
					className="capitalize"
					variant={getVarianteBadge(row.getValue("disponibilidade"))}
				>
					{row.getValue("disponibilidade")}
				</Badge>
			),
		},
		{
			accessorKey: "placa",
			header: () => <div>Placa</div>,
			cell: ({ row }) => (
				<div className="uppercase">{row.getValue("placa")}</div>
			),
		},
		{
			accessorKey: "ano",
			header: () => <div>Ano</div>,
			cell: ({ row }) => <div>{row.getValue("ano")}</div>,
		},

		{
			accessorKey: "modelo",
			header: () => <div>Modelo</div>,
			cell: ({ row }) => <div>{row.getValue("modelo")}</div>,
		},
		{
			accessorKey: "cor",
			header: () => <div>Cor</div>,
			cell: ({ row }) => <div>{row.getValue("cor")}</div>,
		},
		{
			accessorKey: "marca",
			header: () => <div>Marca</div>,
			cell: ({ row }) => <div>{row.getValue("marca")}</div>,
		},
		{
			id: "actions",
			enableHiding: false,
			header: () => <div>Ações</div>,
			cell: ({ row }) => {
				const item = row.original;
				const text = `Placa: ${item.placa}\nMarca: ${item.marca}\nModelo: ${item.modelo}\nCor: ${item.cor}\nDisponibilidade: ${item.disponibilidade}`;

				return (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" className="size-8 p-0">
								<span className="sr-only">Abrir menu de ações</span>
								<MoreHorizontal className="size-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>Ações</DropdownMenuLabel>
							<DropdownMenuItem
								className="flex gap-2"
								onClick={() => {
									navigator.clipboard.writeText(text);
								}}
							>
								<ClipboardPen className="size-4" />
								Copiar informações
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem
								className="flex gap-2"
								onClick={() => navigate(item.id)}
							>
								<Eye className="size-4" />
								Ver detalhes
							</DropdownMenuItem>
							<DropdownMenuItem
								className="flex gap-2"
								onClick={() => navigate(`edicao/${item.id}`)}
							>
								<SquarePen className="size-4" />
								Editar
							</DropdownMenuItem>
							<DropdownMenuItem
								className="flex gap-2"
								onClick={() => handleExcluirMoto(item)}
							>
								<Trash2Icon className="size-4" />
								Excluir
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				);
			},
		},
	];

	const table = useReactTable({
		data,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		state: {
			sorting,
			columnFilters,
		},
	});

	function formataDetalhesPaginacao() {
		const paginacao = table.options?.state?.pagination;
		const tamanhoPagina = paginacao?.pageSize || 10;
		const paginaAtual = paginacao?.pageIndex + 1 || 1;
		const totalMotos = table.getFilteredRowModel().rows.length;
		const inicioContagem = (paginaAtual - 1) * tamanhoPagina + 1;
		const fimContagem = Math.min(
			inicioContagem + tamanhoPagina - 1,
			totalMotos
		);

		return `Exibindo ${inicioContagem}-${fimContagem} de ${totalMotos} motos.`;
	}

	

	return (
		<div className="w-full container">
			<div className="flex items-center justify-between py-4">
				<Input
					placeholder="Filtrar por placa..."
					value={(table.getColumn("placa")?.getFilterValue() as string) ?? ""}
					onChange={(event) =>
						table.getColumn("placa")?.setFilterValue(event.target.value)
					}
					className="max-w-sm"
				/>
				<Button className="flex gap-2" onClick={() => navigate("cadastro")}>
					<PlusIcon className="size-4" />
					Cadastrar moto
				</Button>
			</div>
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{flexRender(
												header.column.columnDef.header,
												header.getContext()
											)}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									Não foram encontrados registros.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className="flex items-center justify-end space-x-2 py-4">
				<div className="flex-1 text-sm text-muted-foreground">
					{formataDetalhesPaginacao()}
				</div>
				<div className="space-x-2">
					{(table.getCanPreviousPage() || table.getCanNextPage()) && (
						<>
							<Button
								variant="outline"
								size="sm"
								onClick={() => table.previousPage()}
								disabled={!table.getCanPreviousPage()}
							>
								Anterior
							</Button>
							<Button
								variant="outline"
								size="sm"
								onClick={() => table.nextPage()}
								disabled={!table.getCanNextPage()}
							>
								Seguinte
							</Button>
						</>
					)}
				</div>
			</div>
		</div>
	);
}
