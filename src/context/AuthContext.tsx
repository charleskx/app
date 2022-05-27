import { createContext, ReactNode, useEffect, useState } from "react"
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { auth } from "../config/firebase"

interface AuthContextProps {
  user: UserProps | null
  login: ({ email, password }: LoginProps) => Promise<void>
  logout: () => Promise<void>
  loading: boolean
}

interface AuthProviderProps {
  children: ReactNode
}

interface LoginProps {
  email: string
  password: string
}

interface UserProps {
  uid: string
  name: string
  email: string
}

export const AuthContext = createContext({} as AuthContextProps)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps | null>(null)
  const [loading, setLoading] = useState(false)

  async function login({ email, password}: LoginProps) {
    try {
      setLoading(true)
      await signInWithEmailAndPassword(auth, email, password)
    } catch(err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  async function logout() {
    try {
      setLoading(true)

      await signOut(auth)
      setUser(null)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user?.uid,
          name: user?.displayName ?? '',
          email: user?.email ?? ''
        })
      } else {
        setUser(null)
      }
    })

    unsubscribe()
  }, []);

  return (
    <AuthContext.Provider value={{ loading, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  )
}