/**
 * DataTable é um componente abrangente projetado para renderizar e manipular grandes conjuntos de dados 
 * em formato tabular. Utiliza a poderosa biblioteca @tanstack/react-table para fornecer funcionalidades 
 * como ordenação, seleção de linhas, filtragem e paginação.
 * 
 * Principais funcionalidades:
 * - Ordenação: Permite ordenar os dados em uma coluna específica.
 * - Filtragem: Suporta a aplicação de filtros nas colunas para refinar os dados exibidos.
 * - Paginação: Divide os dados em páginas manejáveis, melhorando a performance ao lidar com grandes volumes.
 * - Visibilidade de Colunas: Oferece a capacidade de mostrar ou esconder colunas conforme a necessidade do usuário.
 * - Seleção de Linhas: Habilita a seleção de múltiplas linhas, útil para operações em lote.
 * 
 * A arquitetura do componente é construída sobre uma combinação de controles UI reutilizáveis e ganchos de estado React,
 * garantindo que a tabela seja tanto flexível quanto eficiente. A integração de barras de ferramentas e controles de 
 * paginação adicionais melhora a interatividade e acessibilidade, tornando-o ideal para aplicações empresariais e 
 * análises de dados que requerem interfaces de usuário robustas e eficazes.
 */

import * as React from 'react'
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { DataTablePagination } from './data-table-pagination'
import { DataTableToolbar } from './data-table-toolbar'


// Define a interface DataTableProps com dois tipos genéricos TData e TValue
// columns: um array de definições de colunas, cada uma do tipo ColumnDef<TData, TValue>
// data: um array de dados do tipo TData
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

// Define um componente de função genérico DataTable que recebe colunas e dados como propriedades
export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  // Estado para seleção de linhas, inicialmente vazio
  const [rowSelection, setRowSelection] = React.useState({})
  
  // Estado para visibilidade das colunas, inicialmente vazio
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  
  // Estado para filtros de colunas, inicialmente um array vazio
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  
  // Estado para ordenação das colunas, inicialmente um array vazio
  const [sorting, setSorting] = React.useState<SortingState>([])

  // Cria uma instância da tabela usando useReactTable com a configuração fornecida
  const table = useReactTable({
    data, // Dados da tabela
    columns, // Definições das colunas
    state: {
      sorting,          // Estado de ordenação
      columnVisibility, // Estado de visibilidade das colunas
      rowSelection,     // Estado de seleção de linhas
      columnFilters,    // Estado de filtros de colunas
    },
    enableRowSelection: true, // Habilita a seleção de linhas
    onRowSelectionChange: setRowSelection, // Callback para mudanças na seleção de linhas
    onSortingChange: setSorting,           // Callback para mudanças na ordenação
    onColumnFiltersChange: setColumnFilters, // Callback para mudanças nos filtros de colunas
    onColumnVisibilityChange: setColumnVisibility, // Callback para mudanças na visibilidade das colunas
    getCoreRowModel: getCoreRowModel(), // Obtém o modelo de linha principal
    getFilteredRowModel: getFilteredRowModel(), // Obtém o modelo de linha filtrada
    getPaginationRowModel: getPaginationRowModel(), // Obtém o modelo de linha paginada
    getSortedRowModel: getSortedRowModel(), // Obtém o modelo de linha ordenada
    getFacetedRowModel: getFacetedRowModel(), // Obtém o modelo de linha facetada
    getFacetedUniqueValues: getFacetedUniqueValues(), // Obtém valores únicos facetados
  })

  return (
    <div className='space-y-4'>
      <DataTableToolbar table={table} />
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
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
                  className='h-24 text-center'
                >
                  Sem resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  )
}
