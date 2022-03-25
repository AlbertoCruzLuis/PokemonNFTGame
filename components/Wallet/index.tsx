import { useWeb3, useSwitchNetwork } from "@3rdweb/hooks"
import { CHAIN_ID } from "config"
import { useEffect, useState } from "react"
import { BiWallet, BiWifiOff } from "react-icons/bi"
import Popup from "reactjs-popup"
import { middleStringTruncate } from "utils/middleStringTruncate"
import { CopyToClipboard } from "react-copy-to-clipboard"
import toast from "react-hot-toast"
import { CustomLink } from "components/CustomLink"
import { addNetowrkMetadata } from "utils/constants"
import { ethers } from "ethers"

const HOW_ADD_CUSTOM_RPC_LINK = "https://metamask.zendesk.com/hc/en-us/articles/360043227612-How-to-add-a-custom-network-RPC"

export const Wallet = () => {
  const { connectWallet, address, error, getNetworkMetadata } = useWeb3()
  const { switchNetwork, switchError } = useSwitchNetwork()
  const [openNetworkModal, setOpenNetworkModal] = useState(false)

  const addNetwork = async (_chainId: number) => {
    const _provider = new ethers.providers.Web3Provider((window as any)?.ethereum)
    try {
      if (!_provider) throw new Error("Error")
      await _provider.send("wallet_addEthereumChain", [{
        chainId: addNetowrkMetadata[_chainId].chainId,
        rpcUrls: addNetowrkMetadata[_chainId].rpcUrls,
        chainName: addNetowrkMetadata[_chainId].chainName,
        nativeCurrency: {
          name: addNetowrkMetadata[_chainId].nativeCurrency.name,
          symbol: addNetowrkMetadata[_chainId].nativeCurrency.symbol,
          decimals: addNetowrkMetadata[_chainId].nativeCurrency.decimals
        },
        blockExplorerUrls: addNetowrkMetadata[_chainId].blockExplorerUrls
      }])
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (error) {
      setOpenNetworkModal(true)
    }
  }, [error])

  if (error) {
    return (
      <Popup open={openNetworkModal} trigger={<button className="p-2 font-semibold text-black bg-white rounded-md"> Network Error</button>}
        modal
        overlayStyle={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <div className="flex flex-col p-4 bg-white rounded-md">
          <div className="flex flex-col items-center p-2">
            <div className="p-3 mb-2 bg-gray-200 rounded-full">
              <BiWifiOff />
            </div>
            <span>Network: {getNetworkMetadata(CHAIN_ID)?.chainName}</span>
          </div>
          <span className="text-gray-600">Please ensure your wallet is connected to the following network and try again.</span>
          <span>For more information:</span>
          <CustomLink href={HOW_ADD_CUSTOM_RPC_LINK} className="text-blue-600 underline outline-none">
            <span>How to add a custom network to MetaMask</span>
          </CustomLink>
          { switchError &&
            <button className="p-2 mt-2 text-white bg-black rounded-md"
              onClick={() => switchNetwork(CHAIN_ID)}>
                Change network
            </button>
          }
          { !switchError &&
            <button className="p-2 mt-2 text-white bg-black rounded-md"
              onClick={() => addNetwork(CHAIN_ID)}>
                Add network
            </button>
          }
        </div>
      </Popup>
    )
  }

  if (!address) {
    return (
      <button className='p-2 bg-white rounded-md' onClick={() => connectWallet("injected")}>
        <div className='flex justify-center gap-2'>
          <div className='flex items-center'>
            <BiWallet color='black' />
          </div>
          <span className='font-semibold text-black'>Connect Wallet</span>
        </div>
      </button>
    )
  }

  return (
    <CopyToClipboard
      text={address}
      onCopy={() => toast.success("wallet copied")}>
      <button className="p-2 border-2 border-yellow-400 border-solid bg-gradient-to-t from-neutral-900 to-yellow-500">
        <span className='font-semibold text-white'>
          {middleStringTruncate(address, 6, 6)}
        </span>
      </button>
    </CopyToClipboard>
  )
}
