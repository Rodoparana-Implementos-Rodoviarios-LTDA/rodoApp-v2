import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { DataTable } from './components/data-table'
import { columns } from './components/columns'
import { notas } from './data/notas'

export default function Notas() {
  return (
    <Layout>
      {/* ===== Top Heading ===== */}
      <Layout.Header sticky>
      <h2 className='text-2xl font-bold tracking-tight'>Pré Documento de Entrada</h2>
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body>
        <div className='-mx-4 flex-1 overflow-x-auto  px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <DataTable data={notas} columns={columns} />
        </div>
      </Layout.Body>
    </Layout>
  )
}
