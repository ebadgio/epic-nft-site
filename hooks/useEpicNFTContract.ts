import { useEffect, useState } from 'react';
import { useContract } from 'wagmi';
import { BigNumber, ethers, Signer } from 'ethers';
import axios from 'axios';

import myEpicNFT from 'util/MyEpicNFT.json';

export const CONTRACT_ADDRESS = "0x52D59F549cE0618ca4d0f5D7DCdF1124A6d7923b";

export function useEpicNFTContract() {
  const [signer, setSigner] = useState<Signer>();

  const contract = useContract({
    addressOrName: CONTRACT_ADDRESS,
    contractInterface: myEpicNFT.abi,
    signerOrProvider: signer,
  })

  console.log('contract', contract);

  useEffect(() => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum as any);
      setSigner(provider.getSigner());
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

export function useMintedNfts(contract: any, accountAddress: string): Array<NFTData> {
  const [nfts, setNfts] = useState<Array<NFTData>>([]);

  useEffect(() => {
    if (contract) {
      try {
        contract.on("NewEpicNFTMinted", async (from: string, tokenId: BigNumber) => {
          console.log('NewEpicNFTMinted', from, tokenId.toNumber());
          if (from === accountAddress) {
            //setTokenIds([tokenId.toNumber(), ...tokenIds]);
            const tokenUri = await contract.tokenURI(tokenId);
            console.log('tokenUri', tokenUri);
            const meta = await axios.get(tokenUri);
            console.log('meta', meta.data);
            setNfts([{
              tokenId: tokenId.toNumber(),
              metadata: meta.data
            }, ...nfts]);
          }
        })
      } catch (e) {
        console.log('error setting up listener', e);
      }
    }
  }, [contract]);

  return nfts;
}