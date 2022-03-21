import { NFTData } from 'hooks/useEpicNFTContract';
import { createContext, useState, useEffect} from 'react';

export type MintedNFTsContext = [Array<NFTData>, (nft: NFTData) => void];

export const MintedNFTsContext = createContext<MintedNFTsContext>([[], (nfts: NFTData) => {}]);

export const MintedNFTsProvider: React.FC = ({ children }) => {
  const [nfts, setNfts] = useState<Array<NFTData>>([]);
  const [currentNft, setCurrentNft] = useState<NFTData>();

  useEffect(() => {
    if (currentNft) {
      setNfts([currentNft, ...nfts]); 
    }
  }, [currentNft]);

  return (
    <MintedNFTsContext.Provider value={[nfts, setCurrentNft]}>
      {children}
    </MintedNFTsContext.Provider>
  );
}
