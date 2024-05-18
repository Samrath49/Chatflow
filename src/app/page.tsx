import FlowBuilder from '@/components/FlowComponents'
import Header from '@/components/Header'
import NodesPanel from '@/components/NodesPanel'

/*
 * Home page component
 *
 * This is the component that is rendered on the home page.
 * We render Header, FlowBuilder and NodesPanel components on this page.
 */
export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between'>
      <Header />

      <div className='flex'>
        <div className='flex' style={{ width: 1250, height: 820 }}>
          <FlowBuilder />
        </div>
        <div className='bg-white'>
          <NodesPanel />
        </div>
      </div>
    </main>
  )
}
