import Image from "next/image"
import { METALLIC_ADDRESS } from "config"
import { Contract } from "ethers"
import MetallicContract from "hardhat/artifacts/contracts/Metallic.sol/Metallic.json"
import { Metallic } from "hardhat/typechain"
import { useContract } from "hooks/useContract"
import { useBalanceOf } from "hooks/useBalanceOf"

export const Balance = () => {
  const { contract: metallicContract } = useContract<Metallic & Contract>({
    contractAddress: METALLIC_ADDRESS,
    contractJson: MetallicContract
  })

  const { balance } = useBalanceOf({ contract: metallicContract })

  return (
    <div className="flex gap-2 p-2 rounded-full">
      <Image src="/assets/MetallicCoin.svg" width={30} height={24} />
      <span className="font-semibold text-white">{balance.toLocaleString()}</span>
      <span className="pr-2 font-semibold text-white">MTL</span>
    </div>
  )
}
