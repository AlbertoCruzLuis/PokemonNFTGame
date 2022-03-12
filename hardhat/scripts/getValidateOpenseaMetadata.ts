import fetch from 'node-fetch';

const fetchOpenseaMetadataTesnet = async (nftAddress: string, tokenId: number) => {
  const response = await fetch(
    `https://testnets-api.opensea.io/asset/${nftAddress}/${tokenId}/validate/`
  )
  return await response.json()
}

export const isValidateOpenseaMetadata = async (nftAddress: string, tokenId: number) => {
  const response = await fetchOpenseaMetadataTesnet(nftAddress, tokenId);
  return response.valid;
}
