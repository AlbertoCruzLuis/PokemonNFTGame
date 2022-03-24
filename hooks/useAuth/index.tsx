import { useWeb3 } from "@3rdweb/hooks"
import { useEffect, useState } from "react"

export const useAuth = (isPrivate: any) => {
  const { address } = useWeb3()
  const [auth, setAuth] = useState(false)

  useEffect(() => {
    if (!address && isPrivate) return
    setAuth(true)
  }, [address])

  return { auth }
}
