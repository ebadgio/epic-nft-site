import { useState } from 'react';

import { Button } from 'components/core/Button';

import { useEpicNFTContract } from 'hooks/useEpicNFTContract';

export const Mint: React.FC = () => {
  const [minting, setMinting] = useState(false);
  const contract = useEpicNFTContract();

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
    <Button
      color="rainbow" 
      borderRadius="rounded"
      onClick={() => mintNFT()}
      disabled={minting}
    >
      {minting ? "Minting..." : "Mint NFT"}
    </Button>
  )
}