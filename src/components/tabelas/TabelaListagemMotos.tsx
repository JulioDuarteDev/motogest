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
import { Button, buttonVariants } from "@/components/ui/button";
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
import { Link, useNavigate } from "react-router-dom";
import { MotosProps } from "@/interfaces/MotosProps";
import useApi from "@/hooks/useApi";
import { toast } from "@/components/ui/use-toast.ts";
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
import utils from "@/utils/utils";

interface TabelaListagemMotosProps {
	data: MotosProps[];
}

export function TabelaListagemMotos({ data }: TabelaListagemMotosProps) {
	const navigate = useNavigate();
	const { deleteById } = useApi();
	const { getVarianteBadge } = utils();

	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [itemExcluir, setItemExcluir] = useState<MotosProps>({} as MotosProps);
	const [openAlert, setOpenAlert] = useState(false);

	async function handleExcluirMoto(moto: MotosProps) {
		try {
			await deleteById("motos", moto.id);
			navigate(0);
			toast({
				title: "Sucesso!",
				description: `Moto de placa "${moto.placa}" deletada com sucesso!`,
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
		const totalMotos = table.getFilteredRowModel().rows.length;

		if (totalMotos === 0) return;

		const paginacao = table.options?.state?.pagination;
		const tamanhoPagina = paginacao?.pageSize || 10;
		const paginaAtual = (paginacao?.pageIndex || 0) + 1;
		const inicioContagem = (paginaAtual - 1) * tamanhoPagina + 1;
		const fimContagem = Math.min(
			inicioContagem + tamanhoPagina - 1,
			totalMotos
		);
		const plural = totalMotos > 1 ? "s" : "";

		return `Exibindo ${inicioContagem}-${fimContagem} de ${totalMotos} moto${plural}`;
	}

	return (
		<>
			<div className="flex items-center justify-between py-4">
				<Input
					placeholder="Filtrar por placa..."
					value={(table.getColumn("placa")?.getFilterValue() as string) ?? ""}
					onChange={(event) =>
						table.getColumn("placa")?.setFilterValue(event.target.value)
					}
					className="max-w-sm"
				/>
				<Link
					className={buttonVariants({ variant: "default" }) + " flex gap-2"}
					to="cadastro"
				>
					<PlusIcon className="size-4" />
					Cadastrar moto
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
							a moto de placa <strong>{itemExcluir.placa}</strong> e todas suas
							informações associadas de nossos servidores.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel onClick={() => setOpenAlert(false)}>
							Cancelar
						</AlertDialogCancel>
						<AlertDialogAction
							className={buttonVariants({ variant: "destructive" })}
							onClick={() => handleExcluirMoto(itemExcluir)}
						>
							Excluir
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
}
