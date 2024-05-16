import FlowCard from '@/components/FlowComponents/FlowBuilder'

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div className='flex' style={{ width: 900, height: 500 }}>
        <FlowBuilder />
      </div>
    </main>
  )
}
