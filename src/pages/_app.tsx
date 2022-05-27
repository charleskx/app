import { AuthProvider } from '../context/AuthContext'
import type { AppProps } from 'next/app'

import '../../styles/globals.css'
import { useRouter } from 'next/router'
import { ProtectedRoute } from '../components/atoms/ProtectedRoute'

const noAuthRequired = ['/signin']

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  return (
    <AuthProvider>
      {
        noAuthRequired.includes(router.pathname)
        ? <Component {...pageProps} />
        : (<ProtectedRoute>
            <Component {...pageProps} />
          </ProtectedRoute>)
      }
    </AuthProvider>
  )
}

export default MyApp
