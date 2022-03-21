import { useState, useContext, useEffect } from 'react';
import { ethers } from 'ethers';
import axios from 'axios';

import { Button } from 'components/core/Button';

import { useEpicNFTContract, CONTRACT_ADDRESS, NFTData } from 'hooks/useEpicNFTContract';
import { Flex } from './core/Flex';
import { Text } from './core/Text';
import { NFT } from './NFT';
import { H2 } from './core/Heading';
import { MintedNFTsContext } from 'context/MintedNFTsContext';

import myEpicNFT from 'util/MyEpicNFT.json';

interface MintProps {
  accountAddress: string;
}

export const Mint: React.FC<MintProps> = ({ accountAddress }) => {
  const [nfts, addNFT] = useContext(MintedNFTsContext);
  const [minting, setMinting] = useState(false);
  const contract = useEpicNFTContract();

  useEffect(() => {
    if (contract) {
      getNumberMinted();
      getOwnedTokens();
    }
  }, [contract]);

  const getNumberMinted = async () => {
    if (contract.numberOfTokensMinted) {
      const count = await contract.numberOfTokensMinted();
      console.log('mint count', count);
    } else {
      console.log('missing method: numberOfTokensMinted')
    }
  }

  const getOwnedTokens = async () => {
    if (contract.tokensOfOwner) {
      const tokens = await contract.tokensOfOwner(accountAddress);
      console.log('tokens', tokens);
    } else {
      console.log('missing method: tokensOfOwner');
    }
  }

  const mintNFT = async () => {
    if (!window.ethereum) {
      alert('Ethereum not connected. Please connect your wallet.');
      return;
    }

    try {
      if (!contract) {
        alert('Missing contract');
        return;
      }

      let transaction = await contract.makeAnEpicNFT();
      setMinting(true);

      await transaction.wait();
      setMinting(false);
    } catch (error) {
      setMinting(false)
      console.log(error)
    }
  }

  useEffect(() => {
    setupEventListener();
  }, [])

  const setupEventListener = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum as any);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, myEpicNFT.abi, signer);

        connectedContract.on("NewEpicNFTMinted", async (from, tokenId) => {
          console.log(from, tokenId.toNumber())
          if (from === accountAddress) {
            const tokenUri = await connectedContract.tokenURI(tokenId);
            const meta = await axios.get(tokenUri);
            console.log('nfts', nfts);
            addNFT({
              tokenId: tokenId.toNumber(),
              metadata: meta.data
            });
          }
        });

        console.log("Setup event listener!")

      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Button
        color="rainbow" 
        borderRadius="rounded"
        onClick={() => mintNFT()}
        disabled={minting}
      >
        {minting ? "Minting..." : "Mint NFT"}
      </Button>
      <Flex direction="column" align="start" width="fill" css={{maxWidth: "960px"}}>
        <H2>
          Your Epic NFTs
        </H2>
        {nfts.length === 0 && <Text css={{ color: "$gray7" }}>
          No NFTs yet...
        </Text>}
        <Flex css={{ gap: "$5"}}>
          {nfts.map((nft) => <NFT key={nft.tokenId} data={nft} contractAddress={CONTRACT_ADDRESS} />)}
        </Flex>
      </Flex>
    </>
  )
}