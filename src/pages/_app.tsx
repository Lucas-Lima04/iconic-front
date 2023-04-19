// import '../../dist/output.css';
import '../../dist/output.css';
import { AuthProvider } from '@/infra/contexts/auth-contexts'
import { ToastContainer } from 'react-toastify';
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ToastContainer />
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
      </>
  )
}
