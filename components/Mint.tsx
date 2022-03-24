import { useState, useContext, useEffect } from 'react';
import { BigNumber, ethers } from 'ethers';
import axios from 'axios';

import { Button } from 'components/core/Button';

import { useEpicNFTContract, CONTRACT_ADDRESS, NFTData } from 'hooks/useEpicNFTContract';
import { Flex } from './core/Flex';
import { Text } from './core/Text';
import { NFT } from './NFT';
import { H2 } from './core/Heading';
import { MintedNFTsContext } from 'context/MintedNFTsContext';

import myEpicNFT from 'util/MyEpicNFT.json';

export const MAX_TOKENS = 1000;

interface MintProps {
  accountAddress: string;
}

export const Mint: React.FC<MintProps> = ({ accountAddress }) => {
  const [nfts, addNFT] = useContext(MintedNFTsContext);
  const [minting, setMinting] = useState(false);
  const [count, setCount] = useState<number>();
  const contract = useEpicNFTContract();

  useEffect(() => {
    if (contract) {
      getNumberMinted();
      getOwnedTokens();
    }
  }, [contract]);

  const getNumberMinted = async () => {
    if (contract.numberOfTokensMinted) {
      const count: BigNumber = await contract.numberOfTokensMinted();
      setCount(count.toNumber());
    }
  }

  const getOwnedTokens = async () => {
    if (contract.tokensOfOwner) {
      const tokenIds = await contract.tokensOfOwner(accountAddress);
      for (const tokenId of tokenIds) {
        try {
          const tokenUri = await contract.tokenURI(tokenId);
          const meta = await axios.get(tokenUri);
          addNFT({
            tokenId: tokenId.toNumber(),
            metadata: meta.data
          });
        } catch (e) {
          console.log(e);
        }
      }
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
          if (from === accountAddress) {
            const tokenUri = await connectedContract.tokenURI(tokenId);
            const meta = await axios.get(tokenUri);
            addNFT({
              tokenId: tokenId.toNumber(),
              metadata: meta.data
            });
          }
        });
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
      {count && <Text>{count}/{MAX_TOKENS} NFTs minted so far.</Text>}
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