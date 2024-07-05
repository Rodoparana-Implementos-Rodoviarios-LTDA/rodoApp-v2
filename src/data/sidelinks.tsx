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
    title: 'Pré Documento de Entrada',
    label: '',
    href: '/',
    icon: <IconChecklist size={18} />,
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
]
