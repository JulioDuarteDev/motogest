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
	MoreHorizontal,
	PlusIcon,
	SquarePen,
	Trash2Icon,
} from "lucide-react";
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
import { ModelosProps } from "@/interfaces/ModelosProps";
import useApi from "@/hooks/useApi";
import { toast } from "@/components/ui/use-toast.ts";
import { Link } from "react-router-dom";
import { Button, buttonVariants } from "@/components/ui/button";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface TabelaListagemModelosProps {
	data: ModelosProps[];
}

export function TabelaListagemModelos({ data }: TabelaListagemModelosProps) {
	const navigate = useNavigate();
	const { deleteById } = useApi();

	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [itemExcluir, setItemExcluir] = useState<ModelosProps>(
		{} as ModelosProps
	);
	const [openAlert, setOpenAlert] = useState(false);

	async function handleExcluirModelo(modelo: ModelosProps) {
		try {
			await deleteById("modelos", modelo.id);
			navigate(0);
			toast({
				title: "Sucesso!",
				description: `Modelo "${modelo.nome}" excluído com sucesso!`,
				variant: "success",
			});
		} catch (error) {
			toast({
				title: "Ops!",
				description: error.message,
				variant: "destructive",
			});
		}
	}

	const columns: ColumnDef<ModelosProps>[] = [
		{
			accessorKey: "marca",
			header: () => <div>Marca</div>,
			cell: ({ row }) => <div>{row.getValue("marca")}</div>,
		},
		{
			accessorKey: "nome",
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						size="sm"
						className="flex items-center gap-2"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					>
						Modelo
						<ArrowUpDown className="size-4" />
					</Button>
				);
			},
			cell: ({ row }) => <div>{row.getValue("nome")}</div>,
		},
		{
			accessorKey: "cilindrada",
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						size="sm"
						className="flex items-center gap-2"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					>
						Cilindradas
						<ArrowUpDown className="size-4" />
					</Button>
				);
			},
			cell: ({ row }) => <div>{row.getValue("cilindrada")}</div>,
		},
		{
			accessorKey: "quantidade_motos",
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						size="sm"
						className="flex items-center gap-2"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					>
						Quantidade de motos
						<ArrowUpDown className="size-4" />
					</Button>
				);
			},
			cell: ({ row }) => <div>{row.getValue("quantidade_motos")}</div>,
		},

		{
			id: "actions",
			enableHiding: false,
			header: () => <div>Ações</div>,
			cell: ({ row }) => {
				const item = row.original;
				const text = `Modelo: ${item.nome}\nMarca: ${item.marca}\nCilindradas: ${item.cilindrada}\nQuantidade de motos: ${item.quantidade_motos}`;

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
								onClick={() => navigate(`edicao/${item.id}`)}
							>
								<SquarePen className="size-4" />
								Editar
							</DropdownMenuItem>
							<DropdownMenuItem
								className="flex gap-2"
								onClick={() => {
									setItemExcluir(item);
									setOpenAlert(true);
								}}
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
		const totalModelos = table.getFilteredRowModel().rows.length;

		if (totalModelos === 0) return;

		const paginacao = table.options?.state?.pagination;
		const tamanhoPagina = paginacao?.pageSize || 10;
		const paginaAtual = (paginacao?.pageIndex || 0) + 1;
		const inicioContagem = (paginaAtual - 1) * tamanhoPagina + 1;
		const fimContagem = Math.min(
			inicioContagem + tamanhoPagina - 1,
			totalModelos
		);
		const plural = totalModelos > 1 ? "s" : "";

		return `Exibindo ${inicioContagem}-${fimContagem} de ${totalModelos} modelo${plural}`;
	}

	return (
		<>
			<div className="flex items-center justify-between py-4">
				<Input
					placeholder="Filtrar por modelo..."
					value={(table.getColumn("nome")?.getFilterValue() as string) ?? ""}
					onChange={(event) =>
						table.getColumn("nome")?.setFilterValue(event.target.value)
					}
					className="max-w-sm"
				/>
				<Link
					className={buttonVariants({ variant: "default" }) + " flex gap-2"}
					to="cadastro"
				>
					<PlusIcon className="size-4" />
					Cadastrar modelo
				</Link>
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
			<AlertDialog open={openAlert}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Tem certeza que deseja excluir?</AlertDialogTitle>
						<AlertDialogDescription>
							Essa ação não pode ser revertida. Isso irá deletar permanentemente
							o modelo <strong>{itemExcluir.nome}</strong>
							{itemExcluir.quantidade_motos > 0 &&
								"e suas " +
									itemExcluir.quantidade_motos +
									" motos associadas"}{" "}
							de nossos servidores.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel onClick={() => setOpenAlert(false)}>
							Cancelar
						</AlertDialogCancel>
						<AlertDialogAction
							className={buttonVariants({ variant: "destructive" })}
							onClick={() => handleExcluirModelo(itemExcluir)}
						>
							Excluir
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
}
