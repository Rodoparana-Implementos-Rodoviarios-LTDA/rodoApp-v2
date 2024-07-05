import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import InputFields from './components/inputFields'
import NFTable from './table/nfTable'
import PCTabela from './table/pcTable'
import DemoPage from '../notasNew/page'

export default function Inclusao() {
  return (
    <Layout>
      {/* ===== Top Heading ===== */}
      <Layout.Header sticky>
        <h2 className='text-2xl font-bold tracking-tight'>
          Inclusão de Pré Documento de Entrada
        </h2>
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>
      <Layout.Body>
        <InputFields />
        <div className='flex w-full gap-5'>
          <div className='flex-none w-1/3'>
            <NFTable />
          </div>
          <div className='flex-grow'>
            <PCTabela />
            <DemoPage/>
          </div>
        </div>
      </Layout.Body>
    </Layout>
  )
}
