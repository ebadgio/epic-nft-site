import { useState } from 'react';

import { Button } from 'components/core/Button';

import { useEpicNFTContract, useMintedNfts, CONTRACT_ADDRESS } from 'hooks/useEpicNFTContract';
import { Flex } from './core/Flex';
import { NFT } from './NFT';

interface MintProps {
  accountAddress: string;
}

export const Mint: React.FC<MintProps> = ({ accountAddress }) => {
  const [minting, setMinting] = useState(false);
  const contract = useEpicNFTContract();
  const nfts = useMintedNfts(contract, accountAddress);

  const mintNFT = async () => {
    if (!window.ethereum) {
      alert('Ethereum not connected. Please connect your wallet.');
      return;
    }

    try {
      console.log('contract', contract);
      if (!contract) {
        alert('Missing contract');
        return;
      }
      console.log("Going to pop wallet now to pay gas...")
      let transaction = await contract.makeAnEpicNFT();
      setMinting(true);

      console.log("Mining...please wait.")
      await transaction.wait();
      setMinting(false);
      console.log('transaction', transaction)
      console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${transaction.hash}`);
    } catch (error) {
      setMinting(false)
      console.log(error)
    }
  }

  return (
    <Flex direction="column" css={{ gap: "$2"}}>
      <Button
        color="rainbow" 
        borderRadius="rounded"
        onClick={() => mintNFT()}
        disabled={minting}
      >
        {minting ? "Minting..." : "Mint NFT"}
      </Button>
      {nfts.map((nft) => <NFT key={nft.tokenId} data={nft} contractAddress={CONTRACT_ADDRESS} />)}
    </Flex>
  )
}