import { useEffect, useState } from 'react';
import { useContract } from 'wagmi';
import { BigNumber, ethers, Signer } from 'ethers';

import myEpicNFT from 'util/MyEpicNFT.json';

export const CONTRACT_ADDRESS = "0xCB2090597b9fE9A5864E27Dd6fB33A635f48d8c5";

export function useEpicNFTContract() {
  const [contract, setContract] = useState<any>();

  useEffect(() => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum as any);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, myEpicNFT.abi, signer);
      setContract(contract);
    }
  }, [window?.ethereum]);

  return contract
}

export type NFTData = {
  tokenId: number;
  metadata: {
    name: string;
    description: string;
    image: string;
  }
}
