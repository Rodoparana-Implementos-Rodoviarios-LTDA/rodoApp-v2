/**
 * DataTableRowActions é um componente desenvolvido para fornecer ações contextuais em cada linha de uma tabela de dados.
 * Ele oferece uma interface de menu dropdown, acessível através de um ícone de três pontos, permitindo ao usuário interagir
 * com a linha de dados específica através de várias ações como editar, copiar, marcar como favorito, aplicar rótulos e deletar.
 *
 * Funcionalidades:
 * - Editar: Permite a edição da linha de dados.
 * - Copiar: Oferece uma opção para duplicar a linha de dados.
 * - Favoritar: Permite ao usuário marcar a linha de dados como favorita.
 * - Rótulos: Fornece um submenu com opções de rótulos que podem ser aplicados à linha de dados.
 * - Deletar: Permite a exclusão da linha de dados com um atalho de teclado para rápida execução.
 *
 * Este componente é especialmente útil em aplicações que requerem interação direta e múltiplas ações em dados tabulares,
 * melhorando significativamente a eficiência do usuário ao manipular registros individuais.
 */

import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Row } from '@tanstack/react-table'

import { Button } from '@/components/custom/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { taskSchema } from '../data/schema'

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const task = taskSchema.parse(row.original)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
        >
          <DotsHorizontalIcon className='h-4 w-4' />
          <span className='sr-only'>Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-[160px]'>
        <DropdownMenuItem>Editar</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Deletar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
