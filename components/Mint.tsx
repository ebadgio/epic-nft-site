import { useState, useContext, useEffect } from 'react';
import { BigNumber, Contract, ethers } from 'ethers';
import axios from 'axios';

import { Button } from 'components/core/Button';

import { useEpicNFTContract, CONTRACT_ADDRESS } from 'hooks/useEpicNFTContract';
import { Flex } from './core/Flex';
import { Text } from './core/Text';
import { NFT } from './NFT';
import { H2 } from './core/Heading';
import { MintedNFTsContext } from 'context/MintedNFTsContext';

import myEpicNFT from 'util/MyEpicNFT.json';

export const MAX_TOKENS = 1000;
const RINKEBY_CHAIN_ID = "0x4";

interface MintProps {
  accountAddress: string;
}

export const Mint: React.FC<MintProps> = ({ accountAddress }) => {
  const [nfts, setNfts] = useContext(MintedNFTsContext);
  const [minting, setMinting] = useState(false);
  const [count, setCount] = useState<number>(-1);
  const contract = useEpicNFTContract();

  useEffect(() => {
    if (contract) {
      getNumberMinted(contract);
      getOwnedTokens(contract);
    }
  }, [contract]);

  const getNumberMinted = async (contract: Contract) => {
    try {
      if (contract.numberOfTokensMinted) {
        const count: BigNumber = await contract.numberOfTokensMinted();
        setCount(count.toNumber());
      }
    } catch (e) {
      console.log(e);
    }
  }

  const getOwnedTokens = async (contract: Contract) => {
    let nfts = [];
    try {
      if (contract.tokensOfOwner) {
        const tokenIds = await contract.tokensOfOwner(accountAddress);
        for (const tokenId of tokenIds) {
          try {
            const tokenUri = await contract.tokenURI(tokenId);
            const meta = await axios.get(tokenUri);
            nfts.push({
              tokenId: tokenId.toNumber(),
              metadata: meta.data
            });
          } catch (e) {
            console.log(e);
          }
        }
      }
    } catch (e) {
      console.log(e);
    }
    setNfts(nfts);
  }

  const ensureRinkeby = async () => {
    let chainId: string | undefined = await window?.ethereum?.request({ method: 'eth_chainId' });
    if (chainId && chainId !== RINKEBY_CHAIN_ID) {
      alert("You are not connected to the Rinkeby Test Network! To continue using this app please switch your network.");
      return false;
    }
    return true;
  }

  const mintNFT = async () => {
    if (!window.ethereum) {
      alert('Ethereum not connected. Please connect your wallet.');
      return;
    }

    const valid = await ensureRinkeby();
    if (!valid) {
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
          getOwnedTokens(connectedContract);
          getNumberMinted(connectedContract);
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
      {count > -1 && <Text>
        {count}/{MAX_TOKENS} NFTs minted so far.
      </Text>}
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