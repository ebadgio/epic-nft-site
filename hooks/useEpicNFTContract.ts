import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

import myEpicNFT from 'util/MyEpicNFT.json';

export const CONTRACT_ADDRESS = "0x088EE2C010C2B87D8a19d5d4F6F8F8ef6ED0fa5C";

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
