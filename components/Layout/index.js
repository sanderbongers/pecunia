import Head from 'next/head'
import { APP_NAME } from '../../lib/constants'
import DropZone from '../DropZone'

export default function Layout({ children }) {
  return (
    <>
      <DropZone>
        <div className="min-h-screen bg-gradient-to-r from-yellow-300 to-yellow-400 px-8">
          <Head>
            <title>{APP_NAME}</title>
            <link rel="icon" href="/favicon.ico" />
            <link
              rel="stylesheet"
              href="https://rsms.me/inter/inter.css"
            ></link>
          </Head>

          <main>{children}</main>
        </div>
      </DropZone>
    </>
  )
}
