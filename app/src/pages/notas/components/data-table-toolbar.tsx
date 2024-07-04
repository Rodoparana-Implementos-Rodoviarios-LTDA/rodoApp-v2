/**
 * DataTableToolbar é um componente que fornece uma interface para filtragem, ordenação e outras operações
 * na tabela de dados. Ele inclui um campo de entrada para filtragem global, filtros de data e filtros facetados
 * para várias colunas.
 *
 * Funcionalidades:
 * - Filtragem global: Permite a filtragem em todas as colunas da tabela.
 * - Filtros de data: Permite a filtragem de registros baseados em intervalos de datas.
 * - Filtros facetados: Permite a seleção de múltiplos filtros baseados em valores únicos presentes nas colunas.
 * - Resetar filtros: Permite limpar todos os filtros aplicados.
 */

"use client"
import { useState } from 'react'
import { Cross2Icon, MixerHorizontalIcon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'
import { Button } from '@/components/custom/button'
import { Input } from '@/components/ui/input'
import { DataTableViewOptions } from '../components/data-table-view-options'
import { priorities, statuses, filiais } from '../data/data'
import { DataTableFacetedFilter } from './data-table-faceted-filter'
import { DatePickerWithRange } from '@/components/date-picker'
import { DateRange } from 'react-day-picker'
import { IconPlus } from '@tabler/icons-react'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0
  const [globalFilter, setGlobalFilter] = useState('')

  const handleDateChange = (columnId: string, dateRange: DateRange | undefined) => {
    const filterValue = dateRange ? {
      from: dateRange.from ? dateRange.from.toISOString().split('T')[0] : undefined,
      to: dateRange.to ? dateRange.to.toISOString().split('T')[0] : undefined
    } : undefined
    table.getColumn(columnId)?.setFilterValue(filterValue)
  }

  const handleGlobalFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setGlobalFilter(value)
    table.setGlobalFilter(value)
  }

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2'>
        <Input
          placeholder='Filtrar tabela...'
          value={globalFilter}
          onChange={handleGlobalFilterChange}
          className='h-8 w-[150px] lg:w-[250px]'
        />
        <div className='flex gap-x-2'>
          <DatePickerWithRange
            className='h-8'
            label='Filtrando Emissão'
            onDateChange={(dateRange) => handleDateChange('emissao', dateRange)}
          />
          <DatePickerWithRange
            className='h-8'
            label='Filtrando Inclusão'
            onDateChange={(dateRange) => handleDateChange('inclusao', dateRange)}
          />
          <DatePickerWithRange
            className='h-8'
            label='Filtrando Vencimento'
            onDateChange={(dateRange) => handleDateChange('vencimento', dateRange)}
          />
          {table.getColumn('filial') && (
            <DataTableFacetedFilter
              column={table.getColumn('filial')}
              title='Filial'
              options={filiais}
            />
          )}
          {table.getColumn('status') && (
            <DataTableFacetedFilter
              column={table.getColumn('status')}
              title='Status'
              options={statuses}
            />
          )}
          {table.getColumn('prioridade') && (
            <DataTableFacetedFilter
              column={table.getColumn('prioridade')}
              title='Prioridade'
              options={priorities}
            />
          )}
        </div>
        {isFiltered && (
          <Button
            variant='ghost'
            onClick={() => {
              table.resetColumnFilters()
              setGlobalFilter('')
            }}
            className='h-8 px-2 lg:px-3'
          >
            Reset
            <Cross2Icon className='ml-2 h-4 w-4' />
          </Button>
        )}
      </div>
      <Button
          variant='outline'
          size='sm'
          className='ml-auto h-8'
        >
          <a href="/notas/inclusao" className='flex'>
          <IconPlus className='mr-2 h-4 w-4' />
          Incluir
          </a>
        </Button>
      <DataTableViewOptions table={table} />
    </div>
  )
}
