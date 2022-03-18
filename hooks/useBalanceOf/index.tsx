import { useWeb3 } from "@3rdweb/hooks"
import { Contract, ethers } from "ethers"
import { useEffect, useState } from "react"

type useBalanceOfProps = {
  contract: Contract | undefined
}

export const useBalanceOf = ({ contract }: useBalanceOfProps) => {
  const { address } = useWeb3()
  const [balance, setBalance] = useState(0)

  const getBalance = async () => {
    if (!contract) return

    const balanceRaw = await contract.balanceOf(address)
    const balance = parseInt(ethers.utils.formatEther(balanceRaw))
    setBalance(balance)
  }

  useEffect(() => {
    getBalance()
  }, [contract])

  return {
    balance
  }
}
