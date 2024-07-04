import {
  IconUserPlus,
  IconChecklist,
  IconFileInfo,
  IconProgressHelp,
  IconMessages,
  IconShoppingCartSearch,
  IconBrandCashapp,
  IconArchive,
  IconTir,
  IconReportMoney,
  IconTicket,
  IconCreditCardPay,
  IconCreditCardRefund,
  IconFiles,
  IconFileStack,
} from '@tabler/icons-react'

export interface NavLink {
  title: string
  label?: string
  href: string
  icon: JSX.Element
}

export interface SideLink extends NavLink {
  sub?: NavLink[]
}

export const sidelinks: SideLink[] = [
  {
    title: 'Início',
    label: '',
    href: '/tasks',
    icon: <IconChecklist size={18} />,
  },
  {
    title: 'Pré Notas',
    label: '',
    href: '/notas',
    icon: <IconFileInfo size={18} />,
  },
  {
    title: 'Chamados',
    label: '',
    href: 'http://hesk.rodoparana.com.br/',
    icon: <IconProgressHelp size={18} />,
  },
  {
    title: 'Intranet',
    label: '',
    href: 'https://sites.google.com/site/baserodoparana/home',
    icon: <IconUserPlus size={18} />,
  },
  {
    title: 'Chats',
    label: '9',
    href: '/chats',
    icon: <IconMessages size={18} />,
  },
  {
    title: 'Vendas',
    label: '',
    href: '',
    icon: <IconBrandCashapp size={18} />,
    sub: [
      {
        title: 'Consulta de Preços',
        label: '',
        href: '/sales/consulta',
        icon: <IconShoppingCartSearch size={18} />,
      },
      {
        title: 'Inventário',
        label: '',
        href: '/sales/inventario',
        icon: <IconArchive size={18} />,
      },
      {
        title: 'Controle de Portaria',
        label: '',
        href: '/sales/portaria',
        icon: <IconTir size={18} />,
      },
    ],
  },

  {
    title: 'Financeiro',
    label: '10',
    href: '/requests',
    icon: <IconReportMoney size={18} />,
    sub: [
      {
        title: 'Análise de Crédito',
        label: '9',
        href: '/financeiro/analise',
        icon: <IconCreditCardPay size={18} />,
      },
      {
        title: 'Liberação de Crédito',
        label: '',
        href: '/financeiro/liberacao',
        icon: <IconCreditCardRefund size={18} />,
      },
      {
        title: 'Despesa de Viagem',
        label: '',
        href: '/financeiro/viagem',
        icon: <IconTicket size={18} />,
      },
    ],
  },
  {
    title: 'GED',
    label: '',
    href: '/ged',
    icon: <IconFiles size={18} />,
  },
  {
    title: 'Documentações',
    label: '',
    href: '/documentacao',
    icon: <IconFileStack size={18} />,
  },
]
