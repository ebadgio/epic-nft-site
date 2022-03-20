import { useEffect, useState } from 'react';
import { useContract } from 'wagmi';
import { ethers, Signer } from 'ethers';

import myEpicNFT from 'util/MyEpicNFT.json';

const CONTRACT_ADDRESS = "0x52D59F549cE0618ca4d0f5D7DCdF1124A6d7923b";

export function useEpicNFTContract() {
  const [signer, setSigner] = useState<Signer>();

  const contract = useContract({
    addressOrName: CONTRACT_ADDRESS,
    contractInterface: myEpicNFT.abi,
    signerOrProvider: signer,
  })

  useEffect(() => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum as any);
      setSigner(provider.getSigner());
    }
  }, [window?.ethereum]);

  return contract
}