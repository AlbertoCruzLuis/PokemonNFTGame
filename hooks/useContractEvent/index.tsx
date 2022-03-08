import { useEffect, useState } from "react"
import { Contract } from "ethers"

interface IuseContractEventProps<T> {
  contract: T,
  eventName: string,
  listener: EventListener
}

export const useContractEvent = <T extends Contract>({ contract, eventName, listener }: IuseContractEventProps<T>) => {
  useEffect(() => {
    contract?.on(eventName, listener)

    return () => {
      contract?.off(eventName, listener)
    }
  }, [contract])
}
