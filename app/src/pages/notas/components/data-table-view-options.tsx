/**
 * DataTableToolbar é um componente funcional que fornece uma barra de ferramentas interativa para uma tabela de dados,
 * facilitando a filtragem e personalização das visualizações dos dados. Este componente é parte integral de sistemas de
 * visualização de dados que exigem interatividade e capacidade de ajuste fino nos dados apresentados.
 *
 * Funcionalidades do Componente:
 * - Filtragem Dinâmica: Permite aos usuários filtrar dados com base em fornecedores, status, filiais e prioridades,
 *   utilizando filtros facetados que podem ser aplicados diretamente através de subcomponentes especializados.
 * - Opções de Visualização: Oferece controle sobre as colunas visíveis e suas configurações na tabela.
 * - Reset de Filtros: Inclui um botão para resetar todos os filtros aplicados, facilitando o retorno ao estado inicial
 *   da visualização.
 *
 * A barra de ferramentas é configurada para trabalhar com flexibilidade em diferentes tamanhos de tela, garantindo que
 * as funcionalidades estejam acessíveis tanto em dispositivos móveis quanto em desktops. Este componente melhora a
 * usabilidade e a acessibilidade da tabela, proporcionando uma experiência de usuário mais rica e eficiente.
 */


import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { MixerHorizontalIcon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';
import { Button } from '@/components/custom/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

// Interface para as props do componente, usando genérico TData para os tipos de dados da tabela
interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
}

// Componente funcional DataTableViewOptions que renderiza opções de visualização de tabelas (Botão "Ver")
export function DataTableViewOptions<TData>({ table }: DataTableViewOptionsProps<TData>) {
  return (
    <DropdownMenu>
      {/* Trigger para abrir o dropdown, utilizando um botão personalizado */}
      <DropdownMenuTrigger asChild>
        <Button
          variant='outline'
          size='sm'
          className='ml-auto hidden h-8 lg:flex'
        >
          {/* Ícone horizontal ao lado do texto do botão */}
          <MixerHorizontalIcon className='mr-2 h-4 w-4' />
          Ver
        </Button>
      </DropdownMenuTrigger>
      {/* Conteúdo do dropdown, alinhado ao final com largura definida */}
      <DropdownMenuContent align='end' className='w-[150px]'>
        {/* Label do menu para seleção de colunas */}
        <DropdownMenuLabel>Selecionar Colunas</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* Geração de itens de checkbox para cada coluna que pode ser ocultada */}
        {table.getAllColumns().filter(column => typeof column.accessorFn !== 'undefined' && column.getCanHide()).map(column => (
          <DropdownMenuCheckboxItem
            key={column.id}
            className='capitalize'
            checked={column.getIsVisible()}
            onCheckedChange={(value) => column.toggleVisibility(!!value)}
          >
            {column.id}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
