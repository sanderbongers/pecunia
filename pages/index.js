import Head from 'next/head'
import DropZone from '../components/drop-zone'

export default function App() {
  return (
    <DropZone>
      <div className="min-h-screen bg-gradient-to-r from-yellow-300 to-yellow-400 px-8">
        <Head>
          <title>Pecunia</title>
          <link rel="icon" href="/favicon.ico" />
          <link rel="stylesheet" href="https://rsms.me/inter/inter.css"></link>
        </Head>

        <main className="flex flex-1 flex-col justify-center items-center py-16">
          <h1 className="text-6xl font-bold mb-8">Pecunia</h1>
        </main>
      </div>
    </DropZone>
  )
}
