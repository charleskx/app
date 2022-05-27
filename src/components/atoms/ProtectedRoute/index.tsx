import { ReactNode, useEffect } from "react"
import { useRouter } from "next/router"
import { useAuth } from "../../../hooks/useAuth"

interface ProtectedRouteProps {
  children: ReactNode
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/signin')
    }
  }, [router, user])

  return (
    <>
      { user ? children : null }
    </>
  )
}

export { ProtectedRoute }