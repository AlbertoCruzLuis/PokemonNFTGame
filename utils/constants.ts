import { EMERALD_TESNET_CHAIN_ID } from "config"
import { AddEthereumChainParameter } from "@3rdweb/hooks"

// Chains & Icons -> https://github.com/ethereum-lists/chains/tree/master/_data

interface t {
  [key: number]: AddEthereumChainParameter
}

export const addNetowrkMetadata: t = {
  [EMERALD_TESNET_CHAIN_ID]: {
    chainId: `0x${EMERALD_TESNET_CHAIN_ID.toString(16)}`,
    chainName: "Emerald Paratime Testnet",
    nativeCurrency: {
      name: "Emerald Rose",
      symbol: "ROSE",
      decimals: 18
    },
    rpcUrls: ["https://testnet.emerald.oasis.dev/"],
    blockExplorerUrls: ["https://testnet.explorer.emerald.oasis.dev"],
    iconUrls: ["https://ipfs.io/ipfs/bafkreiespupb52akiwrexxg7g72mh7m7h7lum5hmqijmpdh3kmuunzclha"]
  }
}

export const networkMetadata = {
  [EMERALD_TESNET_CHAIN_ID]: {
    chainName: "Emerald Testnet",
    icon: "https://ipfs.io/ipfs/bafkreiespupb52akiwrexxg7g72mh7m7h7lum5hmqijmpdh3kmuunzclha",
    symbol: "ROSE",
    isTestnet: true
  }
}
