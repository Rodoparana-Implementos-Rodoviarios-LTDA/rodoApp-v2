/**
 * Este módulo define as colunas para uma tabela de Pre Notas utilizando o componente Table do @tanstack/react-table.
 * Cada coluna é configurada para exibir informações específicas sobre as tarefas, como filial, documento, fornecedor,
 * status e prioridade. Adicionalmente, colunas para ações e seleção de linhas são incluídas para interação do usuário.
 *
 * - A coluna 'filial' exibe a filial associada a cada tarefa.
 * - A coluna 'user' exibe o nome de usuário associado a cada tarefa.
 * - A coluna 'id' exibe o documento e série associados a cada tarefa.
 * - A coluna 'fornecedor' exibe o fornecedor associado a cada tarefa.
 * - A coluna 'label' exibe o tipo de tarefa.
 * - A coluna 'valor' exibe o valor associado a cada tarefa.
 * - A coluna 'emissao' exibe a data de emissão da tarefa.
 * - A coluna 'inclusao' exibe a data de inclusão da tarefa.
 * - A coluna 'vencimento' exibe a data de vencimento da tarefa.
 * - A coluna 'status' exibe o status da tarefa.
 * - A coluna 'prioridade' exibe a prioridade da tarefa.
 * - A coluna 'obs' exibe observações associadas a cada tarefa.
 * - A coluna 'actions' permite a execução de ações específicas em cada linha.
 *
 * Este setup de colunas ajuda a criar uma interface rica e interativa para visualização e gestão de tarefas, usando
 * componentes visuais como checkboxes e badges para uma melhor experiência do usuário.
 */

import { ColumnDef } from '@tanstack/react-table'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'
import { labels, filiais, priorities, statuses } from '../../../data/NF/data'
import { Task } from '../../../data/NF/schema'

// Define as colunas da tabela com base no tipo Task
export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: 'filial', // Chave de acesso no objeto de dados
    header: ({ column }) => (
      <DataTableColumnHeader className="-mr-5" column={column} title='Filial' />
    ),
    cell: ({ row }) => {
      const filial = filiais.find(filial => filial.value === row.getValue('filial'))
      if (!filial) return null
      return (
        <div className=''>
          <span className=' sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('filial')}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'user', // Chave de acesso no objeto de dados
    header: ({ column }) => <DataTableColumnHeader column={column} title='Usuário' />,
    cell: ({ row }) => {
      const username = row.getValue('user') as string
      return (
        <div className='flex items-center space-x-2'>
          <span className='font-medium'>{username}</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'id', // Chave de acesso no objeto de dados
    header: ({ column }) => <DataTableColumnHeader column={column} title='Documento' />,
    cell: ({ row }) => (
      <div className='flex gap-2'>
        <p>{`${row.getValue('id')}`}</p> - <p>{`${row.original.serie}`}</p>
      </div>
    ),
    enableSorting: false, // Desabilita a ordenação para esta coluna
    enableHiding: false, // Desabilita a ocultação desta coluna
  },
  {
    accessorKey: 'fornecedor', // Chave de acesso no objeto de dados
    header: ({ column }) => <DataTableColumnHeader column={column} title='Fornecedor' />,
    cell: ({ row }) => (
      <div className='flex space-x-2  max-w-80'>
        <span className='font-medium text-xs max-w-80 sm:max-w-72 md:max-w-[31rem]'>
          {row.getValue('fornecedor')}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'label', // Chave de acesso no objeto de dados
    header: ({ column }) => <DataTableColumnHeader column={column} title='Tipo' />,
    cell: ({ row }) => {
      const label = labels.find(label => label.value === row.original.label)
      return (
        <div className='flex space-x-2 max-w-80'>
          {label && <p>{label.label}</p>}
        </div>
      )
    },
  },
  {
    accessorKey: 'valor', // Chave de acesso no objeto de dados
    header: ({ column }) => <DataTableColumnHeader column={column} title='Valor' />,
    cell: ({ row }) => (
      <div className='flex space-x-2'>
        <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
          R${row.getValue('valor')}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'emissao', // Chave de acesso no objeto de dados
    header: ({ column }) => <DataTableColumnHeader column={column} title='Emissão' />,
    cell: ({ row }) => (
      <div className='flex space-x-2'>
        <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
          {row.getValue('emissao')}
        </span>
      </div>
    ),
    filterFn: (row, id, filterValue) => {
      const rowValue = row.getValue(id)
      const { from, to } = filterValue || {}
      if (from && to) {
        return rowValue >= from && rowValue <= to
      } else if (from) {
        return rowValue >= from
      } else if (to) {
        return rowValue <= to
      }
      return true
    }
  },
  {
    accessorKey: 'inclusao', // Chave de acesso no objeto de dados
    header: ({ column }) => <DataTableColumnHeader column={column} title='Inclusão' />,
    cell: ({ row }) => (
      <div className='flex space-x-2'>
        <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
          {row.getValue('inclusao')}
        </span>
      </div>
    ),
    filterFn: (row, id, filterValue) => {
      const rowValue = row.getValue(id)
      const { from, to } = filterValue || {}
      if (from && to) {
        return rowValue >= from && rowValue <= to
      } else if (from) {
        return rowValue >= from
      } else if (to) {
        return rowValue <= to
      }
      return true
    }
  },
  {
    accessorKey: 'vencimento', // Chave de acesso no objeto de dados
    header: ({ column }) => <DataTableColumnHeader column={column} title='1º Vencimento' />,
    cell: ({ row }) => (
      <div className='flex space-x-2'>
        <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
          {row.getValue('vencimento')}
        </span>
      </div>
    ),
    filterFn: (row, id, filterValue) => {
      const rowValue = row.getValue(id)
      const { from, to } = filterValue || {}
      if (from && to) {
        return rowValue >= from && rowValue <= to
      } else if (from) {
        return rowValue >= from
      } else if (to) {
        return rowValue <= to
      }
      return true
    }
  },
  {
    accessorKey: 'status', // Chave de acesso no objeto de dados
    header: ({ column }) => <DataTableColumnHeader column={column} title='Status' />,
    cell: ({ row }) => {
      const status = statuses.find(status => status.value === row.getValue('status'))
      if (!status) return null
      return (
        <div className='flex w-[100px] items-center'>
          {status.icon && (
            <status.icon className='mr-2 h-4 w-4 text-muted-foreground' />
          )}
          <span>{status.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: 'prioridade', // Chave de acesso no objeto de dados
    header: ({ column }) => <DataTableColumnHeader column={column} title='Prioridade' />,
    cell: ({ row }) => {
      const prioridade = priorities.find(prioridade => prioridade.value === row.getValue('prioridade'))
      if (!prioridade) return null
      return (
        <div className='flex items-center'>
          {prioridade.icon && (
            <prioridade.icon className='mr-2 h-4 w-4 text-muted-foreground' />
          )}
          <span>{prioridade.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: 'obs', // Chave de acesso no objeto de dados
    header: ({ column }) => <DataTableColumnHeader column={column} title='Observação' />,
    cell: ({ row }) => (
      <div className='flex space-x-2 max-w-64'>
        <span className='font-medium sm:max-w-72 md:max-w-[31rem]'>
          {row.getValue('obs')}
        </span>
      </div>
    ),
  },
  {
    id: 'actions', // ID da coluna
    cell: ({ row }) => <DataTableRowActions row={row} />, // Renderiza ações da linha
  },
]
